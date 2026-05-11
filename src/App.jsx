function App() {
  const whatsappNumber = "26771839730";
  const whatsappMessage =
    "Hello Civil-Gineer Masta, I would like to request a quotation/consultation.";

  return (
    <div style={page}>
      <header style={header}>
        <div>
          <h1 style={{ margin: 0 }}>Civil-Gineer Masta (Pty) Ltd</h1>
          <p style={{ margin: "5px 0 0", fontWeight: "bold" }}>
            Building the Future, Mastering the Present
          </p>
        </div>

        <nav style={nav}>
          <a href="#services" style={navLink}>Services</a>
          <a href="#about" style={navLink}>About</a>
          <a href="#compliance" style={navLink}>Compliance</a>
          <a href="#contact" style={navLink}>Contact</a>
        </nav>
      </header>

      <section style={hero}>
        <h2 style={heroTitle}>
          Engineering • Design • Construction
        </h2>

        <p style={heroText}>
          A youth-led Botswana-based civil engineering firm delivering innovative,
          high-quality and sustainable engineering solutions for residential,
          commercial and infrastructure projects.
        </p>

        <div style={{ marginTop: "30px" }}>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            style={button}
          >
            WhatsApp Us
          </a>
        </div>
      </section>

      <section id="about" style={sectionDark}>
        <h2 style={sectionTitle}>About Us</h2>
        <p style={paragraph}>
          Civil-Gineer Masta (Pty) Ltd specializes in civil engineering consulting,
          infrastructure development, project management, architectural design,
          technical reporting, maintenance and construction support.
        </p>

        <div style={grid}>
          <div style={card}>
            <h3>Vision</h3>
            <p>
              To be Botswana’s leading civil engineering firm, recognized for
              delivering innovative solutions that shape a sustainable and
              prosperous future.
            </p>
          </div>

          <div style={card}>
            <h3>Mission</h3>
            <p>
              To provide world-class civil engineering services through technology,
              expertise, reliable service, innovation, quality and community impact.
            </p>
          </div>
        </div>
      </section>

      <section id="services" style={sectionLight}>
        <h2 style={{ ...sectionTitle, color: "#111" }}>Our Services</h2>

        <div style={grid}>
          {[
            "Civil Engineering Consulting",
            "Structural Analysis & Design",
            "Geotechnical Engineering",
            "Hydraulic Engineering",
            "Road, Drainage & Water Systems Design",
            "Project Management",
            "Architectural Design",
            "Renovation & Remodeling Design",
            "Drafting & 3D Modeling",
            "Real Estate Development",
            "Solar Energy Solutions",
            "Building Information Modeling using Revit, ArchiCAD & Prokon",
            "Technical Report Writing",
            "Quality Control & Assurance",
            "Maintenance & Repairs",
          ].map((item) => (
            <div style={lightCard} key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="compliance" style={sectionDark}>
        <h2 style={sectionTitle}>Compliance & Certification</h2>

        <div style={grid}>
          <div style={card}>
            <h3>Company Details</h3>
            <p><b>Company Name:</b> Civil-Gineer Masta (Pty) Ltd</p>
            <p><b>UIN:</b> BW00006249530</p>
            <p><b>TIN:</b> BW00006249530</p>
          </div>

          <div style={card}>
            <h3>Registrations</h3>
            <p>Tax Clearance Certificate obtained</p>
            <p>Trade License obtained</p>
            <p>PPADB registration obtained</p>
          </div>
        </div>
      </section>

      <section style={sectionLight}>
        <h2 style={{ ...sectionTitle, color: "#111" }}>Why Choose Us</h2>
        <p style={{ ...paragraph, color: "#333" }}>
          We provide a personalized approach to every project, ensuring that each
          client’s needs are handled with precision, efficiency and care. Our
          strength lies in combining engineering knowledge, project management and
          practical site experience.
        </p>
      </section>

      <section id="contact" style={contact}>
        <h2 style={{ fontSize: "42px", marginTop: 0 }}>Contact Us</h2>

        <p><b>Phone:</b> (+267) 71839730 / (+267) 77 008 234</p>
        <p><b>Email:</b> makgolokk@outlook.com / modiseboago10@gmail.com</p>
        <p><b>Physical Address:</b> Plot 31848, Gaborone North</p>
        <p><b>Postal Address:</b> P.O Box 1142, ABG, Sebele</p>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          style={{ ...button, display: "inline-block", marginTop: "20px" }}
        >
          Request a Quotation
        </a>
      </section>

      <footer style={footer}>
        © 2026 Civil-Gineer Masta (Pty) Ltd | Red • Black • White
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
  padding: "20px 30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "15px",
  color: "#111",
};

const nav = {
  display: "flex",
  gap: "18px",
  flexWrap: "wrap",
};

const navLink = {
  color: "white",
  fontWeight: "bold",
  textDecoration: "none",
};

const hero = {
  padding: "100px 20px",
  textAlign: "center",
  background:
    "linear-gradient(rgba(0,0,0,0.78), rgba(0,0,0,0.9)), radial-gradient(circle at center, #333, #111)",
};

const heroTitle = {
  fontSize: "clamp(38px, 6vw, 70px)",
  color: "#d9d9d9",
  marginBottom: "20px",
};

const heroText = {
  maxWidth: "850px",
  margin: "auto",
  fontSize: "20px",
  lineHeight: "1.7",
};

const button = {
  backgroundColor: "#ff3b1f",
  color: "white",
  padding: "15px 28px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "bold",
};

const sectionDark = {
  padding: "70px 25px",
  backgroundColor: "#181818",
};

const sectionLight = {
  padding: "70px 25px",
  backgroundColor: "#fff",
  color: "#111",
};

const sectionTitle = {
  fontSize: "clamp(30px, 4vw, 46px)",
  marginTop: 0,
  color: "#d9d9d9",
};

const paragraph = {
  maxWidth: "900px",
  fontSize: "18px",
  lineHeight: "1.7",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "30px",
};

const card = {
  backgroundColor: "#222",
  padding: "25px",
  borderRadius: "18px",
  border: "1px solid #333",
  lineHeight: "1.6",
};

const lightCard = {
  backgroundColor: "#f4f4f4",
  padding: "22px",
  borderRadius: "14px",
  borderLeft: "5px solid #c00000",
  fontWeight: "bold",
};

const contact = {
  padding: "70px 25px",
  background: "linear-gradient(90deg, #c00000, #ff3b1f)",
  color: "#111",
  fontSize: "18px",
};

const footer = {
  backgroundColor: "#000",
  padding: "25px",
  textAlign: "center",
  color: "#aaa",
};

export default App;