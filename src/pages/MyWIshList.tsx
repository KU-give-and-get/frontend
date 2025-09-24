import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MyWish from "../components/MyWish";

type Wish = {
  _id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  quantity: number;
};

const MyWishList = () => {
  const [myWishes, setMyWishes] = useState<Wish[]>([]);

  const handleDelete = (id: string) => {
    setMyWishes((prev) => prev.filter((wish) => wish._id !== id));
  };

  const getWishesByUserId = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await axios.get<Wish[]>(
        "http://localhost:4000/api/wishitems/my-wishitems",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMyWishes(res.data);
    } catch (error) {
      console.error("Error fetching wishes:", error);
    }
  };

  useEffect(() => {
    getWishesByUserId();
  }, []);

  return (
    <div className="border-t pt-10">
      <div className="border-3 rounded border-gray-200 pb-10">
        {/* Header */}
        <div className="grid grid-cols-[1fr_150px_150px] gap-4 bg-gray-100 px-8 py-2 text-sm font-semibold">
          <p>Wish Name</p>
          <p>Status</p>
          <p>Actions</p>
        </div>

        {/* Items */}
        {myWishes.length > 0 ? (
          myWishes.map((wish) => (
            <MyWish key={wish._id} wish={wish} onDelete={handleDelete} />
          ))
        ) : (
          <p className="px-8 py-4 text-sm text-gray-500">
            You don’t have any wishes yet.
          </p>
        )}

        {/* button */}
        <Link to="/createWishItem" className="flex justify-end px-4 py-4">
          <button className="bg-black text-white px-8 py-2 text-sm rounded hover:opacity-80">
            + ADD WISH
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyWishList;
