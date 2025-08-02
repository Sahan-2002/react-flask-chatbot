import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { FaRobot, FaUser } from "react-icons/fa";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true); // Show typing

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: input,
      });

      const botMsg = { sender: "bot", text: response.data.response };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong." },
      ]);
    } finally {
      setIsTyping(false); // Hide typing
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-container">
      <h2>Talk to Your Assistant 🤖</h2>
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.sender === "bot" ? (
              <>
                <FaRobot
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                />
                {msg.text}
              </>
            ) : (
              <>
                {msg.text}
                <FaUser
                  style={{ marginLeft: "8px", verticalAlign: "middle" }}
                />
              </>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="message bot typing">
            <span className="dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </div>
        )}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          placeholder="Type your message here..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
