import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { Wish } from "../type/Wish";

const formatDateTime = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString("th-TH", options);
};

const WishDetail = () => {
  const { wishId } = useParams<{ wishId: string }>();
  const [productData, setProductData] = useState<Wish | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/wishitems/${wishId}`
        );
        setProductData(res.data);
      } catch (err) {
        console.error("Error fetching wish detail:", err);
      } finally {
        setLoading(false);
      }
    };

    if (wishId) {
      fetchWishDetail();
    }
  }, [wishId]);

  const handleReserve = async () => {
    if (!wishId) return;
    try {
      await axios.post(`http://localhost:8080/api/wishlist/${wishId}/reserve`);
      alert("You reserved this item!");
    } catch (err) {
      console.error("Error reserving item:", err);
      alert("Failed to reserve item.");
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (!productData) {
    return <div className="text-center p-10">Wish not found</div>;
  }

  const disabled = productData.status !== "available";
  const status = productData.status;
  const buttonText = status === "available" ? "Donate" : "Not Available";

  return (
    <div className="border-t-2 pt-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* header */}
        <div className="mb-6">
          <h1 className="font-bold text-3xl text-gray-900">{productData.name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {formatDateTime(productData.createdAt)}
          </p>
        </div>

        {/* image */}
        {productData.imageUrl && (
          <div className="mb-6">
            <img
              src={productData.imageUrl}
              alt={productData.name}
              className="w-full h-72 object-cover rounded-lg shadow"
            />
          </div>
        )}

        {/* details */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
          <p className="text-gray-700 leading-relaxed">{productData.description}</p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-gray-600">
              <span className="font-medium text-gray-800">Quantity:</span>{" "}
              {productData.quantity}
            </p>
            <div className="flex items-center gap-2 text-gray-700">
              <img
                src="/images/location_logo.png"
                alt=""
                className="w-[16px] h-5"
              />
              <span>{productData.location}</span>
            </div>
          </div>

          {/* reserve button */}
          <div className="pt-2">
            <button
              onClick={handleReserve}
              disabled={disabled}
              className={`px-8 py-2 text-sm font-medium rounded-lg transition
                ${
                  status === "available"
                    ? "bg-black text-white hover:bg-gray-800 active:bg-gray-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
            >
              {buttonText}
            </button>
          </div>
        </div>

        {/* contact info */}
        <div className="mt-10">
          <h2 className="font-semibold text-xl mb-4">Contact</h2>
          <div className="bg-gray-50 rounded-lg shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/images/telephone_logo.png" alt="" className="w-[20px]" />
              <p className="text-gray-700">
                <span className="font-medium">Tel:</span>{" "}
                {productData.contact?.phone}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/instagram_logo.png" alt="" className="w-[20px]" />
              <p className="text-gray-700">
                <span className="font-medium">Instagram:</span>{" "}
                {productData.contact?.instagram}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/facebook_logo.png" alt="" className="w-[20px]" />
              <p className="text-gray-700">
                <span className="font-medium">Facebook:</span>{" "}
                {productData.contact?.facebook}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-800 font-medium mb-1">Other:</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {productData.contact?.others}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishDetail;
