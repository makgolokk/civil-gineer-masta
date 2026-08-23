import { useState } from "react";
import { Link, Navigate, useParams } from "react-router";
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
import {
  getServiceDiscipline,
  serviceDisciplines,
} from "../serviceDisciplines";
import { getProject, projectCategories, projects } from "../projectPortfolio";

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
            CGM brings architectural drawing development, structural judgement,
            project management, inspections and construction support into one
            coordinated service pathway matched to the appointment.
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
            <h3>Evidence-led appointments</h3>
            <p>
              Every project begins with a defined brief, scope and stage. Our portfolio
              shows the models, drawings and site records behind that practical approach.
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
        title="Choose the discipline your project needs."
        text="Five focused service areas replace overlapping lists. Open a discipline to understand its scope, process, likely deliverables and the information that helps us advise you properly."
      />

      <section className="interiorBand servicesBand">
        <div className="serviceHubIntro">
          <p className="sectionLabel left">
            <Icon name="ruler" />
            SERVICE DISCIPLINES
          </p>
          <h2>Start broad, then focus on the decisions that matter.</h2>
          <p>
            Some projects need one discipline; others need several working together.
            Each page below explains the service without repeating related work as a
            separate product.
          </p>
        </div>
        <div className="disciplineGrid">
          {serviceDisciplines.map((service, index) => (
            <article className="disciplineCard" key={service.slug}>
              <img src={service.image} alt="" decoding="async" loading="lazy" />
              <div>
                <span>0{index + 1}</span>
                <h2>{service.title}</h2>
                <p>{service.summary}</p>
                <Link className="disciplineLink" to={`/services/${service.slug}`}>
                  Explore this discipline
                  <Icon name="arrow" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <PageContactStrip text="Share your project stage and the service you need, and we will help define the next technical step." />
      </section>
    </SiteFrame>
  );
}

export function ServiceDetailPage() {
  const { serviceSlug } = useParams();
  const service = getServiceDiscipline(serviceSlug);

  if (!service) {
    return <Navigate replace to="/services" />;
  }

  const relatedServices = serviceDisciplines.filter(
    (item) => item.slug !== service.slug
  );

  return (
    <SiteFrame>
      <section
        className="serviceDetailHero"
        style={{ "--service-image": `url("${service.heroImage}")` }}
      >
        <div className="serviceDetailHeroOverlay">
          <div className="serviceDetailHeroCopy">
            <Link to="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <p>{service.shortTitle}</p>
            <h1>{service.title}</h1>
            <p>{service.summary}</p>
            <Link className="primaryButton" to="/contact">
              Discuss this service
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="interiorBand serviceDetailIntro">
        <div>
          <p className="sectionLabel left">
            <Icon name="clipboard" />
            DISCIPLINE OVERVIEW
          </p>
          <h2>What this service helps you decide.</h2>
          <p>{service.introduction}</p>
        </div>
        <aside>
          <h3>This may fit your project if you need:</h3>
          <ul>
            {service.suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="serviceCapabilityBand">
        <div className="interiorBand">
          <p className="sectionLabel red">CAPABILITIES</p>
          <h2 className="sectionTitle dark">One discipline, clearly organised.</h2>
          <div className="serviceCapabilityGrid">
            {service.capabilities.map((capability) => (
              <article key={capability.title}>
                <h3>{capability.title}</h3>
                <p>{capability.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="interiorBand serviceWorkingGrid">
        <div>
          <p className="sectionLabel left">HOW THE APPOINTMENT WORKS</p>
          <ol className="serviceProcessList">
            {service.process.map((item, index) => (
              <li key={item}>
                <span>{index + 1}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="serviceInfoPanels">
          <article>
            <h2>Possible deliverables</h2>
            <ul>
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h2>What to prepare</h2>
            <ul>
              {service.prepare.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="interiorBand relatedServicesBand">
        <div>
          <p className="sectionLabel left">RELATED DISCIPLINES</p>
          <h2>Bring in another discipline only when the project needs it.</h2>
        </div>
        <div className="relatedServiceLinks">
          {relatedServices.map((item) => (
            <Link key={item.slug} to={`/services/${item.slug}`}>
              <span>{item.shortTitle}</span>
              <Icon name="arrow" />
            </Link>
          ))}
        </div>
        <PageContactStrip text="Tell us the project stage and the decision you need to make. We will help define an appropriate service scope." />
      </section>
    </SiteFrame>
  );
}

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const visibleProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <SiteFrame>
      <InteriorHero
        label="Projects"
        title="Proof across the full project journey."
        text="Ten evidence-backed project stories show how Civil-Gineer Masta plans, designs, documents and supports building work across Botswana."
      />

      <section className="interiorBand lightInteriorBand portfolioBand">
        <div className="portfolioIntro">
          <div>
            <p className="sectionLabel red">SELECTED WORK</p>
            <h2>Architecture, technical detail, interiors and site support.</h2>
          </div>
          <p>
            These profiles are drawn from CGM models, drawing sets and site records.
            Personal details are removed, and every status label describes the documented
            project stage rather than implying completion.
          </p>
        </div>

        <div className="portfolioFilters" aria-label="Filter projects">
          {projectCategories.map((category) => (
            <button
              aria-pressed={activeCategory === category}
              className={activeCategory === category ? "isActive" : undefined}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="portfolioGrid">
          {visibleProjects.map((project) => (
            <article className="portfolioCard" key={project.title}>
              <Link className="portfolioImageLink" to={`/projects/${project.slug}`}>
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.category}`}
                  decoding="async"
                  loading="lazy"
                />
              </Link>
              <div>
                <div className="portfolioMeta">
                  <p>{project.category}</p>
                  <span>{project.stage}</span>
                </div>
                <h2><Link to={`/projects/${project.slug}`}>{project.title}</Link></h2>
                <p className="portfolioLocation">{project.location}</p>
                <span>{project.summary}</span>
                <Link className="portfolioStoryLink" to={`/projects/${project.slug}`}>
                  View project story <Icon name="arrow" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <PageContactStrip text="Planning something similar? Share your location, project stage and the decision you need help making." />
      </section>
    </SiteFrame>
  );
}

export function ProjectDetailPage() {
  const { projectSlug } = useParams();
  const project = getProject(projectSlug);

  if (!project) return <Navigate replace to="/projects" />;

  return (
    <SiteFrame>
      <section className="projectDetailHero">
        <div>
          <Link className="projectBackLink" to="/projects">
            <Icon name="arrow" /> All projects
          </Link>
          <p className="sectionLabel left">{project.category}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
        <img src={project.image} alt={`${project.title} project evidence`} />
      </section>

      <section className="interiorBand lightInteriorBand projectStoryBand">
        <div className="projectFactGrid">
          <div><span>Location</span><strong>{project.location}</strong></div>
          <div><span>Current stage</span><strong>{project.stage}</strong></div>
          <div><span>Evidence</span><strong>{project.proof}</strong></div>
        </div>

        <div className="projectNarrativeGrid">
          <article>
            <p className="sectionLabel red">THE BRIEF</p>
            <h2>Challenge</h2>
            <p>{project.challenge}</p>
          </article>
          <article>
            <p className="sectionLabel red">CGM RESPONSE</p>
            <h2>Coordinated thinking</h2>
            <p>{project.response}</p>
          </article>
        </div>

        <div className="projectScopeBlock">
          <p className="sectionLabel red">CGM ROLE</p>
          <h2>Scope demonstrated</h2>
          <div className="projectScopeList">
            {project.scope.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>

        <div className={`projectGallery${project.gallery.length === 1 ? " isSingle" : ""}`}>
          {project.gallery.map((image, index) => (
            <img
              alt={`${project.title} evidence ${index + 1}`}
              decoding="async"
              key={image}
              loading={index === 0 ? "eager" : "lazy"}
              src={image}
            />
          ))}
        </div>

        <PageContactStrip text="Need this mix of design clarity and technical coordination? Tell us where your project is and what stage it has reached." />
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
