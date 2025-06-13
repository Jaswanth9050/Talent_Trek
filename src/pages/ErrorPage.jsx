import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #f857a6, #ff5858)',
    color: '#fff',
    textAlign: 'center',
    padding: '20px'
  };

  const headingStyle = {
    fontSize: '6rem',
    marginBottom: '10px',
    fontWeight: 'bold',
  };

  const subHeadingStyle = {
    fontSize: '1.8rem',
    marginBottom: '30px',
  };

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '1rem',
    backgroundColor: '#fff',
    color: '#f857a6',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>404</h1>
      <h2 style={subHeadingStyle}>Oops! Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <button style={buttonStyle} onClick={handleBackHome}>
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
