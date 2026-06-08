import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from project_vision_export import (
    generate_project_vision_docx,
    generate_project_vision_pdf,
)

SAMPLE_DATA = {
    "projectType": "Family Home",
    "style": "Modern Minimalist",
    "lifestyle": "Growing family",
    "features": [
        "Garage",
        "Open-plan kitchen",
        "Home office",
        "Large windows",
        "Secure boundary wall",
    ],
    "stage": "I own land",
    "timeline": "Within 6 months",
    "budget": "P1M-P2M",
}


def main():
    output_dir = Path("samples")
    output_dir.mkdir(exist_ok=True)
    reference = "CGM/PVS/2026/0001"
    pdf_path = output_dir / "CGM_Project_Vision_Summary_Sample_2026-06-08.pdf"
    docx_path = output_dir / "CGM_Project_Vision_Summary_Sample_2026-06-08.docx"
    generate_project_vision_pdf(SAMPLE_DATA, output_path=pdf_path, reference=reference)
    generate_project_vision_docx(SAMPLE_DATA, output_path=docx_path, reference=reference)
    print(pdf_path)
    print(docx_path)


if __name__ == "__main__":
    main()
