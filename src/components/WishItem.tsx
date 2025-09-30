import React from "react";
import { Link } from "react-router-dom";

interface WishItemProps {
  id: string;
  name: string;
  description: string;
  quantity: number;
  status: string;
  imageUrl: string;
}

const WishItem: React.FC<WishItemProps> = ({ id, name, description, quantity, status, imageUrl }) => {
  return (
    <Link
      to={`/wishList/${id}`}
      className="border p-4 shadow border-gray-300 hover:shadow-md transition rounded"
    >
      {/* ✅ รูปภาพ */}
      <img
        src={imageUrl || "/images/placeholder.png"}
        alt={name}
        className="w-full h-40 object-cover mb-2 rounded"
      />

      {/* ✅ ชื่อ */}
      <h2 className="font-bold text-lg truncate">{name}</h2>

      {/* ✅ Quantity */}
      <p className="text-sm text-gray-600 mt-1">Quantity: {quantity}</p>

      {/* ✅ Status badge */}
      <p className="text-xs text-gray-500 mt-2">
        Status:{" "}
        <span
          className={`px-2 py-0.5 rounded-3xl
            ${status === "available" ? "bg-green-100 text-green-700" : ""}
            ${status === "reserved" ? "bg-yellow-100 text-yellow-700" : ""}
            ${status === "completed" ? "bg-gray-200 text-gray-600" : ""}
          `}
        >
          {status}
        </span>
      </p>
    </Link>
  );
};

export default WishItem;
