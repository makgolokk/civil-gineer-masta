from pathlib import Path

COMPANY_SETTINGS = {
    "name": "Civil-Gineer Masta (Pty) Ltd",
    "tagline": "BUILDING THE FUTURE, MASTERING THE PRESENT",
    "address": "Plot 31848, Gaborone North, Gaborone, Botswana",
    "phone": "+267 71839730 / +267 77008234",
    "whatsapp": "+267 71839730",
    "email": "makgolokk@outlook.com",
    "registration": "BW00006249530",
    "prepared_by": "Civil-Gineer Masta",
}

ASSET_DIR = Path(__file__).resolve().parent / "assets"
LOGO_PATH = ASSET_DIR / "cgm-logo.png"

COLORS = {
    "red": "#DF101B",
    "dark_red": "#B70C15",
    "black": "#111111",
    "slate": "#59677D",
    "mid_gray": "#737E8F",
    "line": "#D4DAE4",
    "panel": "#F8F9FB",
    "soft_red": "#FFF4F5",
    "white": "#FFFFFF",
}
