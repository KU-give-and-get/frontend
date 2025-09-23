import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateWishItem = () => {
  const initialWishItem = {
    name: "",
    description: "",
    category: "",
    status: "pending",
    location: "",
    contact: {
      phone: "",
      instagram: "",
      facebook: "",
      others: ""
    },
    quantity: 1
  };

  const navigate = useNavigate();
  const [wishItem, setWishItem] = useState(initialWishItem);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("contact.")) {
      const field = name.split(".")[1];
      setWishItem((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [field]: value
        }
      }));
    } else {
      setWishItem((prev) => ({
        ...prev,
        [name]: name === "quantity" ? Number(value) : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await axios.post(
        "http://localhost:4000/api/wishitems",
        wishItem,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Created wish item:", res.data);

      setWishItem(initialWishItem);
      navigate("/myWishList");
    } catch (error: any) {
      console.error("Create wish item error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="border-t pt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create Wish Item</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Wish Item Name</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wishItem.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            className="w-full border border-gray-300 p-2 rounded-md"
            rows={4}
            value={wishItem.description}
            onChange={handleChange}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wishItem.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            <option value="Clothing">Clothing</option>
            <option value="Study Materials">Study Materials</option>
            <option value="Activity Equipment">Activity Equipment</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            min={1}
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wishItem.quantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wishItem.location}
            onChange={handleChange}
          />
        </div>

        {/* Contact Fields */}
        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="text"
            name="contact.phone"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wishItem.contact?.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Instagram</label>
          <input
            type="text"
            name="contact.instagram"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wishItem.contact?.instagram}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Facebook</label>
          <input
            type="text"
            name="contact.facebook"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wishItem.contact?.facebook}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Other Contact Info</label>
          <input
            type="text"
            name="contact.others"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wishItem.contact?.others}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wishItem.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-black hover:opacity-80 text-white px-6 py-2 rounded-md transition"
          >
            Create Wish Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWishItem;
