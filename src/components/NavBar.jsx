import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("Student_Login");
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white fixed-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bolder" to="/" style={{ fontSize: '1.8rem' }}>
          <span style={{
            background: 'linear-gradient(to right, #dc3545, #0d6efd)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Talent Trek
          </span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav" aria-controls="navbarNav"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-dark" to="/">Home</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link fw-semibold text-dark" to="/about">About</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link fw-semibold text-dark" to="/jobs">Find_Jobs</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link fw-semibold text-dark" to="/contact">Contact Us</Link>
            </li>

            {!localStorage.getItem('Student_Login') ? (
              <>
                <li className="nav-item mx-2">
                  <Link to="/employee_login">
                    <button className="btn btn-outline-primary fw-bold">Employee Login</button>
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link to="/login">
                    <button className="btn btn-outline-success fw-bold">Login</button>
                  </Link>
                </li>
              </>
            ) : (
              <>
              <li className="nav-item ms-2">
                <Link to='/profile' className='nav-link fw-semibold text-dark'>
                <i class="bi bi-person-fill"></i>
                </Link>
              </li>
                <li className="nav-item mx-2">
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#198754',
                    textShadow: '1px 1px 3px rgba(0, 128, 0, 0.3)',
                    padding: '4px 10px'
                  }}>
                    👋 Welcome, <span style={{
                      background: 'linear-gradient(to right, #28a745, #20c997)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: '800',
                    }}>{user}</span>
                  </div>
                </li>
                <li className="nav-item mx-2 me-4">
                  <button className="btn btn-danger fw-bold" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
