import json
import sys
from pathlib import Path
from http.server import BaseHTTPRequestHandler

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from project_vision_export import (  # noqa: E402
    format_project_vision_data,
    generate_project_reference,
    generate_project_vision_docx,
    generate_project_vision_pdf,
)
from project_vision_export.formatting import professional_filename  # noqa: E402


class handler(BaseHTTPRequestHandler):
    def _headers(self, status, content_type="application/json", filename=None):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        if filename:
            self.send_header(
                "Content-Disposition",
                f'attachment; filename="{filename}"',
            )
        self.end_headers()

    def do_OPTIONS(self):
        self._headers(204)

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 100_000:
                raise ValueError("Invalid request size.")
            payload = json.loads(self.rfile.read(length))
            project_data = payload.get("projectData") or {}
            output_format = str(payload.get("format", "pdf")).lower()
            if output_format not in {"pdf", "docx"}:
                raise ValueError("Unsupported document format.")

            reference = generate_project_reference()
            formatted = format_project_vision_data(project_data, reference=reference)
            if output_format == "pdf":
                document = generate_project_vision_pdf(
                    project_data,
                    reference=reference,
                )
                content_type = "application/pdf"
            else:
                document = generate_project_vision_docx(
                    project_data,
                    reference=reference,
                )
                content_type = (
                    "application/vnd.openxmlformats-officedocument."
                    "wordprocessingml.document"
                )

            filename = professional_filename(
                project_data,
                output_format,
                generated_on=formatted["generated_iso_date"],
            )
            self._headers(200, content_type, filename=filename)
            self.wfile.write(document)
        except (ValueError, json.JSONDecodeError) as error:
            self._headers(400)
            self.wfile.write(
                json.dumps(
                    {
                        "error": (
                            "We could not prepare the document from the supplied "
                            "project information."
                        ),
                        "detail": str(error),
                    }
                ).encode("utf-8")
            )
        except Exception:
            self._headers(500)
            self.wfile.write(
                json.dumps(
                    {
                        "error": (
                            "The professional document could not be generated. "
                            "Please retry in a moment."
                        )
                    }
                ).encode("utf-8")
            )
