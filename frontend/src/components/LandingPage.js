import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/chat");
  };

   const handleAdmin = () => {
    navigate("/admin");
  };
  return (
    <div className="landing-container">
      <div className="overlay">
        <h1>Welcome to AI Assistant 🤖</h1>
        <p>Your smart, personal chatbot</p>
        <button onClick={handleStart}>Start Chat</button>
        <button onClick={handleAdmin} style={{ marginLeft: "10px" }}>Admin Dashboard</button>
      </div>
    </div>
  );
}

export default LandingPage;
