import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserType {
  _id: string;
  name: string;
  email: string;
  faculty: string;
  major: string;
  isLoan: boolean;
  profileImageUrl: string;
}

const EditProfile = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const navigate = useNavigate();

  // ดึงข้อมูลผู้ใช้
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:4000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setPreview(res.data.user.profileImageUrl || "/images/default_profile_picture.png");
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // handle change field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (!user) return;
    setUser((prev) => ({
      ...prev!,
      [name]: name === "isLoan" ? value === "true" : value,
    }));
  };

  // handle image select
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("faculty", user.faculty || "");
      formData.append("major", user.major || "");
      formData.append("isLoan", String(user.isLoan));
      if (selectedImage) {
        formData.append("profileImage", selectedImage);
      }

      await axios.put("http://localhost:4000/api/auth/edit-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/profile"); // กลับไปหน้าโปรไฟล์
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!user) return null;

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">แก้ไขโปรไฟล์</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* รูปโปรไฟล์ */}
        <div>
          <label className="block font-medium mb-1">รูปโปรไฟล์</label>
          <div className="flex items-center space-x-4">
            <img
              src={preview || "/images/default_profile_picture.png"}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
          </div>
        </div>

        {/* ชื่อ */}
        <div>
          <label className="block font-medium mb-1">ชื่อจริง - นามสกุล</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* คณะ */}
        <div>
          <label className="block font-medium mb-1">คณะ</label>
          <input
            type="text"
            name="faculty"
            value={user.faculty || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* สาขา */}
        <div>
          <label className="block font-medium mb-1">สาขา</label>
          <input
            type="text"
            name="major"
            value={user.major || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* กยศ */}
        <div>
          <label className="block font-medium mb-1">กยศ</label>
          <select
            name="isLoan"
            value={user.isLoan ? "true" : "false"}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="true">กยศ</option>
            <option value="false">ไม่มี</option>
          </select>
        </div>

        {/* อีเมล (readonly) */}
        <div>
          <label className="block font-medium">อีเมล</label>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          บันทึกการแก้ไข
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
