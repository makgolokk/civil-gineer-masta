import io
import unittest
import zipfile
from datetime import datetime, timezone

import fitz

from project_vision_export import (
    format_project_vision_data,
    generate_project_reference,
    generate_project_vision_docx,
    generate_project_vision_pdf,
)


class ProjectVisionExportTests(unittest.TestCase):
    def setUp(self):
        self.base = {
            "projectType": "Family Home",
            "style": "Modern Minimalist",
            "lifestyle": "Growing family",
            "features": ["Garage", "Home office", "Large windows"],
            "stage": "I own land",
            "timeline": "Within 3 months",
            "budget": "P1M-P2M",
        }

    def test_reference_generation_is_unique(self):
        now = datetime(2026, 6, 8, 8, 30, tzinfo=timezone.utc)
        references = {generate_project_reference(now) for _ in range(500)}
        self.assertEqual(500, len(references))
        self.assertTrue(all(item.startswith("CGM/PVS/2026/") for item in references))

    def test_readiness_score_ranges(self):
        formatted = format_project_vision_data(self.base, reference="CGM/PVS/2026/TEST")
        self.assertEqual(80, formatted["readiness_score"])
        self.assertEqual("Consultation-ready stage", formatted["readiness_label"])

    def test_missing_optional_values_are_human_readable(self):
        formatted = format_project_vision_data({}, reference="CGM/PVS/2026/TEST")
        self.assertEqual("To be confirmed", formatted["project_type"])
        self.assertEqual(
            ["To be discussed during consultation"],
            formatted["features"],
        )

    def test_pdf_opens_and_contains_required_content(self):
        pdf_bytes = generate_project_vision_pdf(
            self.base,
            reference="CGM/PVS/2026/TEST",
        )
        document = fitz.open(stream=pdf_bytes, filetype="pdf")
        text = "\n".join(page.get_text() for page in document)
        self.assertGreater(len(pdf_bytes), 20_000)
        self.assertIn("PROJECT VISION SUMMARY", text)
        self.assertIn("Recommended Professional Services", text)
        self.assertIn("Project Readiness Score", text)

    def test_docx_is_valid_and_contains_required_content(self):
        docx_bytes = generate_project_vision_docx(
            self.base,
            reference="CGM/PVS/2026/TEST",
        )
        self.assertGreater(len(docx_bytes), 20_000)
        with zipfile.ZipFile(io.BytesIO(docx_bytes)) as archive:
            document_xml = archive.read("word/document.xml").decode("utf-8")
        self.assertIn("PROJECT VISION SUMMARY", document_xml)
        self.assertIn("Recommended Professional Services", document_xml)

    def test_long_and_special_character_content(self):
        data = {
            **self.base,
            "clientName": "Dineo & Kabelo M.",
            "features": [
                "Garage",
                "Open-plan kitchen",
                "Ensuite bedroom",
                "Walk-in closet",
                "Outdoor entertainment area",
                "Home office",
                "Extra rental room",
                "Modern exterior",
                "Large windows",
                "Secure boundary wall",
            ],
        }
        self.assertGreater(
            len(generate_project_vision_pdf(data, reference="CGM/PVS/2026/LONG")),
            20_000,
        )
        self.assertGreater(
            len(generate_project_vision_docx(data, reference="CGM/PVS/2026/LONG")),
            20_000,
        )


if __name__ == "__main__":
    unittest.main()
