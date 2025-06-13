import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompanySelector from '../components/CompanyList';
// import CompanySelector from './CompanySelector'; // import the selector


const Employee_Register_Form = () => {
  const [formdata, setFormdata] = useState({
    First_Name: '',
    Last_Name: '',
    company: '',
    Email: '',
    Password: '',
    confirm_password: '',
    Phone: '',
    Job_role: '',
  });

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_DB_RENDER}/employee_register`);
      const udata = await res.json();
      setData(udata);
    } catch (error) {
      console.error('Error fetching userData', error);
    }
  };

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const generateEmpId = (name) => {
    const prefix = name.substring(0, 3).toLowerCase();
    const specialChars = ['@', '#', '$', '%', '_'];
    const special = specialChars[Math.floor(Math.random() * specialChars.length)];
    const random = Math.floor(100 + Math.random() * 900);
    return prefix + special + random;
  };

  

  const handlePostdata = async (e) => {
    e.preventDefault();

    const { First_Name, Email, Password, confirm_password, Phone } = formdata;

    if (!First_Name || !Email || !Password) {
      alert('Please fill out "First Name", "Email", and "Password" fields.');
      return;
    }

    if (Password !== confirm_password) {
      alert('Password and Confirm Password do not match!');
      return;
    }

    if (!/^\d{10}$/.test(Phone)) {
      alert("Phone number must be 10 digits.");
      return;
    }

    const emailExists = data.some((user) => user.Email === Email);
    if (emailExists) {
      alert('Email already registered.');
      return;
    }
    
    localStorage.setItem("company_name", formdata.company);
    const empId = generateEmpId(First_Name);

    const register = {
      Emp_Id: empId,
      ...formdata,
    };

    try {
      // const response = await fetch('http://localhost:3000/register', {
      const response = await fetch(`${import.meta.env.VITE_DB_RENDER}/employee_register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(register),
      });

      const result = await response.json();
      setData((prev) => [...prev, result]);
      
      alert(`🎉 Registered Successfully.\nYour Employee ID: ${empId}`);

      setFormdata({
        First_Name: '',
        Last_Name: '',
        company: '',
        Email: '',
        Password: '',
        confirm_password: '',
        Phone: '',
        Job_role: '',
      });

      navigate('/employee_login');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  // Inline styles remain unchanged...
  const formStyle = { minHeight: '100vh', background: 'linear-gradient(to right, #667eea, #764ba2)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px', fontFamily: 'Segoe UI, sans-serif' };
  const cardStyle = { background: '#fff', padding: '30px 25px', borderRadius: '12px', width: '100%', maxWidth: '700px', boxShadow: '0 0 15px rgba(0,0,0,0.15)' };
  const inputStyle = { width: '100%', padding: '10px', marginTop: '6px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '15px' };
  const labelStyle = { fontWeight: '500', marginBottom: '4px', display: 'block', color: '#333' };
  const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#5a67d8', color: '#fff', fontSize: '16px', borderRadius: '6px', border: 'none', cursor: 'pointer', marginTop: '10px' };
  const linkStyle = { color: '#5a67d8', textDecoration: 'none', fontWeight: '500', marginLeft: '5px' };

  return (
    <div style={formStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>Employee Registration</h2>
        <form onSubmit={handlePostdata}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>First Name</label>
              <input type="text" name="First_Name" value={formdata.First_Name} onChange={handleChangeData} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Last Name</label>
              <input type="text" name="Last_Name" value={formdata.Last_Name} onChange={handleChangeData} style={inputStyle} />
            </div>
          </div>

          {/* Company Selector */}
          <CompanySelector selectedCompany={formdata.company} setFormdata={setFormdata} />

          <label style={labelStyle}>Email</label>
          <input type="email" name="Email" value={formdata.Email} onChange={handleChangeData} style={inputStyle} />

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Password</label>
              <input type="password" name="Password" value={formdata.Password} onChange={handleChangeData} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Confirm Password</label>
              <input type="password" name="confirm_password" value={formdata.confirm_password} onChange={handleChangeData} style={inputStyle} />
            </div>
          </div>

          <label style={labelStyle}>Phone</label>
          <input type="tel" name="Phone" value={formdata.Phone} onChange={handleChangeData} style={inputStyle} />

          <label style={labelStyle}>Job Role</label>
          <select name="Job_role" value={formdata.Job_role} onChange={handleChangeData} style={inputStyle}>
            <option value="">Select a role</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
            <option>UI/UX Designer</option>
          </select>

          <button type="submit" style={buttonStyle}>Register</button>

          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            Already have an account?
            <Link to="/employee_login" style={linkStyle}>Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Employee_Register_Form;
