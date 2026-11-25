# KC Now Community Hub

A working preview of a public civic resource hub for the Kansas City region. Explore the nine Mid-America Regional Council counties, find local civic and nonprofit resources, and browse the Civic Brief, learning guides, and opportunities to serve.

## Run locally

Run `python3 serve.py` with Python 3.9 or later and open [the hub](http://127.0.0.1:8766/).

The site files are in `public/`. Both the local server and the Vercel preview serve upcoming Kansas City, Missouri meetings from the City Clerk’s public Legistar feed at `/api/meetings`. The newsletter signup and resource suggestion forms are previews that use sample data. Bookmarks are stored on the visitor’s device.

County boundaries come from [U.S. Census Bureau cartographic boundary data via U.S. Atlas](https://github.com/topojson/us-atlas). The [MARC board](https://www.marc.org/committees/marc-board-directors) serves the nine counties shown.
