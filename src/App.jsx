import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router";
import "./App.css";
import {
  AboutPage,
  ContactPage,
  FaqPage,
  ProjectsPage,
  ProjectDetailPage,
  ServiceDetailPage,
  ServicesPage,
} from "./pages/InteriorPages";
import {
  EnquiryForm,
  Icon,
  SiteFrame,
} from "./components/SiteElements";
import DreamProjectPlanner from "./components/DreamProjectPlanner";
import {
  contactDetails,
  whatsappMessage,
  whatsappNumber,
} from "./siteContent";
import { featuredProjects, projects } from "./projectPortfolio";

function App() {
  return (
    <>
      <SiteMeta />
      <RouteScrollTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectSlug" element={<ProjectDetailPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

function SiteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const project = pathname.startsWith("/projects/")
      ? projects.find((item) => `/projects/${item.slug}` === pathname)
      : null;
    const metadata = project
      ? {
          title: `${project.title} | Civil-Gineer Masta`,
          description: project.summary,
          image: project.image,
        }
      : {
          "/": {
            title: "Civil-Gineer Masta | Design, Engineering & Project Delivery",
            description: "Botswana architectural design, structural engineering, project management and construction support from one coordinated team.",
          },
          "/projects": {
            title: "Selected Projects | Civil-Gineer Masta Botswana",
            description: "Explore evidence-backed CGM residential, multi-residential, renovation, interior and technical project work across Botswana.",
          },
          "/services": {
            title: "Building Consultancy Services | Civil-Gineer Masta",
            description: "Architectural design, structural engineering, project management, construction support and property improvement services in Botswana.",
          },
          "/about": {
            title: "About Civil-Gineer Masta | Botswana Building Consultancy",
            description: "Meet a Botswana-based design, engineering and project-delivery partner focused on clear technical decisions and practical site outcomes.",
          },
          "/contact": {
            title: "Start a Project | Civil-Gineer Masta",
            description: "Contact Civil-Gineer Masta about house plans, structural support, renovations, interiors, project management or construction oversight.",
          },
        }[pathname] || {
          title: "Civil-Gineer Masta | Botswana",
          description: "Professional design, engineering and project delivery support in Botswana.",
        };

    document.title = metadata.title;
    const absoluteUrl = `https://civil-gineer-masta.vercel.app${pathname}`;
    const setMeta = (selector, attribute, value) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute(attribute, value);
    };
    setMeta('meta[name="description"]', "content", metadata.description);
    setMeta('meta[property="og:title"]', "content", metadata.title);
    setMeta('meta[property="og:description"]', "content", metadata.description);
    setMeta('meta[property="og:url"]', "content", absoluteUrl);
    setMeta('meta[property="og:image"]', "content", metadata.image || "/images/hero.png");
    setMeta('link[rel="canonical"]', "href", absoluteUrl);
  }, [pathname]);

  return null;
}

function RouteScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HomePage() {
  const [plannerBrief, setPlannerBrief] = useState(null);

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
              <span className="heroLine heroLineLead">One team from concept</span>
              <span className="heroLine">to construction.</span>
            </h1>

            <p>
              CGM connects architectural design, engineering judgement, approvals,
              project coordination and site support for buildable projects in Botswana.
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

      <section className="homeProofStrip" aria-label="Civil-Gineer Masta capabilities">
        <div><strong>10</strong><span>Evidence-backed project stories</span></div>
        <div><strong>5</strong><span>Connected professional service areas</span></div>
        <div><strong>BW</strong><span>Botswana-based project support</span></div>
        <div><strong>1</strong><span>Coordinated route from brief to site</span></div>
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

      <section className="capabilityJourney revealSection">
        <div className="capabilityJourneyIntro">
          <p className="sectionLabel red">ONE COORDINATED TEAM</p>
          <h2>Plan. Design. Verify. Deliver.</h2>
          <p>
            CGM connects the early brief to technical information and site decisions,
            so clients do not have to treat architecture, engineering judgement and
            delivery support as separate conversations.
          </p>
        </div>
        <div className="capabilityJourneyGrid">
          {[
            ["01", "Plan", "Briefs, feasibility, site use and a practical route through the project."],
            ["02", "Design", "Architectural layouts, visualisation, approvals information and detailed coordination."],
            ["03", "Verify", "Structural thinking, technical review, inspections and documented decisions."],
            ["04", "Deliver", "Site observations, project coordination, quality visibility and close-out support."],
          ].map(([number, title, text]) => (
            <article key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <DreamProjectPlanner onConsultation={setPlannerBrief} />

      <section className="lightSection revealSection" id="projects">
        <p className="sectionLabel red">
          <Icon name="clipboard" />
          PORTFOLIO PREVIEW
        </p>
        <h2 className="sectionTitle dark">
          Recent CGM work, from design thinking to site delivery.
        </h2>

        <div className="homeProjectHighlights">
          {featuredProjects.map((project) => (
            <article key={project.title}>
              <Link to={`/projects/${project.slug}`}>
                <img src={project.image} alt={`${project.title} - ${project.category}`} decoding="async" loading="lazy" />
              </Link>
              <div>
                <span>{project.category}</span>
                <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
                <p>{project.location}</p>
              </div>
            </article>
          ))}
        </div>
        <Link className="faqPageLink" to="/projects">
          Explore selected projects
          <Icon name="arrow" />
        </Link>
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
          <h2>Let us review the project you have already shaped.</h2>
          <p>
            Send your brief directly to Civil-Gineer Masta. We will review the
            project direction first, so our response can focus on useful next steps.
          </p>
        </div>

        <EnquiryForm initialProjectBrief={plannerBrief} />
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
