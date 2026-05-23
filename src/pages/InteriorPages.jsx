import { Link } from "react-router";
import {
  EnquiryForm,
  Icon,
  SiteFrame,
} from "../components/SiteElements";
import {
  contactDetails,
  enquiryEmail,
  whatsappMessage,
  whatsappNumber,
} from "../siteContent";

const aboutValues = [
  {
    title: "Practical judgement",
    text: "Design decisions are shaped for buildability, safety, budget awareness and the realities of site work.",
  },
  {
    title: "Accountability",
    text: "We value clear scope, responsible coordination and documentation that helps clients make informed decisions.",
  },
  {
    title: "Professional care",
    text: "Each project deserves attentive communication, technical discipline and respect for approvals and standards.",
  },
];

const serviceDetails = [
  {
    image: "/images/temporary/service-architectural-design.jpg",
    title: "Architectural Design",
    text: "Concept layouts, house plans, space planning, 3D direction, drawing development and council submission drawing support.",
    deliverables: ["New homes", "Submission drawing support", "Design revisions"],
  },
  {
    image: "/images/temporary/service-structural-engineering.jpg",
    title: "Structural Engineering",
    text: "Engineering input for foundations, slabs, load paths, structural checks and solutions that suit the intended building work.",
    deliverables: ["Structural design checks", "Foundation guidance", "Safe detailing input"],
  },
  {
    image: "/images/temporary/service-project-management.jpg",
    title: "Project Management",
    text: "Planning and coordination support that keeps design intent, contractor activity, budget awareness and quality aligned.",
    deliverables: ["Programme coordination", "Contractor liaison", "Progress tracking"],
  },
  {
    image: "/images/temporary/service-construction-support.jpg",
    title: "Construction Support",
    text: "Technical assistance during construction when questions, drawing interpretation and site decisions need prompt attention.",
    deliverables: ["Site queries", "Buildability reviews", "Delivery support"],
  },
  {
    image: "/images/temporary/service-property-maintenance.jpg",
    title: "Property Maintenance",
    text: "Property condition support for owners planning repairs, maintenance priorities and responsible upkeep.",
    deliverables: ["Condition observations", "Repair priorities", "Maintenance planning"],
  },
  {
    image: "/images/temporary/service-renovations-extensions.jpg",
    title: "Renovations & Extensions",
    text: "Design and structural thinking for alterations that need to work with the existing property and future use.",
    deliverables: ["Extensions", "Alteration planning", "Existing-building coordination"],
  },
  {
    image: "/images/temporary/service-site-supervision.jpg",
    title: "Site Supervision",
    text: "Construction oversight focused on quality checks, progress visibility and helping work follow the agreed information.",
    deliverables: ["Quality observations", "Site reporting", "Progress review"],
  },
  {
    image: "/images/temporary/service-structural-reports.jpg",
    title: "Structural Reports",
    text: "Structural assessments and written reporting based on the project scope, observations and available site information.",
    deliverables: ["Assessment scope", "Inspection findings", "Technical reporting"],
  },
];

// Replace image paths with finished project photography as the portfolio grows.
const projectCards = [
  {
    category: "Residential houses",
    title: "Family Home Design Support",
    image: "/images/temporary/project-residential-house.jpg",
    text: "New-home planning, architectural direction and engineering input for confident residential delivery.",
  },
  {
    category: "Commercial works",
    title: "Commercial Building Coordination",
    image: "/images/temporary/project-commercial-works.jpg",
    text: "Design coordination, technical review and delivery planning for business-focused building work.",
  },
  {
    category: "Renovations",
    title: "Extension & Alteration Review",
    image: "/images/temporary/project-renovation-extension.jpg",
    text: "Renovation and extension support that connects improved spaces with the existing property.",
  },
  {
    category: "Inspections",
    title: "Structural Inspection Visit",
    image: "/images/temporary/project-structural-inspection.jpg",
    text: "Careful observations, reporting scope and next-step technical guidance for building conditions.",
  },
  {
    category: "Structural works",
    title: "Structural Design Check",
    image: "/images/temporary/project-structural-works.jpg",
    text: "Structural detailing and construction-stage review for foundations, slabs and frame elements.",
  },
  {
    category: "Project supervision",
    title: "Site Progress Oversight",
    image: "/images/temporary/project-supervision.jpg",
    text: "Supervision, progress visibility and contractor coordination while work moves on site.",
  },
];

const faqItems = [
  {
    question: "Why do I need a consultant?",
    answer:
      "A consultant helps translate your project idea into coordinated technical information, flags safety and approval needs early, and gives you clearer decisions before and during construction.",
  },
  {
    question: "Do you prepare council submission drawings?",
    answer:
      "Yes. Civil-Gineer Masta can support council submission drawing preparation and advise on the information needed for the relevant project scope.",
  },
  {
    question: "Do you do renovations and extensions?",
    answer:
      "Yes. We help with renovation and extension planning, drawings, structural considerations and delivery support depending on the work required.",
  },
  {
    question: "Do you provide structural reports?",
    answer:
      "Yes. Structural reports can be prepared after the required scope, observations and available project information are reviewed.",
  },
  {
    question: "Do you supervise construction work?",
    answer:
      "Yes. Site supervision support can cover progress observations, quality checks, technical coordination and reporting for the agreed scope.",
  },
  {
    question: "How do I request a quotation?",
    answer:
      "Use WhatsApp, email or the project enquiry form with your project type, location, required service and any drawings, photos or deadlines already available.",
  },
  {
    question: "What information should I provide before a site visit?",
    answer:
      "Share the site location, contact person, project description, existing drawings or photos if available, the issue to be reviewed and any access or timing constraints.",
  },
  {
    question: "Do you do house plans?",
    answer:
      "Yes. We prepare practical house plan solutions for new builds, alterations and extensions.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "The company is based in Botswana and serves Gaborone while supporting projects in other areas depending on scope and location.",
  },
];

export function AboutPage() {
  return (
    <SiteFrame>
      <InteriorHero
        label="Company Profile"
        title="Civil-Gineer Masta"
        text="A Botswana-based engineering, design and project delivery partner for clients who need professional building decisions from concept to site."
      />

      <section className="interiorBand profileIntro">
        <div className="storyBlock">
          <p className="sectionLabel left">
            <Icon name="building" />
            OUR STORY
          </p>
          <h2>Built around technical clarity and practical delivery.</h2>
          <p>
            Civil-Gineer Masta supports property owners, developers and project teams
            as ideas move into drawings, approvals and construction. The company brings
            architectural thinking, structural understanding and site coordination into
            one focused service experience.
          </p>
          <p>
            Our approach is straightforward: understand the brief, define the technical
            path, communicate clearly and help the project move with fewer avoidable
            surprises.
          </p>
        </div>

        <div className="purposeGrid">
          <article className="purposeItem">
            <h3>Mission</h3>
            <p>
              Deliver dependable design and engineering support that improves safety,
              buildability and client confidence.
            </p>
          </article>
          <article className="purposeItem">
            <h3>Vision</h3>
            <p>
              Be a trusted Botswana construction consultancy known for practical
              solutions and professional project delivery.
            </p>
          </article>
        </div>
      </section>

      <section className="interiorBand lightInteriorBand">
        <p className="sectionLabel red">
          <Icon name="shield" />
          VALUES
        </p>
        <h2 className="sectionTitle dark">The standard we bring to the work.</h2>
        <div className="valueStatementGrid">
          {aboutValues.map((value) => (
            <article className="valueStatement" key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="interiorBand capabilityBand">
        <div className="capabilityColumn">
          <p className="sectionLabel left">
            <Icon name="hardhat" />
            TEAM CAPABILITY
          </p>
          <h2>Design, engineering and site-minded coordination.</h2>
          <p>
            Capability can include architectural drawing development, structural
            assessment, project management, inspections, site supervision and
            construction support matched to the project appointment.
          </p>
        </div>
        <div className="profileFacts">
          <article>
            <h3>Service coverage</h3>
            <p>
              Based in Botswana with Gaborone service access and support across the
              country where scope, programme and location align.
            </p>
          </article>
          <article>
            <h3>Professional placeholders</h3>
            <p>
              Add ERB registration details, engineering credentials, appointment roles
              and any required professional disclosures here when confirmed.
            </p>
          </article>
        </div>
      </section>
    </SiteFrame>
  );
}

export function ServicesPage() {
  return (
    <SiteFrame>
      <InteriorHero
        label="Services"
        title="Engineering support shaped for real building work."
        text="Choose focused help for design, technical review, approvals preparation, construction coordination and property improvement."
      />

      <section className="interiorBand servicesBand">
        <div className="detailServiceGrid">
          {serviceDetails.map((service) => (
            <article className="detailService" key={service.title}>
              <img src={service.image} alt={service.title} />
              <div>
                <h2>{service.title}</h2>
                <p>{service.text}</p>
                <ul>
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <PageContactStrip text="Share your project stage and the service you need, and we will help define the next technical step." />
      </section>
    </SiteFrame>
  );
}

export function ProjectsPage() {
  return (
    <SiteFrame>
      <InteriorHero
        label="Projects"
        title="Project support across design, inspection and delivery."
        text="Representative project categories for residential, commercial, renovation, structural and site supervision work."
      />

      <section className="interiorBand lightInteriorBand portfolioBand">
        <div className="portfolioGrid">
          {projectCards.map((project) => (
            <article className="portfolioCard" key={project.title}>
              <img src={project.image} alt={project.title} />
              <div>
                <p>{project.category}</p>
                <h2>{project.title}</h2>
                <span>{project.text}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}

export function FaqPage() {
  return (
    <SiteFrame>
      <InteriorHero
        label="FAQ"
        title="Answers before drawings and site work begin."
        text="Start with the project questions clients ask most often, then send the details that make your quotation or consultation easier to scope."
      />

      <section className="interiorBand lightInteriorBand fullFaqBand">
        <div className="faqList">
          {faqItems.map((faq) => (
            <details className="faqItem" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
        <PageContactStrip text="Need an answer tied to your property or building stage? Send the brief directly." />
      </section>
    </SiteFrame>
  );
}

export function ContactPage() {
  return (
    <SiteFrame>
      <InteriorHero
        label="Contact"
        title="Start your project enquiry."
        text="Tell Civil-Gineer Masta what you are planning, where the project is and the support you need."
      />

      <section className="interiorBand contactPageBand">
        <div className="contactPageLead">
          <p className="sectionLabel left">
            <Icon name="phone" />
            DIRECT CONTACT
          </p>
          <h2>Reach the team in the channel that suits the job.</h2>
          <div className="contactActionRow">
            <a
              className="primaryButton"
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              rel="noreferrer"
              target="_blank"
            >
              <img
                aria-hidden="true"
                className="whatsappButtonIcon"
                src="/images/Whatsapp.png"
              />
              WhatsApp Enquiry
            </a>
            <a
              className="secondaryButton"
              href={`mailto:${enquiryEmail}?subject=${encodeURIComponent(
                "Civil-Gineer Masta Project Enquiry"
              )}`}
            >
              <Icon name="mail" />
              Email Enquiry
            </a>
          </div>

          <div className="contactFactList">
            {contactDetails.map((detail) => (
              <p className="contactLine" key={detail.label}>
                <Icon name={detail.icon} />
                <span>
                  <b>{detail.label}:</b> {detail.value}
                </span>
              </p>
            ))}
          </div>
        </div>

        <div className="contactFormWrap">
          <EnquiryForm />
        </div>
      </section>

      <section className="interiorBand lightInteriorBand contactInfoBand">
        <article>
          <h2>Operating hours</h2>
          <p>Monday to Friday: 08:00 - 17:00</p>
          <p>Saturday: By appointment</p>
          <p>Sunday and public holidays: Enquiries received for follow-up.</p>
        </article>
        <article>
          <h2>Service area</h2>
          <p>
            Gaborone-based support for Botswana projects, with scope and travel
            requirements confirmed during enquiry review.
          </p>
        </article>
        <article>
          <h2>Ready to help</h2>
          <p>
            Thank you for considering Civil-Gineer Masta. We look forward to helping
            you plan, check and deliver your next building project responsibly.
          </p>
        </article>
      </section>
    </SiteFrame>
  );
}

function InteriorHero({ label, text, title }) {
  return (
    <section className="interiorHero">
      <div className="interiorHeroOverlay">
        <div className="interiorHeroCopy">
          <p className="sectionLabel left">{label}</p>
          <h1>{title}</h1>
          <p>{text}</p>
          <div className="interiorHeroLinks">
            <Link className="primaryButton" to="/contact">
              Request a Quote
              <Icon name="arrow" />
            </Link>
            <Link className="secondaryButton" to="/services">
              Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PageContactStrip({ text }) {
  return (
    <div className="pageContactStrip">
      <p>{text}</p>
      <Link className="primaryButton" to="/contact">
        Contact Civil-Gineer Masta
        <Icon name="arrow" />
      </Link>
    </div>
  );
}
