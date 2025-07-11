
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5">
      <div className="container">
        <div className="row text-md-start text-center">
          {/* About */}
          <div className="col-md-3 col-12 mb-4">
            <h5 className="fw-bold text-warning mb-3">About Us</h5>
            <p style={{ lineHeight: '1.6', fontSize: '14px' }}>
              We connect top talent with top companies. Explore thousands of jobs and start your career journey today with confidence and clarity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 col-6 mb-4">
            <h5 className="fw-bold text-warning mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-white text-decoration-none d-block mb-2">About Us</Link></li>
              <li><Link to="/contact" className="text-white text-decoration-none d-block mb-2">Contact</Link></li>
              <li><Link to="/privacy" className="text-white text-decoration-none d-block mb-2">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white text-decoration-none d-block mb-2">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 col-6 mb-4">
            <h5 className="fw-bold text-warning mb-3">Contact</h5>
            <p className="mb-1"><i className="bi bi-envelope-fill me-2 text-warning"></i> talent_trek@jobportal.com</p>
            <p className="mb-1"><i className="bi bi-telephone-fill me-2 text-warning"></i> +91 9876543210</p>
            <p><i className="bi bi-geo-alt-fill me-2 text-warning"></i> Hyderabad, India</p>
          </div>

          {/* Newsletter */}
          <div className="col-md-3 col-12 mb-4">
            <h5 className="fw-bold text-warning mb-3">Newsletter</h5>
            <p style={{ fontSize: '14px' }}>Get updates on new jobs & company news.</p>
            <div className="input-group">
              <input type="email" className="form-control" placeholder="Your email" />
              <button className="btn btn-warning">Subscribe</button>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: '#666' }} />

        {/* Socials and Copyright */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pb-3">
          <div className="mb-2 mb-md-0">
            <Link to="https://facebook.com" className="text-white me-3"><i className="bi bi-facebook fs-4"></i></Link>
            <Link to="https://twitter.com" className="text-white me-3"><i className="bi bi-twitter fs-4"></i></Link>
            <Link to="https://instagram.com" className="text-white me-3"><i className="bi bi-instagram fs-4"></i></Link>
            <Link to="https://linkedin.com" className="text-white"><i className="bi bi-linkedin fs-4"></i></Link>
          </div>
          <p className="mb-0 text-secondary">&copy; 2025 Talent Trek. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
