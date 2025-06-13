import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

const Employee_Reset_Details = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // Step 1: Email input, 2: Code input, 3: New password
  const [codeInput, setCodeInput] = useState('');
  const [randomCode, setRandomCode] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpExpiry, setOtpExpiry] = useState(null);
  const [empid, setEmpid] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_DB_RENDER}/employee_register`);
      const data = await res.json();

      const user = data.find((emp) => emp.Email === email);

      if (user) {

        // ✅ Save empid to state
        setEmpid(user.Emp_Id);

        // Generate 4-digit random OTP
        const generatedCode = Math.floor(1000 + Math.random() * 9000);
        setRandomCode(generatedCode);
        console.log("Verification Code:", generatedCode);
        

        // Set expiry time (15 minutes)
        const now = new Date();
        now.setMinutes(now.getMinutes() + 15);
        setOtpExpiry(now.getTime());

        const time = now.toLocaleTimeString();

        // Move to step 2
        setStep(2);

        // Email params
        const templateParams = {
          email: email,
          passcode: generatedCode,
          time: time,
        };

        // Send email
        emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_OTP_ID,
          templateParams,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).then(() => {
          console.log("OTP sent to email.");
        }).catch((err) => {
          console.error("Error sending OTP:", err);
          alert("Failed to send OTP.");
        });
      } else {
        alert("Email not found!");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Error verifying email.");
    }
  };

  const handleCodeVerify = (e) => {
    e.preventDefault();

    const currentTime = new Date().getTime();

    if (!randomCode || !otpExpiry) {
      alert("OTP code missing. Please request again.");
      setStep(1);
      return;
    }

    if (currentTime > otpExpiry) {
      alert("⏰ OTP expired. Please try again.");
      setStep(1);
      setCodeInput('');
      setRandomCode(null);
      return;
    }

    if (parseInt(codeInput) === randomCode) {
      setStep(3);
    } else {
      alert("Incorrect verification code.");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_DB_RENDER}/employee_register`);
      const users = await res.json();

      const user = users.find((emp) => emp.Email === email);

      if (user && user.id !== undefined) {
        const updatedUser = { ...user, Password: newPassword,confirm_password:confirmPassword };

        await fetch(`${import.meta.env.VITE_DB_RENDER}/employee_register/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });

        alert("Password reset successful!");
        navigate('/employee_login');
      } else {
        alert("User not found or invalid user ID.");
      }
    } catch (error) {
      console.error("Reset error:", error);
      alert("Failed to reset password.");
    }
  };

  // Styling (unchanged)
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background:  'linear-gradient(to right, #667eea, #764ba2)',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '20px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#5a67d8',
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <form style={cardStyle} onSubmit={
        step === 1 ? handleEmailSubmit
        : step === 2 ? handleCodeVerify
        : handlePasswordReset
      }>
        <h2>Reset Password</h2>

        {step === 1 && (
          <>
            <p>Enter your email to get a verification code.</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="Enter your email"
              required
            />
          </>
        )}

        {step === 2 && (
          <>
            <p className='my-2'>Your EMP_ID : {empid}</p>
            <p>Enter the 4-digit code sent to your email.</p>
            <input
              type="number"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              style={inputStyle}
              placeholder="Enter code"
              required
            />
          </>
        )}

        {step === 3 && (
          <>
            <p>Set your new password.</p>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={inputStyle}
              placeholder="New password"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
              placeholder="Confirm password"
              required
            />
          </>
        )}

        <button type="submit" style={buttonStyle}>
          {step === 1 ? "Send Code" : step === 2 ? "Verify Code" : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default Employee_Reset_Details;
