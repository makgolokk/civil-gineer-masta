function App() {
  return (
    <div style={{
      fontFamily: "Arial",
      backgroundColor: "#111",
      color: "white",
      minHeight: "100vh"
    }}>
      
      <header style={{
        backgroundColor: "#c00000",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1>Civil-Gineer Masta</h1>

        <nav style={{ display: "flex", gap: "20px" }}>
          <a href="#" style={{ color: "white" }}>Home</a>
          <a href="#" style={{ color: "white" }}>Services</a>
          <a href="#" style={{ color: "white" }}>Projects</a>
          <a href="#" style={{ color: "white" }}>Contact</a>
        </nav>
      </header>

      <section style={{
        padding: "100px 20px",
        textAlign: "center"
      }}>
        <h2 style={{
          fontSize: "50px",
          marginBottom: "20px",
          color: "#d9d9d9"
        }}>
          Engineering • Design • Construction
        </h2>

        <p style={{
          maxWidth: "700px",
          margin: "auto",
          fontSize: "20px",
          lineHeight: "1.6"
        }}>
          Professional civil engineering, architectural design,
          structural reports, project management and construction solutions in Botswana.
        </p>

        <button style={{
          marginTop: "30px",
          padding: "15px 30px",
          backgroundColor: "#c00000",
          border: "none",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
          borderRadius: "10px"
        }}>
          Get a Quote
        </button>
      </section>

      <section style={{
        padding: "50px 20px",
        backgroundColor: "#1c1c1c"
      }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: "40px"
        }}>
          Our Services
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px"
        }}>
          
          <div style={{
            backgroundColor: "#222",
            padding: "20px",
            borderRadius: "15px"
          }}>
            <h3>Architectural Design</h3>
            <p>House plans, 3D concepts and council submissions.</p>
          </div>

          <div style={{
            backgroundColor: "#222",
            padding: "20px",
            borderRadius: "15px"
          }}>
            <h3>Structural Engineering</h3>
            <p>Structural reports, inspections and design checks.</p>
          </div>

          <div style={{
            backgroundColor: "#222",
            padding: "20px",
            borderRadius: "15px"
          }}>
            <h3>Project Management</h3>
            <p>Site supervision, planning and quality control.</p>
          </div>

        </div>
      </section>

      <footer style={{
        backgroundColor: "#000",
        padding: "20px",
        textAlign: "center"
      }}>
        <p>© 2026 Civil-Gineer Masta | Gaborone, Botswana</p>
      </footer>

    </div>
  );
}

export default App;