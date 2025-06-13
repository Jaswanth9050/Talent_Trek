import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Employee_Home = () => {
  const navigate = useNavigate();
  return (
    <div className="col-12 col-md-8 col-lg-9 d-flex flex-column justify-content-center align-items-center text-center text-white">
    <h1
      style={{
        fontFamily: 'cursive',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '1rem',
      }}
    >
      Welcome to <span style={{ color: '#ffc107' }}>Talent-Trek</span>
    </h1>
    <p style={{ fontSize: '1.2rem', maxWidth: '500px' }}>
      Discover and connect with top talent to grow your dream team. Manage postings and more.
    </p>
    <button
      className="btn btn-light mt-4 fw-bold px-4 py-2"
      style={{
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        borderRadius: '30px',
      }}
      onClick={() => navigate('create_jobs')}
      
    >
      Start Posting
    </button>
  </div>
  )
}

export default Employee_Home