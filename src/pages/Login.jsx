import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { Button, Input, Space } from 'antd';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch student data from db.json
  const fetchData = async () => {
    // const res = await fetch("http://localhost:3000/student_register");
    const res = await fetch(`${import.meta.env.VITE_DB_RENDER}/student_register`);
    const resdata = await res.json();
    setData(resdata);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = data.find(
      (student) => student.email === form.email && student.password === form.password
    );

    if (user) {
      localStorage.setItem('Student_Login', 'true');
      localStorage.setItem('user', user.name);
      localStorage.setItem('user_email', user.email);
      localStorage.setItem('user_id', user.id);
      navigate('/');
    } else {
      alert('Invalid email or password');
    }
  };

  const isLogin = localStorage.getItem('Student_Login') === 'true';
  if (isLogin) {
    return <Navigate to='/jobs' replace />;
  }

  // Styles
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
  };

  const cardStyle = {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '380px',
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: '600',
    background: 'linear-gradient(to left, #ff7e5f, #feb47b)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: '500',
    fontSize: '1rem',
    color: '#333',
    marginBottom: '8px',
    marginTop: '16px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '8px',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#2575fc',
    border: 'none',
    color: 'white',
    padding: '12px',
    fontSize: '1rem',
    fontWeight: '500',
    borderRadius: '8px',
    marginTop: '16px',
    cursor: 'pointer',
  };

  const footerStyle = {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '1rem',
    color: '#666',
  };

  const linkStyle = {
    color: '#2575fc',
    fontWeight: '500',
    textDecoration: 'none',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Student Login</h2>
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <label style={labelStyle}>Password</label>
          <Input.Password
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <button type="submit" style={buttonStyle}>Login</button>
        </form>

        <div style={footerStyle}>
          Don't have an account?{' '}
          <Link to="/signup" style={linkStyle}>Register here</Link>
        </div>
        <div style={footerStyle}>
          Forgot your password?{' '}
          <Link to="/reset_password" style={linkStyle}>Reset it here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
