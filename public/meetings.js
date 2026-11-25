const meetingList = byElementId("meeting-list");
const meetingStatus = byElementId("meeting-status");
const meetingRefresh = byElementId("meeting-refresh");
const calendarMonth = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });
const calendarDate = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeZone: "UTC" });
const checkTime = new Intl.DateTimeFormat("en-US", {
  month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Chicago"
});

function renderMeeting(meeting) {
  const row = element("li", "meeting-row");
  const day = new Date(meeting.date + "T12:00:00Z");
  const date = element("time", "meeting-date");
  date.dateTime = meeting.date;
  const month = element("span", "", calendarMonth.format(day));
  const number = element("strong", "", String(day.getUTCDate()));
  month.setAttribute("aria-hidden", "true");
  number.setAttribute("aria-hidden", "true");
  date.append(month, number, element("span", "sr-only", calendarDate.format(day)));

  const summary = element("div", "meeting-summary");
  const details = [meeting.time || "Time to be confirmed", meeting.location].filter(Boolean);
  summary.append(element("h4", "", meeting.title), element("p", "", details.join(" · ")));

  const actions = element("div", "meeting-actions");
  if (meeting.agendaUrl) {
    const agenda = sourceLink(["View agenda", meeting.agendaUrl]);
    agenda.setAttribute("aria-label", "View agenda for " + meeting.title);
    actions.append(agenda);
  } else {
    actions.append(element("span", "agenda-unavailable", "Agenda link unavailable"));
  }
  if (meeting.detailsUrl) {
    const detail = sourceLink(["Meeting details", meeting.detailsUrl]);
    detail.setAttribute("aria-label", "Meeting details for " + meeting.title);
    actions.append(detail);
  }
  row.append(date, summary, actions);
  return row;
}

async function loadMeetings() {
  meetingRefresh.disabled = true;
  meetingStatus.textContent = "Loading meetings from the City Clerk’s Legistar feed…";
  try {
    const response = await fetch("/api/meetings", { cache: "no-store" });
    if (!response.ok) throw new Error("Meeting feed unavailable");
    const { meetings, checkedAt } = await response.json();
    meetingList.replaceChildren(...meetings.map(renderMeeting));
    meetingList.hidden = meetings.length === 0;
    meetingStatus.textContent = meetings.length
      ? "City Clerk via Legistar · Checked " + checkTime.format(new Date(checkedAt)) + " CT"
      : "Legistar has no upcoming meetings to display. Check the official calendar for updates.";
  } catch {
    meetingList.replaceChildren();
    meetingList.hidden = true;
    meetingStatus.textContent = "The meeting feed is temporarily unavailable. Refresh or open the City Clerk calendar.";
  } finally {
    meetingRefresh.disabled = false;
  }
}

meetingRefresh.hidden = false;
meetingRefresh.addEventListener("click", loadMeetings);
loadMeetings();
