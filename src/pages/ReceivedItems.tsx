import { useEffect, useState } from "react";
import axios from "axios";

const ReceivedItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceivedItems = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("กรุณาเข้าสู่ระบบก่อน");
          return;
        }

        const res = await axios.get("http://localhost:4000/api/received/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setItems(res.data);
      } catch (err) {
        console.error("Error fetching received items:", err);
        alert("ไม่สามารถโหลดข้อมูลได้");
      } finally {
        setLoading(false);
      }
    };

    fetchReceivedItems();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        ของที่คุณได้รับแล้ว
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">ยังไม่มีรายการที่ได้รับ</p>
      ) : (
        <div className="space-y-4">
          {items.map((item: any) => (
            <div
              key={item._id}
              className="border rounded-md shadow-sm p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-700">
                  {item.productId?.name || "Unknown Product"}
                </p>
                <p className="text-sm text-gray-600">
                  จำนวน: {item.quantity}
                </p>
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
  );
};

export default ReceivedItems;
