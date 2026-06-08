from io import BytesIO

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    HRFlowable,
    Image,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

from .branding import COLORS, LOGO_PATH
from .formatting import format_project_vision_data


def _color(value):
    return colors.HexColor(value)


class ReadinessBar(Flowable):
    def __init__(self, score, width=165 * mm, height=6 * mm):
        super().__init__()
        self.score = max(0, min(100, score))
        self.width = width
        self.height = height

    def draw(self):
        radius = self.height / 2
        self.canv.setFillColor(_color("#E4E7EC"))
        self.canv.roundRect(0, 0, self.width, self.height, radius, fill=1, stroke=0)
        if self.score:
            self.canv.setFillColor(_color(COLORS["red"]))
            self.canv.roundRect(
                0,
                0,
                self.width * self.score / 100,
                self.height,
                radius,
                fill=1,
                stroke=0,
            )


def _styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="PVSBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=13.2,
            textColor=_color(COLORS["black"]),
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="PVSSmall",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=7.6,
            leading=10.2,
            textColor=_color(COLORS["slate"]),
        )
    )
    styles.add(
        ParagraphStyle(
            name="PVSSection",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11.5,
            leading=14,
            textColor=_color(COLORS["red"]),
            spaceBefore=7,
            spaceAfter=6,
            keepWithNext=True,
        )
    )
    styles.add(
        ParagraphStyle(
            name="PVSTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=23,
            textColor=_color(COLORS["red"]),
            alignment=TA_LEFT,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="PVSSubtitle",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10,
            leading=13,
            textColor=_color(COLORS["slate"]),
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="PVSLabel",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=8.2,
            leading=11,
            textColor=_color(COLORS["slate"]),
        )
    )
    styles.add(
        ParagraphStyle(
            name="PVSValue",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.6,
            leading=11.5,
            textColor=_color(COLORS["black"]),
        )
    )
    styles.add(
        ParagraphStyle(
            name="PVSCalloutTitle",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=12,
            textColor=_color(COLORS["red"]),
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="PVSScore",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=15,
            textColor=_color(COLORS["black"]),
            alignment=TA_LEFT,
            spaceAfter=3,
        )
    )
    return styles


def _draw_letterhead(canvas, doc, data):
    width, height = A4
    company = data["company"]
    canvas.saveState()
    canvas.setFillColor(_color(COLORS["black"]))
    canvas.rect(0, height - 3 * mm, width, 3 * mm, fill=1, stroke=0)

    logo = str(LOGO_PATH)
    canvas.drawImage(
        logo,
        18 * mm,
        height - 43 * mm,
        width=43 * mm,
        height=28.7 * mm,
        preserveAspectRatio=True,
        mask="auto",
    )

    canvas.setFont("Helvetica-Bold", 14)
    canvas.setFillColor(_color(COLORS["black"]))
    canvas.drawString(66 * mm, height - 18 * mm, company["name"])
    canvas.setFont("Helvetica", 7.7)
    canvas.setFillColor(_color(COLORS["slate"]))
    detail_y = height - 25 * mm
    for line in (
        company["address"],
        company["phone"],
        company["email"],
        f"Reg: {company['registration']}",
    ):
        canvas.drawString(66 * mm, detail_y, line)
        detail_y -= 4.5 * mm

    canvas.setFont("Helvetica-Bold", 12)
    canvas.setFillColor(_color(COLORS["red"]))
    canvas.drawRightString(width - 18 * mm, height - 19 * mm, "PROJECT PLANNING")
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(_color(COLORS["black"]))
    canvas.drawRightString(width - 18 * mm, height - 27 * mm, data["reference"])

    canvas.setStrokeColor(_color(COLORS["red"]))
    canvas.setLineWidth(0.7)
    canvas.roundRect(
        width - 57 * mm,
        height - 41 * mm,
        39 * mm,
        8 * mm,
        2.2 * mm,
        fill=0,
        stroke=1,
    )
    canvas.setFillColor(_color(COLORS["red"]))
    canvas.setFont("Helvetica-Bold", 7.5)
    canvas.drawCentredString(
        width - 37.5 * mm, height - 38.2 * mm, "PRELIMINARY"
    )

    canvas.setFillColor(_color(COLORS["red"]))
    canvas.rect(0, height - 51 * mm, width, 3 * mm, fill=1, stroke=0)
    canvas.setFillColor(colors.white)
    canvas.setStrokeColor(_color(COLORS["red"]))
    canvas.roundRect(
        69 * mm,
        height - 49.2 * mm,
        72 * mm,
        8 * mm,
        2.2 * mm,
        fill=1,
        stroke=1,
    )
    canvas.setFillColor(_color(COLORS["red"]))
    canvas.setFont("Helvetica-Bold", 7.7)
    canvas.drawCentredString(
        width / 2, height - 46.5 * mm, company["tagline"]
    )

    canvas.setStrokeColor(_color(COLORS["line"]))
    canvas.setLineWidth(0.5)
    canvas.line(18 * mm, 15 * mm, width - 18 * mm, 15 * mm)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(_color(COLORS["slate"]))
    footer = (
        f"{company['name']} | {company['phone']} | {company['email']}"
    )
    canvas.drawString(18 * mm, 10 * mm, footer)
    canvas.drawRightString(
        width - 18 * mm,
        10 * mm,
        f"Page {doc.page} of {data.get('_total_pages', doc.page)}",
    )
    canvas.restoreState()


def _detail_table(rows, styles, widths):
    table_data = []
    for label, value in rows:
        table_data.append(
            [
                Paragraph(label, styles["PVSLabel"]),
                Paragraph(str(value), styles["PVSValue"]),
            ]
        )
    table = Table(table_data, colWidths=widths, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("BACKGROUND", (0, 0), (-1, -1), _color(COLORS["panel"])),
                ("BOX", (0, 0), (-1, -1), 0.6, _color(COLORS["line"])),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, _color(COLORS["line"])),
            ]
        )
    )
    return table


def _bullet_paragraph(text, styles):
    return Paragraph(f'<font color="{COLORS["red"]}">&#9632;</font>&nbsp;&nbsp;{text}', styles["PVSBody"])


def _build_story(data, styles):
    content_width = 174 * mm
    story = [
        Paragraph("PROJECT VISION SUMMARY", styles["PVSTitle"]),
        Paragraph(
            data["brief_subtitle"],
            styles["PVSSubtitle"],
        ),
    ]

    reference_rows = [
        ("Document Reference", data["reference"]),
        ("Date Generated", data["generated_date"]),
        ("Project Category", data["project_category"]),
        ("Prepared By", data["prepared_by"]),
        ("Document Status", data["document_status"]),
    ]
    story.extend(
        [
            _detail_table(reference_rows, styles, [43 * mm, 131 * mm]),
            Spacer(1, 6 * mm),
            Paragraph(data["introduction"], styles["PVSBody"]),
            Paragraph("Client Vision Overview", styles["PVSSection"]),
        ]
    )

    overview = [
        [
            Paragraph("PROJECT TYPE", styles["PVSLabel"]),
            Paragraph(data["project_type"], styles["PVSValue"]),
            Paragraph("PREFERRED STYLE", styles["PVSLabel"]),
            Paragraph(data["preferred_style"], styles["PVSValue"]),
        ],
        [
            Paragraph("LIFESTYLE GOAL", styles["PVSLabel"]),
            Paragraph(data["lifestyle_goal"], styles["PVSValue"]),
            Paragraph("CURRENT STAGE", styles["PVSLabel"]),
            Paragraph(data["current_stage"], styles["PVSValue"]),
        ],
        [
            Paragraph("TIMELINE", styles["PVSLabel"]),
            Paragraph(data["timeline"], styles["PVSValue"]),
            Paragraph("BUDGET DIRECTION", styles["PVSLabel"]),
            Paragraph(data["budget"], styles["PVSValue"]),
        ],
    ]
    overview_table = Table(
        overview,
        colWidths=[29 * mm, 58 * mm, 29 * mm, 58 * mm],
        hAlign="LEFT",
    )
    overview_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("BACKGROUND", (0, 0), (-1, -1), _color(COLORS["panel"])),
                ("BOX", (0, 0), (-1, -1), 0.6, _color(COLORS["line"])),
                ("INNERGRID", (0, 0), (-1, -1), 0.35, _color(COLORS["line"])),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    story.extend(
        [
            overview_table,
            Spacer(1, 3 * mm),
            Paragraph("SELECTED FEATURES", styles["PVSLabel"]),
        ]
    )
    story.extend(_bullet_paragraph(item, styles) for item in data["features"])

    direction_box = Table(
        [
            [
                Paragraph(
                    "Recommended Design Direction",
                    styles["PVSCalloutTitle"],
                ),
                Paragraph(data["design_direction"], styles["PVSBody"]),
            ]
        ],
        colWidths=[48 * mm, 126 * mm],
        hAlign="LEFT",
    )
    direction_box.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BACKGROUND", (0, 0), (-1, -1), _color(COLORS["soft_red"])),
                ("BOX", (0, 0), (-1, -1), 0.8, _color(COLORS["red"])),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    recommendation_group = [
        Spacer(1, 4 * mm),
        direction_box,
        Paragraph("Recommended Professional Services", styles["PVSSection"]),
    ]
    recommendation_group.extend(
        _bullet_paragraph(service, styles) for service in data["services"]
    )
    story.append(KeepTogether(recommendation_group))

    readiness = KeepTogether(
        [
            Paragraph("Project Readiness Overview", styles["PVSSection"]),
            Paragraph(
                f"Project Readiness Score: {data['readiness_score']} / 100",
                styles["PVSScore"],
            ),
            ReadinessBar(data["readiness_score"], width=content_width),
            Spacer(1, 2.5 * mm),
            Paragraph(
                f"<b>{data['readiness_label']}.</b> {data['readiness_explanation']}",
                styles["PVSBody"],
            ),
        ]
    )
    story.append(readiness)

    contact = data["company"]
    cta_box = Table(
        [
            [
                Paragraph("Recommended Next Step", styles["PVSCalloutTitle"]),
                Paragraph(data["next_step"], styles["PVSBody"]),
            ],
            [
                Paragraph("BOOK A PROFESSIONAL CONSULTATION", styles["PVSLabel"]),
                Paragraph(
                    f"<b>WhatsApp:</b> {contact['whatsapp']}<br/>"
                    f"<b>Phone:</b> {contact['phone']}<br/>"
                    f"<b>Email:</b> {contact['email']}",
                    styles["PVSValue"],
                ),
            ],
        ],
        colWidths=[48 * mm, 126 * mm],
        hAlign="LEFT",
    )
    cta_box.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BACKGROUND", (0, 0), (-1, 0), _color(COLORS["panel"])),
                ("BACKGROUND", (0, 1), (-1, 1), _color(COLORS["soft_red"])),
                ("BOX", (0, 0), (-1, -1), 0.7, _color(COLORS["line"])),
                ("LINEABOVE", (0, 1), (-1, 1), 0.7, _color(COLORS["red"])),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    story.extend(
        [
            Spacer(1, 4 * mm),
            cta_box,
            Spacer(1, 4 * mm),
            HRFlowable(
                width="100%",
                thickness=0.5,
                color=_color(COLORS["line"]),
                spaceAfter=2 * mm,
            ),
            Paragraph(f"<b>Disclaimer:</b> {data['disclaimer']}", styles["PVSSmall"]),
        ]
    )
    return story


def generate_project_vision_pdf(
    project_data,
    company_settings=None,
    output_path=None,
    reference=None,
):
    data = format_project_vision_data(
        project_data,
        company_settings=company_settings,
        reference=reference,
    )
    def build(target):
        document = BaseDocTemplate(
            target,
            pagesize=A4,
            leftMargin=18 * mm,
            rightMargin=18 * mm,
            topMargin=57 * mm,
            bottomMargin=20 * mm,
            title="Project Vision Summary",
            author=data["company"]["name"],
            subject="Preliminary Project Planning Brief",
        )
        frame = Frame(
            document.leftMargin,
            document.bottomMargin,
            document.width,
            document.height,
            id="project-vision-frame",
        )
        document.addPageTemplates(
            PageTemplate(
                id="project-vision",
                frames=[frame],
                onPage=lambda canvas, doc: _draw_letterhead(canvas, doc, data),
            )
        )
        document.build(_build_story(data, _styles()))
        return document.page

    draft = BytesIO()
    data["_total_pages"] = build(draft)
    target = BytesIO()
    build(target)
    pdf_bytes = target.getvalue()

    if output_path:
        with open(output_path, "wb") as output:
            output.write(pdf_bytes)
    return pdf_bytes
