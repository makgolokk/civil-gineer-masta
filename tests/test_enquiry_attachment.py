import base64
import unittest

import fitz

from api.enquiry import build_project_attachment


class EnquiryAttachmentTests(unittest.TestCase):
    def test_planner_submission_generates_review_team_pdf_attachment(self):
        project_data = {
            "projectType": "Rental Units",
            "stageProfile": {
                "siteStatus": "Looking for land",
                "designStatus": "Formal drawings",
            },
            "lifestyle": "Investment income",
            "style": "Modern Minimalist",
            "features": ["Garage", "Large windows", "Secure boundary wall"],
            "timeline": "Within 6 months",
            "budget": "P1M-P2M",
            "projectDetails": {
                "location": "Gaborone",
                "unitCount": "4 units",
                "storeys": "Double storey",
            },
            "clientDetails": {
                "clientName": "Review Team Test",
            },
        }

        attachment = build_project_attachment(project_data)
        pdf_bytes = base64.b64decode(attachment["content"])
        document = fitz.open(stream=pdf_bytes, filetype="pdf")
        text = "\n".join(page.get_text() for page in document)
        normalized_text = " ".join(text.split())

        self.assertTrue(attachment["filename"].endswith(".pdf"))
        self.assertGreater(len(pdf_bytes), 20_000)
        self.assertIn("PROJECT VISION SUMMARY", text)
        self.assertIn("Looking for land", normalized_text)
        self.assertIn("Formal drawings", normalized_text)


if __name__ == "__main__":
    unittest.main()
