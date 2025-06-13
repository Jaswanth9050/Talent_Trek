import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // Step 1: Email input, 2: Code input, 3: New password
  const [codeInput, setCodeInput] = useState('');
  const [randomCode, setRandomCode] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpExpiry, setOtpExpiry] = useState(null);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
  e.preventDefault();

  // const res = await fetch("http://localhost:3000/student_register");
  const res = await fetch(`${import.meta.env.VITE_DB_RENDER}/student_register`);
  const data = await res.json();

  const user = data.find((student) => student.email === email);

  if (user) {
    // Generate 4-digit random OTP
    const generatedCode = Math.floor(1000 + Math.random() * 9000);
    setRandomCode(generatedCode);
    console.log("Verification Code:", generatedCode);

    // ✅ Generate expiration time +15 mins
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15); //only minutes
    const expiryTime = now.getTime(); // time in ms time with milleseconds
    setOtpExpiry(expiryTime);

    const time = now.toLocaleTimeString(); // for email display

    // Set to step 2 to show OTP input field
    setStep(2);

    // Prepare email params

    const templateParams = {
      email: email,
      passcode: generatedCode,
      time: time,
    };

    // Send OTP via EmailJS

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_OTP_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      console.log("OTP sent to email.");
    }).catch((err) => {
      console.error("Error sending OTP email:", err);
    });

  } else {
    alert("Email not found!");
  }
};


  const handleCodeVerify = (e) => {
    e.preventDefault();
    const currentTime = new Date().getTime();
    if (currentTime > otpExpiry) {
        alert("⏰ OTP expired. Please try again.");
        setStep(1); // Reset back to email input step
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

    // Update password in db.json
    // const res = await fetch("http://localhost:3000/student_register");
    const res = await fetch(`${import.meta.env.VITE_DB_RENDER}/student_register`);
    const users = await res.json();

    const user = users.find((student) => student.email === email);

    if (user) {
      const updatedUser = { ...user, password: newPassword };

      // await fetch(`http://localhost:3000/student_register/${user.id}`, {
      await fetch(`${import.meta.env.VITE_DB_RENDER}/student_register/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      alert("Password reset successful!");
      navigate('/login');
    }
  };

  // Styling (same as before)
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #ff6a00, #ee0979)',
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
    backgroundColor: '#ee0979',
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
            <p>Enter the 4-digit code sent to your console.</p>
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

export default ResetPassword;
