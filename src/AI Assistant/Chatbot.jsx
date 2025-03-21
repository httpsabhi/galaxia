import React, { useState } from "react";
import axios from "axios";
import { spaceKeywords } from "./spaceKeywords.js";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const[visible, setVisible] = useState("Ask anything related to space ")

  async function generateResponse() {
    if (!query) return;

    // Ensure the query is related to space or galaxy
    const isSpaceRelated = spaceKeywords.some((keyword) =>
      query.toLowerCase().includes(keyword)
    );

    if (!isSpaceRelated) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ I can only answer questions related to space and galaxies.", sender: "bot" },
      ]);
      return;
    }

    setLoading(true);
    setMessages((prev) => [...prev, { text: query, sender: "user" }]);
    setQuery("");

    try {
      const res = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA3IwJ5B1e3evOO9i_2rzCE2JA3jNSJYM4",
        method: "POST",
        data: {
          contents: [{ parts: [{ text: query }] }],
        },
      });

      const botReply =
        res.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I couldn't find an answer.";
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Error: Unable to fetch response.", sender: "bot" },
      ]);
    }

    setLoading(false);
  }

  const removeText = () => {
    setVisible("")
  }



  return (
    <div className="fixed font-mono bottom-6 right-6 z-50">
      {/* Chat Icon with Tooltip */}
      {!isOpen && (
        <div className="relative group">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-2xl text-white p-5 rounded-full shadow-lg transition-transform transform hover:scale-110"
          >
            🧑‍🚀
          </button>
          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Spacebot
          </div>
        </div>
      )}
      

      {/* Chat Pop-Up */}
      {isOpen && (
        <div className="w-96 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          {/* Chat Header */}
          <div className="flex justify-between items-center p-4 bg-gray-900 rounded-t-lg">
            <h2 className="text-lg font-bold text-blue-400">🧑‍🚀 AI Space Assistant</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white p-3 rounded-lg">Thinking...</div>
              </div>
            )}
          </div>
          <div  className="bg-white">
            <h1 className="font-semibold text-center">
                  {visible}
            </h1> 
          </div>
          {/* Chat Input */}
          <div className="p-4 bg-gray-900 rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && generateResponse()}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                placeholder="Ask me about space..."
              />
              <button
                 onClick={()=>{
                    generateResponse();
                    removeText()
                 } 
                  }
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;