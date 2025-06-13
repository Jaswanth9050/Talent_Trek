import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Employee_Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (employeeId === '' || password === '') {
      setError('All fields are required!');
      return;
    }

    try {
      // const res = await fetch('http://localhost:3000/employee_register');
      const res = await fetch(`${import.meta.env.VITE_DB_RENDER}/employee_register`);
      const users = await res.json();
      const found = users.find(
        (user) => user.Emp_Id === employeeId && user.Password === password
      );


      if (found) {
        alert(`✅ Welcome, Employee ID: ${employeeId}`);
        navigate('/employee'); // Redirect after login
        localStorage.setItem("Emp_Id",employeeId)
        localStorage.setItem("isemployerLoggedIN","true")
      } else {
        setError('❌ Invalid Employee ID or Password');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong while logging in.');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to right, #667eea, #764ba2)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Segoe UI, sans-serif',
    },
    box: {
      background: '#fff',
      padding: '30px 25px',
      borderRadius: '10px',
      width: '100%',
      maxWidth: '400px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
    },
    label: {
      marginBottom: '6px',
      display: 'block',
      fontWeight: '500',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      marginBottom: '16px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '15px',
      boxSizing: 'border-box',
    },
    toggleBtn: {
      position: 'absolute',
      right: '10px',
      top: '8px',
      background: 'none',
      border: 'none',
      color: '#007bff',
      fontSize: '13px',
      cursor: 'pointer',
    },
    loginBtn: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#5a67d8',
      color: '#fff',
      fontSize: '16px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      marginBottom: '10px',
      textAlign: 'center',
      fontSize: '14px',
    },
    linkStyle: {
      color: '#5a67d8',
      textDecoration: 'none',
      marginLeft: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Employee Login</h2>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Employee ID</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter Employee ID"
            style={styles.input}
          />

          <label style={styles.label}>Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              style={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.toggleBtn}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.loginBtn}>Login</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Don't have an account?
          <Link to="/employee_register" style={styles.linkStyle}>
            Register here
          </Link>
        </p>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Forgot Password?
          <Link to="/employee_reset_details" style={styles.linkStyle}>
            Reset_Password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Employee_Login;
