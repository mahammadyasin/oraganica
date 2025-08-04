import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <section
      id="contact"
      style={{ padding: "50px", backgroundColor: "#eef2f5" }}
    >
      <div style={{ marginBottom: "20px" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#007bff",
            fontWeight: "bold",
          }}
        >
          ← Back to Home
        </Link>
      </div>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Contact Us</h2>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          We'd love to hear from you! Whether you have a question about our
          products, need assistance, or just want to give feedback — feel free
          to reach out.
        </p>
        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input type="text" placeholder="Your Name" style={inputStyle} />
          <input type="email" placeholder="Your Email" style={inputStyle} />
          <textarea
            rows="5"
            placeholder="Your Message"
            style={inputStyle}
          ></textarea>
          <button type="submit" style={buttonStyle}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

const inputStyle = {
  padding: "10px",
  fontSize: "1rem",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#28a745",
  color: "white",
  fontSize: "1rem",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Contact;
