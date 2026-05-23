import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  FileCheck2,
  Hammer,
  Handshake,
  HardHat,
  Home,
  House,
  Mail,
  MapPin,
  Menu,
  MessagesSquare,
  Phone,
  Ruler,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import {
  enquiryEmail,
  serviceOptions,
  whatsappMessage,
  whatsappNumber,
} from "../siteContent";

const navItems = [
  { to: "/", icon: "home", label: "Home" },
  { to: "/services", icon: "ruler", label: "Services" },
  { to: "/projects", icon: "building", label: "Projects" },
  { to: "/about", icon: "shield", label: "About" },
  { to: "/contact", icon: "phone", label: "Contact" },
];

const iconComponents = {
  arrow: ArrowRight,
  building: Building2,
  clipboard: ClipboardCheck,
  close: X,
  handshake: Handshake,
  hardhat: HardHat,
  home: Home,
  house: House,
  mail: Mail,
  menu: Menu,
  messages: MessagesSquare,
  permit: FileCheck2,
  phone: Phone,
  pin: MapPin,
  renovation: Hammer,
  ruler: Ruler,
  shield: ShieldCheck,
};

export function Icon({ name }) {
  const IconComponent = iconComponents[name];

  return <IconComponent aria-hidden="true" className="uiIcon" strokeWidth={1.8} />;
}

export function SiteFrame({ children }) {
  return (
    <div className="page">
      <SiteHeader />
      <main>{children}</main>
      <FloatingWhatsapp />
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="header" style={header}>
      <NavLink
        aria-label="Civil-Gineer Masta home"
        className="logoPanel"
        onClick={() => setIsNavOpen(false)}
        style={logoPanel}
        to="/"
      >
        <img
          className="logoImage"
          src="/images/logo.png"
          alt="Civil-Gineer Masta Logo"
          style={logoImage}
        />
      </NavLink>

      <button
        aria-controls="site-nav"
        aria-expanded={isNavOpen}
        aria-label={isNavOpen ? "Close navigation menu" : "Open navigation menu"}
        className="navToggle"
        onClick={() => setIsNavOpen((open) => !open)}
        type="button"
      >
        <Icon name={isNavOpen ? "close" : "menu"} />
      </button>

      <nav className={`nav${isNavOpen ? " isOpen" : ""}`} id="site-nav" style={nav}>
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) => (isActive ? "isActive" : undefined)}
            end={item.to === "/"}
            key={item.label}
            onClick={() => setIsNavOpen(false)}
            style={navLink}
            to={item.to}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

function FloatingWhatsapp() {
  return (
    <a
      aria-label="Chat with Civil-Gineer Masta on WhatsApp"
      className="floatingWhatsapp"
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`}
      rel="noreferrer"
      target="_blank"
      title="WhatsApp Civil-Gineer Masta"
    >
      <img
        aria-hidden="true"
        className="floatingWhatsappIcon"
        src="/images/Whatsapp.png"
      />
    </a>
  );
}

function SiteFooter() {
  return (
    <footer className="footer" style={footer}>
      &copy; 2026 Civil-Gineer Masta (Pty) Ltd. All Rights Reserved. | Engineering |
      Design | Project Delivery
    </footer>
  );
}

export function EnquiryForm() {
  const handleEnquirySubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const emailBody = [
      "Hello Civil-Gineer Masta,",
      "",
      "I would like to enquire about a project.",
      "",
      `Full Name: ${form.get("fullName")}`,
      `Email Address: ${form.get("email")}`,
      `Phone Number: ${form.get("phone")}`,
      `Project Location: ${form.get("location")}`,
      `Service Needed: ${form.get("service")}`,
      "",
      "Brief Project Description:",
      `${form.get("description")}`,
      "",
      "Thank you.",
    ].join("\n");

    window.location.href = `mailto:${enquiryEmail}?subject=${encodeURIComponent(
      "Project Enquiry - Civil-Gineer Masta"
    )}&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <form className="enquiryForm" onSubmit={handleEnquirySubmit}>
      <label>
        <span>Full Name</span>
        <input autoComplete="name" name="fullName" required type="text" />
      </label>

      <label>
        <span>Email Address</span>
        <input autoComplete="email" name="email" required type="email" />
      </label>

      <label>
        <span>Phone Number</span>
        <input autoComplete="tel" name="phone" required type="tel" />
      </label>

      <label>
        <span>Project Location</span>
        <input name="location" required type="text" />
      </label>

      <label className="enquiryWide">
        <span>Service Needed</span>
        <select defaultValue="" name="service" required>
          <option disabled value="">
            Select a service
          </option>
          {serviceOptions.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </label>

      <label className="enquiryWide">
        <span>Brief Project Description</span>
        <textarea name="description" required rows="4" />
      </label>

      <button className="enquirySubmit" type="submit">
        <Icon name="mail" />
        Send Enquiry by Email
      </button>
    </form>
  );
}

const header = {
  height: "115px",
  background:
    "linear-gradient(90deg, #ffffff 0%, #ffffff 24%, #c00000 24%, #b00000 100%)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingRight: "55px",
  position: "sticky",
  top: 0,
  zIndex: 20,
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
};

const logoPanel = {
  height: "115px",
  width: "330px",
  backgroundColor: "white",
  borderBottomRightRadius: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const logoImage = {
  width: "260px",
  height: "95px",
  objectFit: "contain",
};

const nav = {
  display: "flex",
  gap: "45px",
  flexWrap: "wrap",
};

const navLink = {
  color: "white",
  fontWeight: "bold",
  textDecoration: "none",
  fontSize: "16px",
};

const footer = {
  backgroundColor: "#050505",
  color: "#aaa",
  textAlign: "center",
  padding: "22px",
  fontSize: "14px",
};
