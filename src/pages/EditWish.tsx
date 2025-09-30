import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

type Wish = {
  _id: string;
  name: string;
  description: string;
  category: string;
  status: string;
  location: string;
  quantity: number;
  contact: {
    phone: string;
    instagram: string;
    facebook: string;
    others: string;
  };
  imageUrl: string; // เพิ่ม imageUrl
};

const EditWish = () => {
  const { wishId } = useParams<{ wishId: string }>();
  const navigate = useNavigate();

  const initialWish: Omit<Wish, "_id"> = {
    name: "",
    description: "",
    category: "",
    status: "available",
    location: "",
    quantity: 1,
    contact: {
      phone: "",
      instagram: "",
      facebook: "",
      others: "",
    },
    imageUrl: "", // เพิ่มค่าเริ่มต้น
  };

  const [wish, setWish] = useState(initialWish);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // โหลดข้อมูล wish เดิม
  useEffect(() => {
    const fetchWish = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/wishitems/${wishId}`);
        setWish(res.data);
        setPreviewUrl(res.data.imageUrl); // ตั้ง preview เป็นรูปเดิม
      } catch (error: any) {
        console.error("Fetch wish error:", error.response?.data || error.message);
      }
    };
    fetchWish();
  }, [wishId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("contact.")) {
      const field = name.split(".")[1];
      setWish((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [field]: value,
        },
      }));
    } else {
      setWish((prev) => ({
        ...prev,
        [name]: name === "quantity" ? Number(value) : value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const formData = new FormData();
      formData.append("name", wish.name);
      formData.append("description", wish.description || "");
      formData.append("category", wish.category || "");
      formData.append("status", wish.status);
      formData.append("location", wish.location || "");
      formData.append("quantity", String(wish.quantity));

      formData.append("contact[phone]", wish.contact.phone || "");
      formData.append("contact[instagram]", wish.contact.instagram || "");
      formData.append("contact[facebook]", wish.contact.facebook || "");
      formData.append("contact[others]", wish.contact.others || "");

      if (file) {
        formData.append("image", file); // ถ้ามี file ใหม่ ให้ส่งไป
      }

      const res = await axios.put(
        `http://localhost:4000/api/wishitems/${wishId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Updated wish:", res.data);
      navigate("/myWishList");
    } catch (error: any) {
      console.error("Update wish error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="border-t pt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Wish</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Wish Name</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wish.name}
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
            value={wish.description}
            onChange={handleChange}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wish.category}
            onChange={handleChange}
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            min={1}
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wish.quantity}
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wish.location}
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
            value={wish.contact.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Instagram</label>
          <input
            type="text"
            name="contact.instagram"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wish.contact.instagram}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Facebook</label>
          <input
            type="text"
            name="contact.facebook"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wish.contact.facebook}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Other Contact Info</label>
          <input
            type="text"
            name="contact.others"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wish.contact.others}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={wish.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md mt-2"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-black hover:opacity-80 text-white px-6 py-2 rounded-md transition"
          >
            Update Wish
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWish;
