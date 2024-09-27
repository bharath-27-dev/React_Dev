import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles.css';

const Verification = () => {
  const [code, setCode] = useState("");
  const history = useNavigate();

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    // Call verification API
    const response = await fetch(`http://localhost:8080/api/v1/users/verify?code=${code}`, {
      method: "POST",
    });

    if (response.ok) {
      alert("Verification successful!");
      history.push("/login");
    } else {
      alert("Verification failed.");
    }
  };

  return (
    <div className="verification-container">
      <img src="/workspaces/codespaces-react/finbuddy/public/logo.png" alt="FinBuddy Logo" />
      <h2>Enter Verification Code</h2>
      <form onSubmit={handleVerifyCode}>
        <input
          type="text"
          id="verification-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter the code"
          required
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default Verification;
