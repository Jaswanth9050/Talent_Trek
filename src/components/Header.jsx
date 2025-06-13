// Designed ui

import React from 'react';
import { Link, Navigate } from 'react-router-dom';

const Header = () => {
  const backgroundImage = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"; // Free to use career/business image

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "100px 20px",
        minHeight: "100vh",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          padding: "50px 30px",
          maxWidth: "900px",
          width: "100%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)"
        }}
      >
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: "700",
            fontSize: "3rem",
            marginBottom: "20px",
            background: "linear-gradient(to right, #ffc107, #0dcaf0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Make your dream career a reality
        </h1>
        <p className="fw-semibold" style={{ fontSize: "1.1rem", color: "#f8f9fa", marginBottom: "40px" }}>
          "Talent Trek is your ultimate guide to navigating the job market. 
          We connect talented individuals with exciting opportunities, helping you discover your ideal career path. 
          Explore a wide range of job postings, from entry-level positions to executive roles, and take the next step 
          toward a fulfilling career. Whether you're a seasoned professional or just starting out, Talent Trek is here 
          to support your journey every step of the way."
        </p>
        <Link to={'/jobs'}>
        <button className="btn btn-warning px-4 py-2 fs-5 fw-bold shadow" >
          🚀 Find A Job
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
