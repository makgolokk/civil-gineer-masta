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
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const whatsappNumber = "26771839730";
  const whatsappMessage =
    "Hello Civil-Gineer Masta, I would like to request a quotation/consultation.";

  useEffect(() => {
    const revealSections = document.querySelectorAll(".revealSection");

    if (!("IntersectionObserver" in window)) {
      revealSections.forEach((section) => section.classList.add("isVisible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("isVisible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 }
    );

    revealSections.forEach((section) => {
      section.classList.add("isRevealReady");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      image: "/images/architectural-design.png",
      title: "Architectural Design",
      text: "House plans, 3D concepts, renovations, extensions and council submission drawings.",
    },
    {
      image: "/images/structural-engineering.png",
      title: "Structural Engineering",
      text: "Structural reports, assessments, design checks, foundations, slabs and safe building solutions.",
    },
    {
      image: "/images/project-management.png",
      title: "Project Management",
      text: "Site supervision, quality control, procurement coordination, budgeting and contractor management.",
    },
  ];

  const projects = [
    {
      icon: "house",
      title: "Residential Houses",
    },
    {
      icon: "building",
      title: "Commercial Buildings",
    },
    {
      icon: "renovation",
      title: "Renovations & Extensions",
    },
    {
      icon: "clipboard",
      title: "Structural Inspections",
    },
    {
      icon: "permit",
      title: "Council Submission Support",
    },
    {
      icon: "hardhat",
      title: "Construction Supervision",
    },
  ];

  const navItems = [
    { href: "#home", icon: "home", label: "Home" },
    { href: "#services", icon: "ruler", label: "Services" },
    { href: "#projects", icon: "building", label: "Projects" },
    { href: "#about", icon: "shield", label: "About" },
    { href: "#contact", icon: "phone", label: "Contact" },
  ];

  const values = [
    {
      icon: "messages",
      title: "Clear Communication",
      text: "We explain the scope, process and requirements clearly at every stage.",
    },
    {
      icon: "shield",
      title: "Technical Confidence",
      text: "We support decisions with proper drawings, reports and engineering judgement.",
    },
    {
      icon: "handshake",
      title: "Reliable Delivery",
      text: "We focus on quality, planning, accountability and professional coordination.",
    },
  ];

  const contactDetails = [
    {
      icon: "phone",
      label: "Phone",
      value: "(+267) 71839730 / (+267) 77 008 234",
    },
    {
      icon: "mail",
      label: "Email",
      value: "makgolokk@outlook.com / modiseboago10@gmail.com",
    },
    {
      icon: "pin",
      label: "Location",
      value: "Plot 31848, Gaborone North",
    },
  ];

  return (
    <div className="page">
      <header className="header" style={header}>
        <div className="logoPanel" style={logoPanel}>
          <img
            className="logoImage"
            src="/images/logo.png"
            alt="Civil-Gineer Masta Logo"
            style={logoImage}
          />
        </div>

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
            <a
              href={item.href}
              key={item.label}
              onClick={() => setIsNavOpen(false)}
              style={navLink}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="heroOverlay">
          <div className="heroContent">
            <h1>
              <span className="heroLine heroLineLead">Engineering | Design</span>
              <span className="heroLine">Project Delivery</span>
            </h1>

            <p>
              Professional architectural design, structural engineering and project
              management solutions for residential and commercial projects in Botswana.
            </p>

            <div className="buttonRow">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  whatsappMessage
                )}`}
                target="_blank"
                rel="noreferrer"
                className="primaryButton"
              >
                <Icon name="messages" />
                WhatsApp Quote
              </a>

              <a className="secondaryButton" href="#services">
                View Services
                <Icon name="arrow" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="darkSection revealSection" id="services">
        <p className="sectionLabel">
          <Icon name="ruler" />
          WHAT WE DO
        </p>
        <h2 className="sectionTitle">
          Focused professional services for better building decisions.
        </h2>

        <div className="serviceGrid" style={threeGrid}>
          {services.map((service) => (
            <div className="serviceCard" style={serviceCard} key={service.title}>
              <img
                className="serviceIcon"
                src={service.image}
                alt={service.title}
                style={serviceImage}
              />
              <div>
                <h3 style={cardTitle}>{service.title}</h3>
                <p style={cardText}>{service.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="lightSection revealSection" id="projects">
        <p className="sectionLabel red">
          <Icon name="clipboard" />
          PROJECT SUPPORT
        </p>
        <h2 className="sectionTitle dark">
          From concept and approvals to site execution.
        </h2>

        <div className="projectGrid" style={projectGrid}>
          {projects.map((project) => (
            <div className="projectItem" style={projectItem} key={project.title}>
              <span className="projectIcon" aria-hidden="true">
                <Icon name={project.icon} />
              </span>
              <p>{project.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="aboutContactWrap revealSection" id="about" style={aboutContactWrap}>
        <div className="aboutPanel" style={aboutPanel}>
          <p className="sectionLabel left">
            <Icon name="building" />
            ABOUT US
          </p>
          <h2 style={aboutTitle}>Professional. Practical. Reliable.</h2>

          <p style={aboutText}>
            Civil-Gineer Masta (Pty) Ltd helps clients move from idea to approval,
            and from approval to completion. We combine technical design,
            structural understanding and site-based project management to deliver
            practical solutions that make sense on paper and on site.
          </p>
        </div>

        <div className="valuePanel" style={valuePanel}>
          {values.map((value) => (
            <div className="valueCard" style={valueCard} key={value.title}>
              <span className="valueIcon" aria-hidden="true">
                <Icon name={value.icon} />
              </span>
              <h3 style={cardTitle}>{value.title}</h3>
              <p style={cardText}>{value.text}</p>
            </div>
          ))}
        </div>

        <div className="contactPanel" id="contact" style={contactPanel}>
          <h2 style={contactTitle}>Let's bring your project to life.</h2>

          <p style={contactText}>
            Need house plans, a structural report, design support or project management?
            Contact Civil-Gineer Masta today.
          </p>

          <div className="contactList">
            {contactDetails.map((detail) => (
              <p className="contactLine" key={detail.label}>
                <Icon name={detail.icon} />
                <span>
                  <b>{detail.label}:</b> {detail.value}
                </span>
              </p>
            ))}
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            rel="noreferrer"
            className="blackButton"
          >
            <Icon name="messages" />
            WhatsApp Us
          </a>
        </div>
      </section>

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
        <Icon name="messages" />
        <span>WhatsApp</span>
      </a>

      <footer className="footer" style={footer}>
        &copy; 2026 Civil-Gineer Masta (Pty) Ltd. All Rights Reserved. | Engineering | Design | Project Delivery
      </footer>
    </div>
  );
}

const header = {
  height: "115px",
  background: "linear-gradient(90deg, #ffffff 0%, #ffffff 24%, #c00000 24%, #b00000 100%)",
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

const threeGrid = {
  maxWidth: "1180px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
  gap: "22px",
};

const serviceCard = {
  backgroundColor: "rgba(255,255,255,0.04)",
  border: "1px solid #444",
  borderRadius: "8px",
  padding: "28px",
  display: "flex",
  alignItems: "center",
  gap: "25px",
};

const serviceImage = {
  width: "72px",
  height: "72px",
  objectFit: "contain",
  minWidth: "72px",
};

const cardTitle = {
  color: "#fff",
  marginTop: 0,
  marginBottom: "10px",
};

const cardText = {
  color: "#d8d8d8",
  lineHeight: "1.55",
  margin: 0,
};

const projectGrid = {
  maxWidth: "1180px",
  margin: "25px auto 0",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "10px",
};

const projectItem = {
  textAlign: "center",
  padding: "20px 15px",
  borderRight: "1px solid #d0d0d0",
  fontWeight: "bold",
};

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

function Icon({ name }) {
  const IconComponent = iconComponents[name];

  return <IconComponent aria-hidden="true" className="uiIcon" strokeWidth={1.8} />;
}

const aboutContactWrap = {
  display: "grid",
  gridTemplateColumns: "1.3fr 1fr 1.25fr",
  backgroundColor: "#111",
};

const aboutPanel = {
  padding: "55px 50px",
};

const aboutTitle = {
  fontSize: "34px",
  marginTop: 0,
};

const aboutText = {
  color: "#d8d8d8",
  lineHeight: "1.75",
};

const valuePanel = {
  padding: "45px 35px",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "18px",
};

const valueCard = {
  padding: "20px 10px",
};

const contactPanel = {
  background: "linear-gradient(135deg, #d00000, #a80000)",
  color: "white",
  padding: "50px",
};

const contactTitle = {
  fontSize: "32px",
  marginTop: 0,
};

const contactText = {
  lineHeight: "1.6",
};

const footer = {
  backgroundColor: "#050505",
  color: "#aaa",
  textAlign: "center",
  padding: "22px",
  fontSize: "14px",
};

export default App;
