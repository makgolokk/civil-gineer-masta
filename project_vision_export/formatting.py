import re
import json
from datetime import date, datetime
from pathlib import Path

from .branding import COMPANY_SETTINGS
from .reference import generate_project_reference

RULES_PATH = Path(__file__).resolve().parents[1] / "project_vision_rules.json"
PROJECT_VISION_RULES = json.loads(RULES_PATH.read_text(encoding="utf-8"))

READINESS_LABELS = (
    (30, "Early exploration stage"),
    (60, "Initial planning stage"),
    (80, "Consultation-ready stage"),
    (100, "Ready for detailed project initiation"),
)

SERVICE_MAP = {
    "Family Home": [
        "Architectural Design and Space Planning",
        "Structural Engineering Design",
        "Preliminary Site Assessment",
        "Cost Guidance and Project Planning",
        "Council Submission Support, where required",
    ],
    "Rental Units": [
        "Concept Design and Unit Planning",
        "Preliminary Feasibility and Cost Planning",
        "Structural Engineering Design",
        "Council Submission Support",
        "Construction Planning and Site Supervision",
    ],
    "Luxury Villa": [
        "Premium Architectural Design and Space Planning",
        "Structural Engineering Design",
        "Site and Orientation Assessment",
        "Detailed Project and Cost Planning",
        "Construction Coordination and Quality Oversight",
    ],
    "Commercial Building": [
        "Project Feasibility and Development Planning",
        "Commercial Architectural Design",
        "Structural Engineering Design",
        "Council and Statutory Submission Support",
        "Project Management and Construction Supervision",
    ],
    "Boundary Wall": [
        "Site Assessment and Boundary Verification",
        "Boundary Wall and Entrance Design",
        "Structural Design and Foundation Guidance",
        "Cost Guidance and Material Planning",
        "Construction Support and Quality Inspection",
    ],
    "Renovation / Extension": [
        "Existing Property and Site Assessment",
        "Renovation and Extension Design",
        "Structural Assessment and Engineering Design",
        "Cost Guidance and Phasing Strategy",
        "Council Submission Support, where required",
    ],
}

LIFESTYLE_DIRECTIONS = {
    "Growing family": (
        "The project should prioritise a flexible and future-ready layout that "
        "supports changing family needs, connected living spaces and practical "
        "opportunities for future expansion where the site allows."
    ),
    "First home": (
        "The initial concept should balance affordability, efficient use of space "
        "and a confident architectural identity, while preserving sensible options "
        "for future extension as needs and resources grow."
    ),
    "Investment income": (
        "The project direction should focus on efficient unit planning, durable "
        "materials, tenant privacy, low-maintenance services and a layout that "
        "supports dependable occupancy and long-term property value."
    ),
    "Prestige / luxury": (
        "The design should establish a distinctive executive character through "
        "generous proportions, carefully framed views, premium material choices "
        "and well-integrated indoor and outdoor living."
    ),
    "Business use": (
        "The project should create a professional, visible and adaptable business "
        "environment with clear circulation, efficient service planning and an "
        "architectural identity that supports client confidence."
    ),
    "Fixing an existing property": (
        "The proposed intervention should improve safety, circulation and everyday "
        "function while respecting the useful parts of the existing building and "
        "unlocking additional value through targeted upgrades."
    ),
}

FEATURE_PHRASES = {
    "Garage": "secure vehicle accommodation",
    "Open-plan kitchen": "connected kitchen and family living spaces",
    "Ensuite bedroom": "private ensuite accommodation",
    "Walk-in closet": "well-planned bedroom storage",
    "Outdoor entertainment area": "a shaded outdoor entertainment area",
    "Home office": "a dedicated home-office area",
    "Extra rental room": "an income-supporting rental room",
    "Modern exterior": "a refined modern exterior",
    "Large windows": "natural lighting through generous windows",
    "Secure boundary wall": "a secure and considered boundary treatment",
}


def _clean_text(value, fallback="To be confirmed"):
    if value is None:
        return fallback
    text = re.sub(r"\s+", " ", str(value)).strip()
    return text or fallback


def _clean_features(value):
    if not value:
        return ["To be discussed during consultation"]
    if isinstance(value, str):
        value = [item.strip() for item in value.split(",")]
    return [_clean_text(item) for item in value if _clean_text(item, "")]


def calculate_readiness_score(data):
    weights = PROJECT_VISION_RULES["readinessWeights"]
    score = 0
    stage = data.get("stage", "")
    timeline = data.get("timeline", "")
    budget = data.get("budget", "")
    features = _clean_features(data.get("features"))

    if stage == "I own land":
        score += weights["ownsLand"]
    if stage == "I already have a design":
        score += weights["hasDesign"]
    if timeline in {"Immediately", "Within 3 months"}:
        score += weights["nearTermTimeline"]
    if budget and budget != "Not sure yet":
        score += weights["definedBudget"]
    if len(features) >= 3 and features[0] != "To be discussed during consultation":
        score += weights["threeOrMoreFeatures"]
    return min(score, 100)


def readiness_interpretation(score):
    for maximum, label in READINESS_LABELS:
        if score <= maximum:
            return label
    return READINESS_LABELS[-1][1]


def readiness_explanation(score):
    if score <= 30:
        return (
            "Your project is at an early exploration stage. A discovery consultation "
            "will help define the site strategy, priorities, likely scope and a "
            "realistic route into professional planning."
        )
    if score <= 60:
        return (
            "Your project is currently at the initial planning stage. A consultation "
            "will help confirm site conditions, refine the spatial brief, establish "
            "priorities and determine the most appropriate next steps."
        )
    if score <= 80:
        return (
            "Your project is consultation-ready. The next discussion can focus on "
            "confirming the brief, testing the project against the site and budget, "
            "and agreeing the architectural and engineering scope."
        )
    return (
        "Your project is ready for detailed project initiation. A formal consultation "
        "can confirm the appointment scope, required site information, programme and "
        "the first design deliverables."
    )


def build_design_direction(data):
    lifestyle = _clean_text(data.get("lifestyle"))
    base = LIFESTYLE_DIRECTIONS.get(
        lifestyle,
        (
            "The project should be developed through a practical concept that aligns "
            "the site, spatial requirements, budget direction and intended long-term use."
        ),
    )
    features = [
        FEATURE_PHRASES[item]
        for item in _clean_features(data.get("features"))
        if item in FEATURE_PHRASES
    ]
    if not features:
        return base

    selected = features[:4]
    if len(selected) == 1:
        feature_sentence = selected[0]
    else:
        feature_sentence = ", ".join(selected[:-1]) + f", and {selected[-1]}"
    return f"{base} The initial design study should also consider {feature_sentence}."


def recommended_services(data):
    project_type = _clean_text(data.get("projectType"))
    services = list(
        SERVICE_MAP.get(
            project_type,
            [
                "Preliminary Project Consultation",
                "Site and Project Requirements Assessment",
                "Architectural and Technical Scope Definition",
                "Cost Guidance and Project Planning",
            ],
        )
    )
    if data.get("stage") == "I already have a design":
        services.insert(0, "Independent Design Review and Technical Coordination")
    if data.get("timeline") in {"Immediately", "Within 3 months"}:
        services.append("Priority Programme and Delivery Planning")
    return list(dict.fromkeys(services))


def professional_filename(data, extension, generated_on=None):
    generated_date = generated_on or date.today()
    client_details = data.get("clientDetails") or {}
    client_name = _clean_text(
        client_details.get("clientName") or data.get("clientName"),
        "",
    )
    safe_name = re.sub(r"[^A-Za-z0-9]+", "_", client_name).strip("_")
    parts = ["CGM", "Project", "Vision", "Summary"]
    if safe_name:
        parts.append(safe_name[:50])
    parts.append(generated_date.isoformat())
    return "_".join(parts) + f".{extension.lower()}"


def format_project_vision_data(raw_data, company_settings=None, reference=None, now=None):
    current = now or datetime.now()
    company = {**COMPANY_SETTINGS, **(company_settings or {})}
    project_details = raw_data.get("projectDetails") or {}
    client_details = raw_data.get("clientDetails") or {}
    features = _clean_features(raw_data.get("features"))
    score = calculate_readiness_score(raw_data)

    project_type = _clean_text(raw_data.get("projectType"))
    if project_type in {"Family Home", "Luxury Villa", "Rental Units"}:
        brief_subtitle = "Preliminary Residential Project Planning Brief"
    elif project_type == "Commercial Building":
        brief_subtitle = "Preliminary Commercial Project Planning Brief"
    elif project_type == "Boundary Wall":
        brief_subtitle = "Preliminary Property Infrastructure Planning Brief"
    elif project_type == "Renovation / Extension":
        brief_subtitle = "Preliminary Renovation Project Planning Brief"
    else:
        brief_subtitle = "Preliminary Project Planning Brief"

    return {
        "reference": reference or generate_project_reference(current.astimezone()),
        "generated_date": current.strftime("%d %B %Y"),
        "generated_iso_date": current.date(),
        "project_category": project_type,
        "project_type": project_type,
        "brief_subtitle": brief_subtitle,
        "preferred_style": _clean_text(raw_data.get("style")),
        "lifestyle_goal": _clean_text(raw_data.get("lifestyle")),
        "features": features,
        "current_stage": _clean_text(raw_data.get("stage")),
        "timeline": _clean_text(raw_data.get("timeline")),
        "budget": _clean_text(raw_data.get("budget")),
        "client_name": _clean_text(
            client_details.get("clientName") or raw_data.get("clientName"),
            "",
        ),
        "client_phone": _clean_text(client_details.get("phone"), ""),
        "client_email": _clean_text(client_details.get("email"), ""),
        "project_location": _clean_text(project_details.get("location")),
        "plot_size": _clean_text(project_details.get("plotSize")),
        "floor_area": _clean_text(project_details.get("floorArea")),
        "bedrooms": _clean_text(project_details.get("bedrooms")),
        "bathrooms": _clean_text(project_details.get("bathrooms")),
        "storeys": _clean_text(project_details.get("storeys")),
        "document_status": "Preliminary Consultation Brief",
        "prepared_by": company["prepared_by"],
        "introduction": (
            "Thank you for exploring your project vision with Civil-Gineer Masta. "
            "This preliminary summary captures your initial preferences, priorities, "
            "anticipated timeline and budget direction. It provides a starting point "
            "for a professional consultation, site assessment and the development of "
            "a suitable architectural and technical pathway."
        ),
        "design_direction": build_design_direction(raw_data),
        "services": recommended_services(raw_data),
        "readiness_score": score,
        "readiness_label": readiness_interpretation(score),
        "readiness_explanation": readiness_explanation(score),
        "next_step": (
            "The next recommended step is to schedule a professional consultation "
            "with Civil-Gineer Masta. During the consultation, our team will review "
            "your project objectives, site requirements, design expectations, budget "
            "considerations and the appropriate architectural and engineering pathway."
        ),
        "disclaimer": (
            "This document is a preliminary project-planning summary based on the "
            "information provided by the prospective client. It does not constitute "
            "a final quotation, architectural design, structural assessment, "
            "construction estimate or contractual commitment. Final recommendations "
            "remain subject to consultation, site assessment and confirmation of the "
            "project requirements."
        ),
        "company": company,
    }
