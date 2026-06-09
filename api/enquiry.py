import html
import json
import os
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler


RESEND_API_URL = "https://api.resend.com/emails"
MAX_REQUEST_BYTES = 50_000


def _clean(value, maximum):
    return " ".join(str(value or "").split())[:maximum]


def _send_email(api_key, payload):
    request = urllib.request.Request(
        RESEND_API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=12) as response:
        return json.loads(response.read().decode("utf-8"))


class handler(BaseHTTPRequestHandler):
    def _respond(self, status, payload):
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode("utf-8"))

    def do_OPTIONS(self):
        self._respond(204, {})

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > MAX_REQUEST_BYTES:
                raise ValueError("Invalid request size.")

            payload = json.loads(self.rfile.read(length))
            if payload.get("website"):
                self._respond(200, {"ok": True})
                return

            enquiry = {
                "fullName": _clean(payload.get("fullName"), 120),
                "email": _clean(payload.get("email"), 180),
                "phone": _clean(payload.get("phone"), 80),
                "location": _clean(payload.get("location"), 180),
                "service": _clean(payload.get("service"), 180),
                "description": str(payload.get("description") or "").strip()[:5000],
            }
            if not all(enquiry.values()):
                raise ValueError("All enquiry fields are required.")
            if "@" not in enquiry["email"]:
                raise ValueError("A valid email address is required.")

            api_key = os.environ.get("RESEND_API_KEY")
            to_email = os.environ.get("ENQUIRY_TO_EMAIL")
            from_email = os.environ.get(
                "ENQUIRY_FROM_EMAIL",
                "Civil-Gineer Masta <onboarding@resend.dev>",
            )
            if not api_key or not to_email:
                self._respond(
                    503,
                    {"error": "Online enquiry delivery is not configured yet."},
                )
                return

            rows = "".join(
                f"<tr><th style='text-align:left;padding:8px;border-bottom:1px solid #ddd'>"
                f"{html.escape(label)}</th><td style='padding:8px;border-bottom:1px solid #ddd'>"
                f"{html.escape(value)}</td></tr>"
                for label, value in (
                    ("Full name", enquiry["fullName"]),
                    ("Email", enquiry["email"]),
                    ("Phone", enquiry["phone"]),
                    ("Project location", enquiry["location"]),
                    ("Service", enquiry["service"]),
                )
            )
            team_html = (
                "<h2>New Civil-Gineer Masta project enquiry</h2>"
                f"<table style='border-collapse:collapse'>{rows}</table>"
                "<h3>Project description</h3>"
                f"<p style='white-space:pre-wrap'>{html.escape(enquiry['description'])}</p>"
            )
            result = _send_email(
                api_key,
                {
                    "from": from_email,
                    "to": [to_email],
                    "reply_to": enquiry["email"],
                    "subject": f"Project enquiry: {enquiry['service']} - {enquiry['fullName']}",
                    "html": team_html,
                },
            )

            try:
                _send_email(
                    api_key,
                    {
                        "from": from_email,
                        "to": [enquiry["email"]],
                        "subject": "We received your Civil-Gineer Masta project enquiry",
                        "html": (
                            f"<p>Hello {html.escape(enquiry['fullName'])},</p>"
                            "<p>Thank you for sharing your project with Civil-Gineer Masta. "
                            "Your enquiry has been received and our team will review the details "
                            "and contact you.</p>"
                            "<p>Regards,<br>Civil-Gineer Masta</p>"
                        ),
                    },
                )
            except (urllib.error.URLError, TimeoutError):
                pass

            self._respond(200, {"ok": True, "reference": result.get("id")})
        except (ValueError, json.JSONDecodeError) as error:
            self._respond(400, {"error": str(error)})
        except (urllib.error.URLError, TimeoutError):
            self._respond(
                502,
                {"error": "The enquiry service could not deliver your message."},
            )
        except Exception:
            self._respond(
                500,
                {"error": "Your enquiry could not be sent. Please try again."},
            )
