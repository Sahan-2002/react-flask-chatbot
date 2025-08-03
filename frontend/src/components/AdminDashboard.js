import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/messages")
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.error("Error fetching messages:", err);
      });
  }, []);

  return (
    <div className="admin-container">
      <h2>Admin Dashboard – Chat Logs</h2>
      <table>
        <thead>
          <tr>
            <th>User Message</th>
            <th>Bot Response</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, i) => (
            <tr key={i}>
              <td>{msg.user}</td>
              <td>{msg.bot}</td>
              <td>{new Date(msg.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
