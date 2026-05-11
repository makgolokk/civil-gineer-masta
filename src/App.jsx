function App() {
  const whatsappNumber = "26771839730";
  const whatsappMessage =
    "Hello Civil-Gineer Masta, I would like to request a quotation/consultation.";

  const services = [
    {
      icon: "⌂",
      title: "Architectural Design",
      text: "House plans, 3D concepts, renovations, extensions and council submission drawings.",
    },
    {
      icon: "▥",
      title: "Structural Engineering",
      text: "Structural reports, assessments, design checks, foundations, slabs and safe building solutions.",
    },
    {
      icon: "☑",
      title: "Project Management",
      text: "Site supervision, quality control, procurement coordination, budgeting and contractor management.",
    },
  ];

  const projects = [
    "Residential Houses",
    "Commercial Buildings",
    "Renovations & Extensions",
    "Structural Inspections",
    "Council Submission Support",
    "Construction Supervision",
  ];

  return (
    <div style={page}>
      <header style={header}>
        <div style={logoPanel}>
          <img src="/images/logo.png" alt="Civil-Gineer Masta Logo" style={logoImage} />
        </div>

        <nav style={nav}>
          <a href="#home" style={navLink}>Home</a>
          <a href="#services" style={navLink}>Services</a>
          <a href="#projects" style={navLink}>Projects</a>
          <a href="#about" style={navLink}>About</a>
          <a href="#contact" style={navLink}>Contact</a>
        </nav>
      </header>

      <section id="home" style={hero}>
        <div style={heroOverlay}>
          <div style={heroContent}>
            <h1 style={heroTitle}>
              Engineering • Design •<br />Project Delivery
            </h1>

            <p style={heroText}>
              Professional architectural design, structural engineering and project
              management solutions for residential and commercial projects in Botswana.
            </p>

            <div style={buttonRow}>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  whatsappMessage
                )}`}
                target="_blank"
                style={primaryButton}
              >
                WhatsApp Quote
              </a>

              <a href="#services" style={secondaryButton}>
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" style={darkSection}>
        <p style={sectionLabel}>WHAT WE DO</p>
        <h2 style={sectionTitle}>
          Focused professional services for better building decisions.
        </h2>

        <div style={threeGrid}>
          {services.map((service) => (
            <div style={serviceCard} key={service.title}>
              <div style={serviceIcon}>{service.icon}</div>
              <div>
                <h3 style={cardTitle}>{service.title}</h3>
                <p style={cardText}>{service.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" style={lightSection}>
        <p style={{ ...sectionLabel, color: "#c00000" }}>PROJECT SUPPORT</p>
        <h2 style={{ ...sectionTitle, color: "#111" }}>
          From concept and approvals to site execution.
        </h2>

        <div style={projectGrid}>
          {projects.map((project) => (
            <div style={projectItem} key={project}>
              <div style={projectIcon}>⌂</div>
              <p>{project}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" style={aboutContactWrap}>
        <div style={aboutPanel}>
          <p style={{ ...sectionLabel, textAlign: "left" }}>ABOUT US</p>
          <h2 style={aboutTitle}>Professional. Practical. Reliable.</h2>

          <p style={aboutText}>
            Civil-Gineer Masta (Pty) Ltd helps clients move from idea to approval,
            and from approval to completion. We combine technical design,
            structural understanding and site-based project management to deliver
            practical solutions that make sense on paper and on site.
          </p>
        </div>

        <div style={valuePanel}>
          <div style={valueCard}>
            <h3 style={cardTitle}>Clear Communication</h3>
            <p style={cardText}>
              We explain the scope, process and requirements clearly at every stage.
            </p>
          </div>

          <div style={valueCard}>
            <h3 style={cardTitle}>Technical Confidence</h3>
            <p style={cardText}>
              We support decisions with proper drawings, reports and engineering judgement.
            </p>
          </div>

          <div style={valueCard}>
            <h3 style={cardTitle}>Reliable Delivery</h3>
            <p style={cardText}>
              We focus on quality, planning, accountability and professional coordination.
            </p>
          </div>
        </div>

        <div id="contact" style={contactPanel}>
          <h2 style={contactTitle}>Let’s bring your project to life.</h2>

          <p style={contactText}>
            Need house plans, a structural report, design support or project management?
            Contact Civil-Gineer Masta today.
          </p>

          <p><b>Phone:</b> (+267) 71839730 / (+267) 77 008 234</p>
          <p><b>Email:</b> makgolokk@outlook.com / modiseboago10@gmail.com</p>
          <p><b>Location:</b> Plot 31848, Gaborone North</p>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            style={blackButton}
          >
            WhatsApp Us
          </a>
        </div>
      </section>

      <footer style={footer}>
        © 2026 Civil-Gineer Masta (Pty) Ltd. All Rights Reserved. | Engineering • Design • Project Delivery
      </footer>
    </div>
  );
}

const page = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#111",
  color: "white",
  minHeight: "100vh",
};

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

const hero = {
  minHeight: "520px",
  backgroundImage: "url('/images/hero.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const heroOverlay = {
  minHeight: "520px",
  background:
    "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.72) 42%, rgba(0,0,0,0.25) 100%)",
  display: "flex",
  alignItems: "center",
};

const heroContent = {
  maxWidth: "650px",
  marginLeft: "7%",
};

const heroTitle = {
  fontSize: "clamp(42px, 5vw, 72px)",
  lineHeight: "1.05",
  color: "#f5f5f5",
  marginBottom: "22px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "1.6",
  color: "#f1f1f1",
};

const buttonRow = {
  marginTop: "35px",
  display: "flex",
  gap: "18px",
  flexWrap: "wrap",
};

const primaryButton = {
  backgroundColor: "#c00000",
  color: "white",
  padding: "16px 34px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
  boxShadow: "0 8px 20px rgba(192,0,0,0.35)",
};

const secondaryButton = {
  backgroundColor: "transparent",
  color: "white",
  padding: "16px 34px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
  border: "2px solid white",
};

const darkSection = {
  padding: "45px 25px 55px",
  background: "linear-gradient(180deg, #151515, #0e0e0e)",
  borderTop: "1px solid #333",
};

const sectionLabel = {
  textAlign: "center",
  color: "#ff1f1f",
  fontWeight: "bold",
  letterSpacing: "1.5px",
  marginBottom: "8px",
};

const sectionTitle = {
  maxWidth: "950px",
  margin: "0 auto 30px",
  fontSize: "clamp(26px, 3vw, 34px)",
  textAlign: "center",
  color: "#f5f5f5",
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

const serviceIcon = {
  fontSize: "54px",
  color: "#ff1f1f",
  minWidth: "70px",
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

const lightSection = {
  padding: "45px 25px 50px",
  backgroundColor: "#f7f7f7",
  color: "#111",
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

const projectIcon = {
  fontSize: "42px",
  marginBottom: "8px",
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

const blackButton = {
  display: "inline-block",
  marginTop: "18px",
  backgroundColor: "#050505",
  color: "white",
  padding: "14px 28px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
};

const footer = {
  backgroundColor: "#050505",
  color: "#aaa",
  textAlign: "center",
  padding: "22px",
  fontSize: "14px",
};

export default App;