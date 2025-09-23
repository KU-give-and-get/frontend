import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

interface Message {
  _id: string;
  senderId: string;
  text: string;
  createdAt: string;
  attachments?: any[];
}

interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

const ChatDetail = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const token = localStorage.getItem("token");
  let userId = "";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    userId = decoded.id;
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/messages/${chatId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    if (chatId) fetchMessages();
  }, [chatId, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:4000/api/messages",
        { conversationId: chatId, text: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [...prev, res.data]);
      setInput("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white text-black">
      {/* Header */}
      <div className="p-4 border-b border-gray-300 font-bold text-lg flex-shrink-0">
        Chat
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg) => {
          const isMe = msg.senderId === userId;
          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-xs shadow-sm text-sm break-words ${
                  isMe
                    ? "bg-black text-white rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <div className="p-2 border-t border-gray-300 flex items-center gap-2 flex-shrink-0">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-400 rounded-full px-4 py-2 text-sm focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-black text-white px-4 py-2 rounded-full text-sm"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDetail;
