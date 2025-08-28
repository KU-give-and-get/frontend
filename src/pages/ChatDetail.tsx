import React from "react";
import { useParams } from "react-router-dom";

const mockMessages = [
  { id: 1, sender: "Alice", text: "Hey, how are you?", time: "10:30 AM", isMe: false },
  { id: 2, sender: "Me", text: "I'm good! How about you?", time: "10:32 AM", isMe: true },
  { id: 3, sender: "Alice", text: "Doing great, thanks for asking!", time: "10:33 AM", isMe: false },
  { id: 4, sender: "Me", text: "Awesome, let's catch up soon.", time: "10:35 AM", isMe: true },
];

const ChatDetail = () => {
  const { chatId } = useParams();

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-300 font-bold text-lg">
        Chat with User {chatId}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs shadow-sm text-sm ${
                msg.isMe
                  ? "bg-black text-white rounded-br-none"
                  : "bg-gray-200 text-black rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs text-gray-400 mt-1 text-right">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="p-4 border-t border-gray-300 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-400 rounded-full px-4 py-2 text-sm focus:outline-none"
        />
        <button className="bg-black text-white px-4 py-2 rounded-full text-sm">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDetail;
