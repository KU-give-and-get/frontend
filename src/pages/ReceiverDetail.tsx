import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type {User} from '../type/User'
import type { ReceivedItem } from "../type/ReceivedItem";

const ReceiverDetail = () => {
  const { receiverId } = useParams<{ receiverId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<ReceivedItem[]>([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);

  // โหลดข้อมูลผู้รับ
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          `http://localhost:4000/api/received/receiver/${receiverId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [receiverId]);

  // โหลดรายการของที่ได้รับ
  useEffect(() => {
    const fetchReceivedItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          `http://localhost:4000/api/received/receiver/product/${receiverId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching received items:", err);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchReceivedItems();
  }, [receiverId]);

  if (loadingUser || loadingItems) return <p className="text-center py-10">Loading...</p>;
  if (!user) return <p className="text-center text-red-500 py-10">ไม่พบผู้ใช้</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* ข้อมูลผู้รับ */}
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.profileImageUrl || "/images/default_profile_picture.png"}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div className="flex-1 space-y-2">
          <p><span className="font-medium">ชื่อ-นามสกุล:</span> {user.name}</p>
          <p><span className="font-medium">อีเมล:</span> {user.email}</p>
          <p><span className="font-medium">ยืนยันอีเมล:</span> {user.isVerified ? "ยืนยันแล้ว" : "ยังไม่ยืนยัน"}</p>
          <p><span className="font-medium">คณะ:</span> {user.faculty || "-"}</p>
          <p><span className="font-medium">สาขา:</span> {user.major || "-"}</p>
          <p><span className="font-medium">กู้ กยศ:</span> {user.isLoan ? "ใช่" : "ไม่"}</p>
        </div>
      </div>

      {/* รายการของที่ได้รับ */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">ของที่ได้รับ</h2>
        {items.length === 0 ? (
          <p className="text-center text-gray-500">ยังไม่มีรายการที่ได้รับ</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="border rounded-md shadow-sm p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-700">{item.productId?.name || "Unknown Product"}</p>
                  <p className="text-sm text-gray-600">จำนวน: {item.quantity}</p>
                  <p className="text-sm text-gray-500">
                    วันที่รับ:{" "}
                    {new Date(item.receivedAt).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {item.productId?.imageUrl && (
                  <img
                    src={item.productId.imageUrl}
                    alt={item.productId.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiverDetail;
