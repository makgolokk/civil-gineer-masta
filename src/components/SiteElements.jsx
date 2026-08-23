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
import { trackEvent } from "../analytics";

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
    <header className="header">
      <NavLink
        aria-label="Civil-Gineer Masta home"
        className="logoPanel"
        onClick={() => setIsNavOpen(false)}
        to="/"
      >
        <img
          className="logoImage"
          src="/images/logo.png"
          alt="Civil-Gineer Masta Logo"
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

      <nav className={`nav${isNavOpen ? " isOpen" : ""}`} id="site-nav">
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) => (isActive ? "isActive" : undefined)}
            end={item.to === "/"}
            key={item.label}
            onClick={() => setIsNavOpen(false)}
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
    <footer className="footer">
      <div className="footerBrand">
        <img src="/images/logo.png" alt="Civil-Gineer Masta" />
        <p>Design, engineering judgement and project delivery connected from brief to site.</p>
      </div>
      <div>
        <strong>Explore</strong>
        <Link to="/projects">Projects</Link>
        <Link to="/services">Services</Link>
        <Link to="/about">About</Link>
      </div>
      <div>
        <strong>Start a project</strong>
        <Link to="/contact">Project enquiry</Link>
        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp CGM</a>
        <a href={`mailto:${enquiryEmail}`}>{enquiryEmail}</a>
      </div>
      <div>
        <strong>Service area</strong>
        <span>Gaborone North</span>
        <span>Projects across Botswana</span>
        <small>&copy; 2026 Civil-Gineer Masta (Pty) Ltd.</small>
      </div>
    </footer>
  );
}
const emptyEnquiry = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  service: "",
  description: "",
};

function projectBriefToEnquiry(projectBrief) {
  if (!projectBrief) return emptyEnquiry;

  const serviceByProjectType = {
    "Family Home": "Architectural Design & Approvals",
    "Rental Units": "Architectural Design & Approvals",
    "Luxury Villa": "Architectural Design & Approvals",
    "Commercial Building": "Architectural Design & Approvals",
    "Boundary Wall": "Structural Engineering & Assessments",
    "Renovation / Extension": "Architectural Design & Approvals",
  };
  const details = [
    ["Project type", projectBrief.projectType],
    ["Site position", projectBrief.stageProfile?.siteStatus],
    ["Design position", projectBrief.stageProfile?.designStatus],
    ["Project goal", projectBrief.lifestyle],
    ["Design direction", projectBrief.style],
    ["Project priorities", projectBrief.features?.join(", ")],
    ["Preferred timeline", projectBrief.timeline],
    ["Budget direction", projectBrief.budget],
  ];

  return {
    ...emptyEnquiry,
    fullName: projectBrief.clientDetails?.clientName || "",
    email: projectBrief.clientDetails?.email || "",
    phone: projectBrief.clientDetails?.phone || "",
    location: projectBrief.projectDetails?.location || "",
    service: serviceByProjectType[projectBrief.projectType] || "Other",
    description: [
      ...details,
      ["Plot size", projectBrief.projectDetails?.plotSize],
      ["Target floor area", projectBrief.projectDetails?.floorArea],
      ["Bedrooms / main rooms", projectBrief.projectDetails?.bedrooms],
      ["Bathrooms", projectBrief.projectDetails?.bathrooms],
      ["Building levels", projectBrief.projectDetails?.storeys],
      ["Rental units planned", projectBrief.projectDetails?.unitCount],
      ["Preferred unit mix", projectBrief.projectDetails?.unitMix],
      ["Rental operations", projectBrief.projectDetails?.rentalOperations],
      ["Main business use", projectBrief.projectDetails?.businessUse],
      ["Parking requirement", projectBrief.projectDetails?.parkingNeed],
      ["Approximate wall length", projectBrief.projectDetails?.wallLength],
      ["Gate and access needs", projectBrief.projectDetails?.gateNeeds],
      ["Existing property changes", projectBrief.projectDetails?.existingCondition],
      ["Current site use", projectBrief.projectDetails?.existingSiteUse],
    ]
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n"),
  };
}
export function EnquiryForm({ initialProjectBrief = null }) {
  const formKey = initialProjectBrief
    ? JSON.stringify({
        projectType: initialProjectBrief.projectType,
        projectDetails: initialProjectBrief.projectDetails,
        clientDetails: initialProjectBrief.clientDetails,
      })
    : "standard-enquiry";

  return (
    <EnquiryFormFields
      initialProjectBrief={initialProjectBrief}
      key={formKey}
    />
  );
}
function EnquiryFormFields({ initialProjectBrief }) {
  const [values, setValues] = useState(() =>
    projectBriefToEnquiry(initialProjectBrief)
  );
  const [submission, setSubmission] = useState({
    state: "idle",
    message: "",
  });
  const fallbackEmailBody = [
    "Hello Civil-Gineer Masta,",
    "",
    "I would like you to review my project brief.",
    "",
    `Full Name: ${values.fullName}`,
    `Email Address: ${values.email}`,
    `Phone Number: ${values.phone}`,
    `Project Location: ${values.location}`,
    `Service Needed: ${values.service}`,
    "",
    "Project Brief:",
    values.description,
    "",
    "Thank you.",
  ].join("\n");
  const fallbackEmailUrl = `mailto:${enquiryEmail}?subject=${encodeURIComponent(
    `Project Brief Review - ${values.fullName || "Prospective Client"}`
  )}&body=${encodeURIComponent(fallbackEmailBody)}`;

  const updateField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleEnquirySubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    trackEvent("enquiry_submission_started", {
      service: values.service,
      source: initialProjectBrief ? "planner" : "standard_form",
    });
    setSubmission({ state: "sending", message: "" });

    try {
      const response = await fetch(
        import.meta.env.VITE_ENQUIRY_API_URL || "/api/enquiry",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            projectData: initialProjectBrief,
            website: form.get("website"),
          }),
        }
      );
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Your enquiry could not be sent.");
      }

      setSubmission({
        state: "success",
        message:
          payload.briefAttached
            ? "Your enquiry and professional PDF brief have been sent to our review team."
            : "Your project enquiry has been sent. We will review it and contact you.",
      });
      trackEvent("enquiry_submission_completed", {
        service: values.service,
        source: initialProjectBrief ? "planner" : "standard_form",
      });
    } catch (error) {
      setSubmission({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your enquiry could not be sent.",
      });
      trackEvent("enquiry_submission_failed", {
        service: values.service,
        source: initialProjectBrief ? "planner" : "standard_form",
      });
    }
  };

  return (
    <form className="enquiryForm" onSubmit={handleEnquirySubmit}>
      <label className="enquiryHoneypot" aria-hidden="true">
        <span>Website</span>
        <input autoComplete="off" name="website" tabIndex="-1" type="text" />
      </label>
      <label>
        <span>Full Name</span>
        <input
          autoComplete="name"
          name="fullName"
          onChange={updateField}
          required
          type="text"
          value={values.fullName}
        />
      </label>

      <label>
        <span>Email Address</span>
        <input
          autoComplete="email"
          name="email"
          onChange={updateField}
          required
          type="email"
          value={values.email}
        />
      </label>

      <label>
        <span>Phone Number</span>
        <input
          autoComplete="tel"
          name="phone"
          onChange={updateField}
          required
          type="tel"
          value={values.phone}
        />
      </label>

      <label>
        <span>Project Location</span>
        <input
          name="location"
          onChange={updateField}
          required
          type="text"
          value={values.location}
        />
      </label>

      <label className="enquiryWide">
        <span>Service Needed</span>
        <select name="service" onChange={updateField} required value={values.service}>
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
        <textarea
          name="description"
          onChange={updateField}
          required
          rows="7"
          value={values.description}
        />
      </label>

      <button
        className="enquirySubmit"
        disabled={submission.state === "sending"}
        type="submit"
      >
        <Icon name="mail" />
        {submission.state === "sending"
          ? "Sending Your Brief..."
          : "Send My Project Brief for Review"}
      </button>

      {submission.message && (
        <div
          className={`enquiryStatus ${submission.state}`}
          role={submission.state === "error" ? "alert" : "status"}
        >
          <span>{submission.message}</span>
          {submission.state === "error" && (
            <a href={fallbackEmailUrl}>Send the prepared email instead</a>
          )}
        </div>
      )}
    </form>
  );
}
