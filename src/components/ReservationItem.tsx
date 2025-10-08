import React from "react";
import { useNavigate } from "react-router-dom";
import type { Reservation } from "../type/Reservation";

type Props = {
  reservation: Reservation;
  onUpdateStatus: (id: string, status: string, quantity?: number) => void;
};

const ReservationItem: React.FC<Props> = ({ reservation, onUpdateStatus }) => {
  const navigate = useNavigate();

  const handleGoToReceiver = () => {
    navigate(`/receiver/${reservation.requesterId._id}`);
  };

  return (
    <div className="border rounded-md p-4 shadow-sm flex justify-between items-center bg-white">
      
      {/* ส่วนคลิกไปหน้า receiver */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={handleGoToReceiver}
      >
        <img
          src={reservation.requesterId?.profileImageUrl || "/images/avatar-placeholder.png"}
          alt={reservation.requesterId?.name || "Avatar"}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{reservation.requesterId?.name || "Unknown"}</p>
          <p className="text-sm text-gray-500">{reservation.requesterId?.email}</p>
          <p className="text-sm text-gray-500">
            {new Date(reservation.createdAt).toLocaleString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-sm">Quantity: {reservation.requestedQuantity}</p>
          <p className="text-sm">
            Status:{" "}
            <span
              className={`px-2 py-0.5 rounded-3xl text-xs
                ${reservation.status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
                ${reservation.status === "approved" ? "bg-green-100 text-green-700" : ""}
                ${reservation.status === "rejected" ? "bg-red-100 text-red-700" : ""}
              `}
            >
              {reservation.status}
            </span>
          </p>
        </div>
      </div>

      {/* ส่วนปุ่ม Approve/Reject */}
      {reservation.status === "pending" && (
        <div className="flex gap-2">
          <button
            onClick={() =>
              onUpdateStatus(reservation._id, "approved", reservation.requestedQuantity)
            }
            className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
          >
            Approve
          </button>
          <button
            onClick={() => onUpdateStatus(reservation._id, "rejected")}
            className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationItem;
