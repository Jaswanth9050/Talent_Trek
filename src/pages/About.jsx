import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <NavBar/>
      <div
        className="text-white d-flex align-items-center"
        style={{
          // backgroundImage: "url('/src/assets/jobimg.jpg')",
          backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPB7C_P3M_Tq4PdpipmJ9Dy96LdG5BJqOmIw&s')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          position: "relative",
        }}
      >
        <div
          className="container text-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: "3rem",
            borderRadius: "10px",
          }}
        >
          <h1 className="display-4 fw-bold">About Talent Trek</h1>
          <p className="lead">
            Your ultimate destination for career discovery and job success.
          </p>
          <button className="btn btn-outline-light mt-3 px-4 py-2">Know More</button>
        </div>
      </div>

      {/* About Us Section */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        }}
      >
        <div className="container">
          <div className="row align-items-center text-white">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="fw-bold">Who We Are</h2>
              <p className="mt-3">
                Talent Trek is your ultimate guide to navigating the job market. We connect talented individuals with exciting opportunities, helping you discover your ideal career path. Whether you're just starting out or aiming for your dream executive role, we support your journey every step of the way.
              </p>
              <button className="btn btn-light mt-3">Explore Careers</button>
            </div>
            <div className="col-md-6">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPB7C_P3M_Tq4PdpipmJ9Dy96LdG5BJqOmIw&s"width={"738px"} height={"540px"} alt="Job" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container py-5">
        <h2 className="text-primary text-center mb-4">Our Vision & Mission</h2>
        <p className="text-center">
          We envision a world where job searching is seamless and empowering. Our mission is to connect individuals with meaningful opportunities through smart technology and career insights.
        </p>
      </section>

      {/* What We Offer */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-primary mb-4 text-center">What We Offer</h2>
          <div className="row g-4">
            {[
              "Thousands of curated job listings from verified employers",
              "AI-based job recommendations tailored to your profile",
              "Resume-building tools & interview prep guides",
              "Real-time alerts & simple application tracking",
            ].map((item, index) => (
              <div key={index} className="col-md-6">
                <div className="p-3 border rounded shadow-sm bg-white">
                  <i className="bi bi-check-circle-fill text-success me-2"></i> {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-primary mb-4 text-center">Why Choose Talent Trek?</h2>
          <div className="row g-4">
            {[
              "Modern, mobile-friendly interface",
              "Opportunities across startups & MNCs",
              "Supportive community & expert advice",
              "Trusted platform with data security",
            ].map((item, index) => (
              <div key={index} className="col-md-6">
                <div className="p-3 border rounded shadow-sm bg-light">
                  <i className="bi bi-star-fill text-warning me-2"></i> {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 text-center bg-primary text-white">
        <div className="container">
          <h2 className="fw-bold">Start Your Journey with Talent Trek</h2>
          <p className="lead">Sign up to explore top jobs, get expert career advice, and more.</p>
          <button className="btn btn-light px-4 py-2 fw-bold mt-2">Join Now</button>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default About;
