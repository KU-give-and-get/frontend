import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type {Wish} from '../type/Wish'

type Props = {
  wish: Wish;
  onDelete: (id: string) => void;
};

const MyWish: React.FC<Props> = ({ wish, onDelete }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>(wish.status);

  const handleDeleteWish = async (wishId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await axios.delete(
        `http://localhost:4000/api/wishitems/${wishId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data.message);
      onDelete(wishId);
    } catch (error: any) {
      console.error(
        "Delete wish error:",
        error.response?.data || error.message
      );
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await axios.patch(
        `http://localhost:4000/api/wishitems/${wish._id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setStatus(res.data.status);
    } catch (error: any) {
      console.error(
        "Update wish status error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="grid grid-cols-[1fr_120px_120px_100px] gap-4 items-center border-b px-4 py-3 text-sm border-gray-200 mx-4">
      {/* Wish name */}
      <p className="truncate">{wish.name}</p>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        className={`font-medium text-sm rounded border px-2 py-1 
          ${
            status === "available"
              ? "text-green-600 border-green-400"
              : status === "reserved"
              ? "text-yellow-600 border-yellow-400"
              : "text-gray-500 border-gray-400"
          }
        `}
      >
        <option value="available" className="text-green-600 border-green-400">
          available
        </option>
        <option value="reserved" className="text-yellow-600 border-yellow-400">
          reserved
        </option>
        <option value="completed" className="text-gray-500 border-gray-400">
          completed
        </option>
      </select>

      {/* Quantity */}
      <p className="text-center">{wish.quantity}</p>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
          onClick={() => navigate(`/editWish/${wish._id}`)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
          onClick={() => handleDeleteWish(wish._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MyWish;
