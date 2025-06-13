
import React from 'react';

const Category = () => {
  const categories = [
    { icon: "bi-house-door", label: "Remote" },
    { icon: "bi-building", label: "MNC" },
    { icon: "bi-bar-chart-line", label: "Analytics" },
    { icon: "bi-graph-up-arrow", label: "Marketing" },
    { icon: "bi-lightbulb", label: "Startup" },
    { icon: "bi-currency-dollar", label: "Sales" },
    { icon: "bi-mortarboard", label: "Engineering" },
    { icon: "bi-award", label: "Fortune 500" },
    { icon: "bi-cpu", label: "Data Science" },
    { icon: "bi-bank", label: "Banking & Finance" },
    { icon: "bi-laptop", label: "Software & IT" },
  ];

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    padding: '20px',
    color: '#fff',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
  };

  return (
    <div className='container py-5'>
      <h2 className="text-center mb-5 fw-bold" style={{
        background: 'linear-gradient(to right, #007cf0, #00dfd8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2.2rem',
        fontWeight: '800',
        // color:'white'
      }}>
        💼 Explore Job Categories
      </h2>

      <div className="row g-4 justify-content-center">
        {categories.map((cat, index) => (
          <div className="col-6 col-md-3 col-lg-2" key={index}>
            <div
              className="text-center"
              style={{
                ...cardStyle,
                background: 'linear-gradient(145deg, #2b5876, #4e4376)',
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <i className={`bi ${cat.icon} fs-2 mb-2`}></i>
              <div style={{ fontWeight: '600', fontSize: '1rem' }}>{cat.label}</div>
              <div><i className="bi bi-arrow-right-circle-fill"></i></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
