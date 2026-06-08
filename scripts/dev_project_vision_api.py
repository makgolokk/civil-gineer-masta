import sys
from http.server import HTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from api.project_vision import handler


def main():
    server = HTTPServer(("127.0.0.1", 8787), handler)
    print("Project Vision API listening on http://127.0.0.1:8787")
    server.serve_forever()


if __name__ == "__main__":
    main()
