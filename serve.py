"""Run the KC Now preview locally."""
import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
from pathlib import Path
import sys
from urllib.parse import urlsplit

from api.meetings import send_meetings


PUBLIC = Path(__file__).resolve().parent / "public"


class HubHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PUBLIC), **kwargs)

    def do_GET(self):
        if urlsplit(self.path).path == "/api/meetings":
            send_meetings(self)
        else:
            super().do_GET()


if __name__ == "__main__":
    if sys.platform == "darwin" and Path("/etc/ssl/cert.pem").is_file():
        os.environ.setdefault("SSL_CERT_FILE", "/etc/ssl/cert.pem")
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8766)
    args = parser.parse_args()
    with ThreadingHTTPServer(("127.0.0.1", args.port), HubHandler) as server:
        print(f"KC Now preview at http://127.0.0.1:{args.port}/", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
