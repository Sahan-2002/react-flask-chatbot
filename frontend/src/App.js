import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { FaRobot, FaUser } from "react-icons/fa";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);

    const response = await axios.post("http://localhost:5000/chat", {
      message: input,
    });

    const botMsg = { sender: "bot", text: response.data.response };
    setMessages((prev) => [...prev, botMsg]);
    setInput("");
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
                <FaRobot style={{ marginRight: "8px", verticalAlign: "middle" }} />
                {msg.text}
              </>
            ) : (
              <>
                {msg.text}
                <FaUser style={{ marginLeft: "8px", verticalAlign: "middle" }} />
              </>
            )}
          </div>
        ))}
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
