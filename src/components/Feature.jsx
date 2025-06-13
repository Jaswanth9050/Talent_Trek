// FINAL DESIGN

import React from 'react';
import { Link } from 'react-router-dom';

const companies = [
  {
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    rating: 4.5,
    reviews: 1200,
    description: 'Leading the world in AI innovation, cloud computing, and search technology.',
  },
  {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    rating: 4.2,
    reviews: 980,
    description: 'Global e-commerce and cloud services leader shaping digital marketplaces.',
  },
  {
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    rating: 4.3,
    reviews: 1100,
    description: 'Empowering every person and organization on the planet to achieve more.',
  },
  {
    name: 'TCS',
    logo: 'https://cdn.i.haymarketmedia.asia/?n=campaign-india%2Fcontent%2F20230531101105_Tata_Consultancy_Services_Logo.svg.png&h=570&w=855&q=100&v=20250320&c=1',
    rating: 4.0,
    reviews: 875,
    description: 'One of the world’s largest IT services companies, driving digital transformation.',
  },
];

const Feature = () => {
  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(to right, #f8f9fa, #e3f2fd)",
        borderRadius: '20px',
        marginTop: '3rem',
      }}
    >
      <h2
        className="text-center fw-bold mb-5"
        style={{
          background: 'linear-gradient(to right, #ff6f61, #ffca28, #4caf50)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.2rem',
        }}
      >
        🌟 Featured Companies Actively Hiring
      </h2>

      <div className="container">
        <div className="row g-4">
          {companies.map((company, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
              <div
                className="card h-100 shadow-sm border-0 text-center"
                style={{
                  borderRadius: '15px',
                  transition: 'transform 0.3s ease',
                  background: 'white',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div
                  className="p-3"
                  style={{
                    background: 'linear-gradient(90deg, #64b5f6, #81c784)',
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px',
                  }}
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="img-fluid"
                    style={{ height: '60px', objectFit: 'contain' }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="fw-bold text-dark">{company.name}</h5>
                  <p className="text-warning mb-1">
                    ⭐ {company.rating} <span className="text-muted">({company.reviews} Reviews)</span>
                  </p>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                    {company.description}
                  </p>
                </div>
                <div className="pb-3">
                  <button className="btn btn-outline-primary rounded-pill px-4">
                    View Jobs
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
           <Link to={'/jobs'}>
           <button className="btn btn-warning rounded-pill px-5 py-2 fw-bold shadow-sm">
            View More
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Feature;
