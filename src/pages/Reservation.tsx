import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type Reservation = {
  _id: string;
  requestedQuantity: number;
  status: "pending" | "approved" | "rejected";
  requesterId: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
};

const ReservationPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  // โหลดข้อมูล reservation
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:4000/api/reservations/product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReservations(res.data);
      } catch (err: any) {
        console.error("Fetch reservations error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [productId]);

  // เปลี่ยนสถานะ reservation
  const handleUpdateStatus = async (reservationId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:4000/api/reservations/${reservationId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setReservations((prev) =>
        prev.map((r) =>
          r._id === reservationId ? { ...r, status: res.data.status } : r
        )
      );
    } catch (err: any) {
      console.error("Update reservation error:", err.response?.data || err.message);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Reservations</h2>

      {reservations.length === 0 ? (
        <p className="text-center text-gray-500">No reservations found</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((r) => (
            <div
              key={r._id}
              className="border rounded-md p-4 shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{r.requesterId?.name || "Unknown"}</p>
                <p className="text-sm text-gray-500">{r.requesterId?.email}</p>
                <p className="text-sm">Quantity: {r.requestedQuantity}</p>
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={`px-2 py-0.5 rounded-3xl text-xs
                      ${r.status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
                      ${r.status === "approved" ? "bg-green-100 text-green-700" : ""}
                      ${r.status === "rejected" ? "bg-red-100 text-red-700" : ""}
                    `}
                  >
                    {r.status}
                  </span>
                </p>
              </div>

              {r.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(r._id, "approved")}
                    className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(r._id, "rejected")}
                    className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationPage;
