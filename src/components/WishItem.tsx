import React from "react";
import { Link } from "react-router-dom";

interface WishItemProps {
  id: number;
  name: string;
  description: string;
  quantity: number;
  status: string;
}

const WishItem: React.FC<WishItemProps> = ({ id, name, description, quantity, status }) => {
  return (
    <Link
      to={`/wishList/${id}`}
      className="border border-gray-300 rounded-xl p-4 shadow-sm flex flex-col justify-between"
    >
      <div>
        <p className="font-semibold text-lg">{name}</p>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <p className="text-sm text-gray-500 mt-1">Quantity: {quantity}</p>
        <p
          className={`text-sm mt-1 ${
            status === "available" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
      </div>
    </Link>
  );
};

export default WishItem;
