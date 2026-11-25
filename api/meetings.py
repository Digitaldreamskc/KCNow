"""Serve upcoming public Kansas City meetings from the City Clerk's Legistar feed."""
from datetime import date, datetime, time
from http.client import HTTPException
from http.server import BaseHTTPRequestHandler
import json
import re
from urllib.parse import urlencode, urlsplit
from urllib.request import Request, urlopen
from zoneinfo import ZoneInfo


LEGISTAR_EVENTS = "https://webapi.legistar.com/v1/kansascity/events"
CENTRAL = ZoneInfo("America/Chicago")
MAX_FEED_BYTES = 1024 * 1024
OFFICIAL_LINK_HOSTS = {
    "clerk.kcmo.gov",
    "kansascity.legistar.com",
    "kansascity.legistar1.com",
    "kansascity.granicus.com",
}


def plain_text(value):
    return " ".join(value.split()) if isinstance(value, str) else ""


def official_link(value):
    if not isinstance(value, str):
        return None
    try:
        link = urlsplit(value)
        if (
            link.scheme == "https"
            and link.netloc in OFFICIAL_LINK_HOSTS
        ):
            return value
    except ValueError:
        pass
    return None


def meeting_time(value):
    match = re.fullmatch(r"(1[0-2]|0?[1-9]):([0-5][0-9]) *([AP]M)", value, re.IGNORECASE)
    if not match:
        return None
    hour, minute, period = match.groups()
    return time(int(hour) % 12 + (12 if period.upper() == "PM" else 0), int(minute))


def upcoming(rows, now):
    meetings = {}
    for row in rows:
        if not isinstance(row, dict):
            continue
        title = plain_text(row.get("EventBodyName"))
        event_id = row.get("EventId")
        if type(event_id) is not int or not title:
            continue
        try:
            day = date.fromisoformat(plain_text(row.get("EventDate"))[:10])
        except ValueError:
            continue
        start = meeting_time(plain_text(row.get("EventTime")))
        if day < now.date() or (day == now.date() and start and start <= now.time()):
            continue

        status = plain_text(row.get("EventAgendaStatusName"))
        location = plain_text(row.get("EventLocation"))
        if any(re.match(r"\[?(?:cancelled|canceled)\b", value, re.IGNORECASE)
               for value in (title, status, location)):
            continue

        shown_time = ""
        if start:
            shown_time = f"{start.hour % 12 or 12}:{start.minute:02d} {'AM' if start.hour < 12 else 'PM'}"
        meetings[event_id] = (
            day, start or time.max, event_id,
            {
                "title": title,
                "date": day.isoformat(),
                "time": shown_time,
                "location": location,
                "agendaUrl": official_link(row.get("EventAgendaFile")),
                "detailsUrl": official_link(row.get("EventInSiteURL")),
            },
        )
    return [item[3] for item in sorted(meetings.values())[:6]]


def fetch_meetings():
    today = datetime.now(CENTRAL).date()
    query = urlencode({
        "$filter": f"EventDate ge datetime'{today}T00:00:00'",
        "$orderby": "EventDate asc,EventId asc",
        "$top": 50,
    })
    request = Request(f"{LEGISTAR_EVENTS}?{query}", headers={"Accept": "application/json"})
    with urlopen(request, timeout=9) as response:
        raw = response.read(MAX_FEED_BYTES + 1)
    if len(raw) > MAX_FEED_BYTES:
        raise ValueError("Legistar response is too large")
    rows = json.loads(raw)
    if not isinstance(rows, list):
        raise ValueError("Expected a list of Legistar events")
    now = datetime.now(CENTRAL)
    return {"meetings": upcoming(rows, now), "checkedAt": now.isoformat()}


def send_meetings(handler):
    try:
        result = fetch_meetings()
        status = 200
    except (OSError, ValueError, HTTPException):
        result = {"error": "The meeting feed is temporarily unavailable."}
        status = 502

    payload = json.dumps(result).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Cache-Control", "no-store")
    handler.send_header("Content-Length", str(len(payload)))
    handler.end_headers()
    handler.wfile.write(payload)


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        send_meetings(self)
