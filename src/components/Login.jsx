import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Import GoogleOAuthProvider and GoogleLogin
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/v1/users/login?email=${email}&password=${password}`, {
        method: 'POST',
      });

      if (response.ok) {
        alert('Login successful!');
        navigate('/home');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleGoogleSuccess = (response) => {
    console.log('Google Login Successful:', response);
    alert('Google Login successful! Check the console for details.');
    navigate('/home');
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Login Failed:', error);
    alert('Google Login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId="632011932792-e4u1025bjbvtq5iqb70ptg5ahal9kbun.apps.googleusercontent.com"> {/* Wrap the component with GoogleOAuthProvider */}
      <div className="form-container">
        <header>
          <img src="/finbuddy-logo.png" alt="FinBuddy Logo" className="logo" />
        </header>
        <div className="form-box">
          <h2>Login</h2>
          <p className="subtitle">Hi, Welcome back 👋</p>

          {/* Google Login Button */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            render={(renderProps) => (
              <button
                className="google-btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Login with Google
              </button>
            )}
          />

          <p className="or">or Login with Email</p>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E.g. johndoe@email.com"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <div className="remember-forgot">
              <label>
                <input type="checkbox" name="remember" /> Remember Me
              </label>
              <a href="/forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
          <p className="footer-text">Not registered yet? <a href="/register">Create an account</a></p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
