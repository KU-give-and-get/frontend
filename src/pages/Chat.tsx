import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Member {
  _id: string;
  name: string;
}

interface LastMessage {
  _id: string;
  text: string;
  senderId: string;
  createdAt: string;
}

interface Conversation {
  _id: string;
  members: Member[];
  lastMessage?: LastMessage;
  updatedAt: string;
}

const Chat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get<Conversation[]>(
          "http://localhost:4000/api/conversations/my",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setConversations(res.data);
      } catch (err) {
        console.error("Error fetching conversations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-6">
      <h1 className="text-2xl font-bold mb-6">Chats</h1>
      <div className="w-full max-w-md divide-y divide-gray-300 border border-gray-300 rounded-2xl overflow-hidden shadow-md">
        {conversations.length === 0 ? (
          <p className="text-center p-4 text-gray-500">No conversations</p>
        ) : (
          conversations.map((conv) => (
            <Link key={conv._id} to={`/chat/${conv._id}`}>
              <div className="flex justify-between items-center p-4 hover:bg-gray-100 cursor-pointer">
                <div>
                  <p className="font-semibold">
                    {conv.members.map((m) => m.name).join(", ")}
                  </p>
                  <p className="text-sm text-gray-600 truncate max-w-[200px]">
                    {conv.lastMessage?.text || "No messages yet"}
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(conv.updatedAt).toLocaleTimeString()}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Chat;
