import React from "react";
import { Link } from "react-router-dom";

function Blog() {
  const blogs = [
    {
      id: 1,
      title: "5 Benefits of Organic Vegetables",
      date: "July 30, 2025",
      content:
        "Organic vegetables are free from harmful chemicals and are rich in nutrients. They promote a healthier lifestyle and are better for the environment.",
    },
    {
      id: 2,
      title: "Why Choose Organic Products?",
      date: "July 25, 2025",
      content:
        "Organic products ensure sustainable farming practices, better taste, and more nutrition. It's a great choice for your family and future.",
    },
  ];

  return (
    <section id="blog" style={{ padding: "50px", backgroundColor: "#f9f9f9" }}>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginBottom: "30px",
          color: "#007bff",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        ← Back to Home
      </Link>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Latest Blog Posts
      </h2>
      {blogs.map((blog) => (
        <div
          key={blog.id}
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{blog.title}</h3>
          <p style={{ fontSize: "0.9rem", color: "#777" }}>{blog.date}</p>
          <p>{blog.content}</p>
        </div>
      ))}
    </section>
  );
}

export default Blog;
