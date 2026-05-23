import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router";
import "./App.css";
import {
  AboutPage,
  ContactPage,
  FaqPage,
  ProjectsPage,
  ServicesPage,
} from "./pages/InteriorPages";
import {
  EnquiryForm,
  Icon,
  SiteFrame,
} from "./components/SiteElements";
import {
  contactDetails,
  whatsappMessage,
  whatsappNumber,
} from "./siteContent";

function App() {
  return (
    <>
      <RouteScrollTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

function RouteScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HomePage() {

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

  const clientRequests = [
    "Architectural House Plans & Extensions",
    "Structural Analysis & Reports",
    "Patio & Outdoor Structure Design",
    "Property Maintenance Support",
    "Construction Cost Estimates",
  ];

  const faqs = [
    {
      question: "Do you do house plans?",
      answer:
        "Yes. We prepare practical house plan solutions for new builds, renovations and extensions.",
    },
    {
      question: "Can you assist with council submissions?",
      answer:
        "Yes. We support submission drawings and help clients prepare the technical information required for review.",
    },
    {
      question: "Do you provide structural reports?",
      answer:
        "Yes. We provide structural assessments and reports based on the project scope and available site information.",
    },
    {
      question: "Do you visit site before quoting?",
      answer:
        "Where a site visit is needed to confirm scope, we will advise you before finalising the quotation.",
    },
    {
      question: "Which areas do you serve?",
      answer:
        "We serve clients in Gaborone and support projects across Botswana depending on the scope and location.",
    },
    {
      question: "Can you help with renovations and extensions?",
      answer:
        "Yes. We help plan renovation and extension work with design, structural and site delivery considerations in mind.",
    },
    {
      question: "Why do I need a consultant for my project?",
      answer:
        "A consultant helps you plan properly, get technical guidance and approvals, protect structural safety, manage costs more efficiently and move through construction with fewer avoidable delays.",
    },
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

  return (
    <SiteFrame>
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
                <img
                  aria-hidden="true"
                  className="whatsappButtonIcon"
                  src="/images/Whatsapp.png"
                />
                WhatsApp Quote
              </a>

              <Link className="secondaryButton" to="/services">
                View Services
                <Icon name="arrow" />
              </Link>
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

      <section className="requestSection revealSection">
        <p className="sectionLabel">
          <Icon name="messages" />
          POPULAR CLIENT REQUESTS
        </p>
        <h2 className="sectionTitle">
          Common things clients contact us for.
        </h2>

        <div className="requestGrid">
          {clientRequests.map((request) => (
            <span className="requestTag" key={request}>
              {request}
            </span>
          ))}
        </div>
      </section>

      <section className="faqSection revealSection">
        <p className="sectionLabel red">
          <Icon name="clipboard" />
          FAQ
        </p>
        <h2 className="sectionTitle dark">Clear answers before you get started.</h2>

        <div className="faqList">
          {faqs.map((faq) => (
            <details className="faqItem" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>

        <Link className="faqPageLink" to="/faq">
          View full FAQ
          <Icon name="arrow" />
        </Link>
      </section>

      <section className="enquirySection revealSection">
        <div className="enquiryIntro">
          <p className="sectionLabel left">
            <Icon name="mail" />
            PROJECT ENQUIRY
          </p>
          <h2>Tell us what you are planning.</h2>
          <p>
            Share the essentials and your email app will open with a ready-to-send
            project enquiry.
          </p>
        </div>

        <EnquiryForm />
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
            <img
              aria-hidden="true"
              className="whatsappButtonIcon"
              src="/images/Whatsapp.png"
            />
            WhatsApp Us
          </a>
        </div>
      </section>

    </SiteFrame>
  );
}

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

export default App;
