import React from "react";
import { Link } from "react-router-dom";

const mockChats = [
  { id: 1, name: "Alice", lastMessage: "Hey, how are you?", time: "10:30 AM" },
  { id: 2, name: "Bob", lastMessage: "Let's meet tomorrow!", time: "09:45 AM" },
  { id: 3, name: "Charlie", lastMessage: "Got it, thanks!", time: "Yesterday" },
  { id: 4, name: "Diana", lastMessage: "See you soon", time: "Mon" },
];

const Chat = () => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-6">
      <h1 className="text-2xl font-bold mb-6">Chats</h1>
      <div className="w-full max-w-md divide-y divide-gray-300 border border-gray-300 rounded-2xl overflow-hidden shadow-md">
        {mockChats.map((chat) => (
          <Link to="/chat/detail">
            <div
              key={chat.id}
              className="flex justify-between items-center p-4 hover:bg-gray-100 cursor-pointer"
            >
              <div>
                <p className="font-semibold">{chat.name}</p>
                <p className="text-sm text-gray-600 truncate max-w-[200px]">
                  {chat.lastMessage}
                </p>
              </div>
              <div className="text-xs text-gray-500">{chat.time}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Chat;
