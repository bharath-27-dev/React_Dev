import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/forgotpassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/v1/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('A verification link has been sent to your email.');
        navigate('/verification');
      } else {
        alert('Failed to send verification email.');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };

  return (
    <div className="form-container">
      <header>
        <img src="/finbuddy-logo.png" alt="FinBuddy Logo" className="logo" />
      </header>
      <div className="form-box">
        <h2>Forgot Password</h2>
        <p className="subtitle">We will send you a password reset link.</p>
        <form onSubmit={handleForgotPassword}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E.g. johndoe@email.com" required />
          <button type="submit" className="login-btn">Send Link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
