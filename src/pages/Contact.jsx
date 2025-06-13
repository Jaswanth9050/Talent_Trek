import React from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const Contact = () => {
  return (
    <div style={{
      background: "linear-gradient(to right, rgba(255, 230, 230, 1), rgba(174, 220, 238, 1), rgba(148, 187, 233, 1))",
      minHeight: "100vh",
      fontFamily: "'Poppins', sans-serif"
    }}>
      <NavBar />

      {/* Hero Section */}
      <section className="text-center py-5 mt-3">
        <h1 className="display-4 fw-bold" style={{
          background: 'linear-gradient(45deg, #ff6f61, #ffac33, #4db8ff)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}>
          We'd Love to Hear From You
        </h1>
        <p className="lead text-secondary">Whether you're curious about our services or need support — we're here to answer any questions.</p>
      </section>

      {/* Contact Info & Form */}
      <div className="container mb-5">
        <div className="row g-4">
          <div className="col-md-6">
            <h2 className="text-primary mb-4" style={{
              background: 'linear-gradient(90deg, rgba(255, 85, 85, 1), rgba(0, 204, 255, 1))',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              Customer Support
            </h2>
            <h5>Email: <span className='text-primary'>TalentTrek@gmail.com</span></h5>
            <h5>Find us on</h5>
            <div className="fs-3 text-primary">
              <i className="bi bi-linkedin mx-2 hover-icon"></i>
              <i className="bi bi-facebook mx-2 hover-icon"></i>
              <i className="bi bi-whatsapp mx-2 hover-icon"></i>
              <i className="bi bi-twitter mx-2 hover-icon"></i>
            </div>
            <h2 className="mt-4" style={{
              background: 'linear-gradient(45deg, rgba(255, 85, 85, 1), rgba(0, 204, 255, 1))',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              Corporate Office
            </h2>
            <p>5th Floor, Tech Hub Building, KPHB Phase 2, Kukatpally, Hyderabad - 500072, Telangana, India</p>
            <button className='btn btn-outline-primary' style={{ fontSize: '18px', borderRadius: '30px', transition: '0.3s ease' }}>
              Get Directions
            </button>

            {/* Embedded Google Map */}
            <div className="mt-4">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.282627474214!2d78.3908032751874!3d17.48473338318659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb919acdc2b3f3%3A0x71b1fc2a9d264e12!2sKPHB%2C%20Kukatpally%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1688654321234"
                width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-md-6">
            <div className="card shadow-lg p-4 hover-card">
              <h3 className="text-center mb-4 text-primary">Get in Touch</h3>
              <div className="form-floating mb-3">
                <input type="text" className="form-control form-custom" id="floatingName" placeholder="Enter Your Name" />
                <label htmlFor="floatingName">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="email" className="form-control form-custom" id="floatingEmail" placeholder="name@example.com" />
                <label htmlFor="floatingEmail">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <textarea className="form-control form-custom" placeholder="Leave a comment here" id="floatingTextarea" style={{ height: '120px' }}></textarea>
                <label htmlFor="floatingTextarea">Message</label>
              </div>
              <button type="button" className='btn btn-primary w-100' style={{ transition: '0.3s ease', fontSize: '16px' }}>Submit</button>
              <p className="text-center mt-3">By contacting us, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4" style={{
            background: 'linear-gradient(45deg, rgba(255, 85, 85, 1), rgba(0, 204, 255, 1))',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>Frequently Asked Questions</h2>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                  How can I contact TalentTrek support?
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  You can reach us anytime via email at <strong>TalentTrek@gmail.com</strong> or through our social media handles.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                  Where is your corporate office located?
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse">
                <div className="accordion-body">
                  Our office is located in KPHB, Kukatpally, Hyderabad, Telangana.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                  What is the response time for queries?
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse">
                <div className="accordion-body">
                  We typically respond within 24 to 48 business hours.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="bg-white py-5">
        <div className="container text-center">
          <h2 className="text-secondary mb-4" style={{
            background: 'linear-gradient(45deg, rgba(255, 85, 85, 1), rgba(0, 204, 255, 1))',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>Meet Our Support Team</h2>
          <div className="row justify-content-center">
            {["Anjali", "Rahul", "Priya"].map((name, idx) => (
              <div className="col-md-3 mx-3" key={idx}>
                <img src={`https://randomuser.me/api/portraits/${idx % 2 === 0 ? "women" : "men"}/${idx + 10}.jpg`}
                     className="rounded-circle mb-3" width="100" alt={name} />
                <h5>{name} Verma</h5>
                <p className="text-muted">Support Executive</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Stay up to date with the latest news and updates from TalentTrek.</p>
          <input type="email" className="form-control mb-3 w-50 mx-auto" placeholder="Enter your email" />
          <button className="btn btn-light">Subscribe</button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
