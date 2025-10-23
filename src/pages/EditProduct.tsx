import { useState, useEffect } from "react";
import type { Product } from "../type/Product";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const initialProduct: Omit<Product, "_id" | "createdAt" | "donorId"> = {
    name: "",
    description: "",
    category: "",
    imageUrl: [],
    status: "available",
    location: "",
    contact: {
      phone: "",
      instagram: "",
      facebook: "",
      others: ""
    },
    quantity:1
  };

  const [product, setProduct] = useState(initialProduct);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // โหลดข้อมูล product เดิม
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/products/${productId}`);
        setProduct(res.data);
        if (res.data.imageUrl) {
          setPreviewUrls(res.data.imageUrl); // แสดงรูปเดิม
        }
      } catch (error: any) {
        console.error("Fetch product error:", error.response?.data || error.message);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;

      if (name.startsWith("contact.")) {
        const field = name.split(".")[1];
        setProduct((prev) => ({
          ...prev,
          contact: {
            ...prev.contact,
            [field]: value
          }
        }));
      } else {
        setProduct((prev) => ({
          ...prev,
          [name]: name === "quantity" ? Number(value) : value // 👈 แปลงเป็น number ถ้าเป็น quantity
        }));
      }
    };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    setFiles((prev) => [...prev, ...fileArray]);

    const urls = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
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
      formData.append("name", product.name);
      formData.append("description", product.description || "");
      formData.append("category", product.category || "");
      formData.append("status", product.status);
      formData.append("location", product.location || "");
      formData.append("quantity", String(product.quantity));

      formData.append("contact[phone]", product.contact?.phone || "");
      formData.append("contact[instagram]", product.contact?.instagram || "");
      formData.append("contact[facebook]", product.contact?.facebook || "");
      formData.append("contact[others]", product.contact?.others || "");

      if (files.length > 0) {
        files.forEach((file) => {
          formData.append("images", file);
        });
      }

      const res = await axios.put(
        `http://localhost:4000/api/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("✅ Item edit successfully!");

      setTimeout(() => navigate("/myList"), 1500);
    } catch (error: any) {
      toast.error("❌ Failed to edit item. Please try again.");
      console.error("Update product error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="border-t pt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={product.name}
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
            value={product.description}
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
            value={product.category}
            onChange={handleChange}
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={product.quantity}
            onChange={handleChange}
            min={1}
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
            value={product.location}
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
            value={product.contact?.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Instagram</label>
          <input
            type="text"
            name="contact.instagram"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={product.contact?.instagram}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Facebook</label>
          <input
            type="text"
            name="contact.facebook"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={product.contact?.facebook}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Other Contact Info</label>
          <input
            type="text"
            name="contact.others"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={product.contact?.others}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={product.status}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
            <option value="reserved">Reserved</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {previewUrls.map((url, idx) => (
              <img key={idx} src={url} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-black hover:opacity-80 text-white px-6 py-2 rounded-md transition"
          >
            Update Product
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default EditProduct;
