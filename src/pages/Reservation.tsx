import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReservationItem from "../components/ReservationItem";
import type { Reservation } from "../type/Reservation";


const ReservationPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

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

        // สมมติ API ส่ง requesterId.avatar มาแล้ว
        setReservations(res.data);
      } catch (err: any) {
        console.error("Fetch reservations error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [productId]);

  const handleUpdateStatus = async (reservationId: string, newStatus: string, quantity?: number) => {
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

      if (newStatus === "approved" && quantity) {
        await handleCreateReceivedItem(reservationId, quantity);
      }

      setReservations((prev) =>
        prev.map((r) =>
          r._id === reservationId ? { ...r, status: res.data.status } : r
        )
      );
    } catch (err: any) {
      console.error("Update reservation error:", err.response?.data || err.message);
    }
  };

  const handleCreateReceivedItem = async (reservationId: string, quantity: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:4000/api/received",
        {
          reservationId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Received item created:", res.data);
    } catch (err: any) {
      console.error("Create received item error:", err.response?.data || err.message);
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
            <ReservationItem
              key={r._id}
              reservation={r}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationPage;
