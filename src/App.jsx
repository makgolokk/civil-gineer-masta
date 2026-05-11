function App() {
  const whatsappNumber = "26771839730";
  const whatsappMessage =
    "Hello Civil-Gineer Masta, I would like to request a quotation/consultation.";

  const services = [
    {
      title: "Architectural Design",
      text: "House plans, 3D concepts, renovations, extensions and council submission drawings.",
    },
    {
      title: "Structural Engineering",
      text: "Structural reports, assessments, design checks, foundations, slabs and safe building solutions.",
    },
    {
      title: "Project Management",
      text: "Site supervision, quality control, procurement coordination, budgeting and contractor management.",
    },
  ];

  return (
    <div style={page}>
      <header style={header}>
        <div>
          <h1 style={logo}>Civil-Gineer Masta</h1>
          <p style={tagline}>Building the Future, Mastering the Present</p>
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
        <h2 style={heroTitle}>Engineering • Design • Project Delivery</h2>

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
            Get a Quote
          </a>

          <a href="#services" style={secondaryButton}>
            View Services
          </a>
        </div>
      </section>

      <section id="services" style={darkSection}>
        <p style={sectionLabel}>WHAT WE DO</p>
        <h2 style={sectionTitle}>
          Focused professional services for better building decisions.
        </h2>

        <div style={threeGrid}>
          {services.map((service) => (
            <div style={card} key={service.title}>
              <h3 style={cardTitle}>{service.title}</h3>
              <p style={cardText}>{service.text}</p>
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
          <div style={lightCard}>Residential houses</div>
          <div style={lightCard}>Commercial buildings</div>
          <div style={lightCard}>Renovations and extensions</div>
          <div style={lightCard}>Structural inspections</div>
          <div style={lightCard}>Council submission support</div>
          <div style={lightCard}>Construction supervision</div>
        </div>
      </section>

      <section id="about" style={darkSection}>
        <p style={sectionLabel}>ABOUT US</p>
        <h2 style={sectionTitle}>Professional. Practical. Reliable.</h2>

        <p style={aboutText}>
          Civil-Gineer Masta (Pty) Ltd helps clients move from idea to approval,
          and from approval to completion. We combine technical design,
          structural understanding and site-based project management to deliver
          practical solutions that make sense on paper and on site.
        </p>

        <div style={threeGrid}>
          <div style={infoCard}>
            <h3 style={cardTitle}>Clear Communication</h3>
            <p style={cardText}>
              We explain the scope, process and requirements clearly so clients
              understand what is being done and why.
            </p>
          </div>

          <div style={infoCard}>
            <h3 style={cardTitle}>Technical Confidence</h3>
            <p style={cardText}>
              We support decisions with proper drawings, reports, assessments
              and practical engineering judgement.
            </p>
          </div>

          <div style={infoCard}>
            <h3 style={cardTitle}>Reliable Delivery</h3>
            <p style={cardText}>
              We focus on quality, planning, accountability and professional
              project coordination from start to finish.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" style={contactSection}>
        <h2 style={contactTitle}>Let’s bring your project to life.</h2>

        <p style={contactText}>
          Need house plans, a structural report, design support or project
          management? Contact Civil-Gineer Masta today.
        </p>

        <div style={contactBox}>
          <p><b>Phone:</b> (+267) 71839730 / (+267) 77 008 234</p>
          <p><b>Email:</b> makgolokk@outlook.com / modiseboago10@gmail.com</p>
          <p><b>Location:</b> Plot 31848, Gaborone North</p>
        </div>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage
          )}`}
          target="_blank"
          style={blackButton}
        >
          WhatsApp Us
        </a>
      </section>

      <footer style={footer}>
        © 2026 Civil-Gineer Masta (Pty) Ltd. Architectural Design • Structural Engineering • Project Management.
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
  background: "linear-gradient(90deg, #c00000, #ff3b1f)",
  padding: "25px 35px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "15px",
};

const logo = {
  margin: 0,
  fontSize: "36px",
  color: "#111",
};

const tagline = {
  margin: "5px 0 0",
  color: "#111",
  fontWeight: "bold",
};

const nav = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const navLink = {
  color: "white",
  fontWeight: "bold",
  textDecoration: "none",
};

const hero = {
  padding: "110px 20px",
  textAlign: "center",
  background:
    "linear-gradient(rgba(0,0,0,0.78), rgba(0,0,0,0.92)), radial-gradient(circle at center, #333, #111)",
};

const heroTitle = {
  fontSize: "clamp(38px, 6vw, 72px)",
  color: "#d9d9d9",
  marginBottom: "20px",
};

const heroText = {
  maxWidth: "850px",
  margin: "auto",
  fontSize: "20px",
  lineHeight: "1.7",
  color: "#f1f1f1",
};

const buttonRow = {
  marginTop: "35px",
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  flexWrap: "wrap",
};

const primaryButton = {
  backgroundColor: "#ff3b1f",
  color: "white",
  padding: "15px 32px",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "bold",
};

const secondaryButton = {
  backgroundColor: "transparent",
  color: "white",
  padding: "15px 32px",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "bold",
  border: "2px solid white",
};

const darkSection = {
  padding: "75px 25px",
  backgroundColor: "#181818",
};

const lightSection = {
  padding: "75px 25px",
  backgroundColor: "#fff",
  color: "#111",
};

const sectionLabel = {
  textAlign: "center",
  color: "#ff3b1f",
  fontWeight: "bold",
  letterSpacing: "2px",
};

const sectionTitle = {
  maxWidth: "900px",
  margin: "10px auto 35px",
  fontSize: "clamp(30px, 4vw, 46px)",
  textAlign: "center",
  color: "#d9d9d9",
};

const threeGrid = {
  maxWidth: "1100px",
  margin: "35px auto 0",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "22px",
};

const projectGrid = {
  maxWidth: "1100px",
  margin: "35px auto 0",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
};

const card = {
  backgroundColor: "#222",
  padding: "30px",
  borderRadius: "16px",
  border: "1px solid #333",
};

const infoCard = {
  backgroundColor: "#222",
  padding: "25px",
  borderRadius: "16px",
  border: "1px solid #333",
};

const cardTitle = {
  color: "#ff3b1f",
  marginTop: 0,
};

const cardText = {
  color: "#ddd",
  lineHeight: "1.6",
};

const lightCard = {
  backgroundColor: "#f4f4f4",
  padding: "24px",
  borderRadius: "15px",
  borderLeft: "5px solid #c00000",
  fontWeight: "bold",
};

const aboutText = {
  maxWidth: "950px",
  margin: "auto",
  fontSize: "18px",
  lineHeight: "1.8",
  textAlign: "center",
  color: "#ddd",
};

const contactSection = {
  padding: "75px 25px",
  background: "linear-gradient(90deg, #c00000, #ff3b1f)",
  color: "#111",
  textAlign: "center",
};

const contactTitle = {
  fontSize: "clamp(32px, 4vw, 50px)",
  marginTop: 0,
};

const contactText = {
  maxWidth: "750px",
  margin: "auto",
  fontSize: "19px",
  lineHeight: "1.7",
  fontWeight: "bold",
};

const contactBox = {
  maxWidth: "750px",
  margin: "30px auto",
  backgroundColor: "rgba(255,255,255,0.25)",
  padding: "20px",
  borderRadius: "15px",
  fontSize: "18px",
};

const blackButton = {
  display: "inline-block",
  backgroundColor: "#111",
  color: "white",
  padding: "15px 32px",
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "bold",
};

const footer = {
  backgroundColor: "#000",
  color: "#aaa",
  textAlign: "center",
  padding: "25px",
};

export default App;