import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface UserType {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  faculty: string;
  major: string;
  isLoan: boolean;
  profileImageUrl: string;
}

const Profile = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Unauthorized');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:4000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">ข้อมูลส่วนตัว</h2>

      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* รูปโปรไฟล์ */}
        <div className="flex-shrink-0">
          <img
            src={user.profileImageUrl || "/images/default_profile_picture.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border"
          />
        </div>

        {/* ข้อมูล */}
        <div className="flex-1 space-y-2">
          <p><span className="font-medium">ชื่อ-นามสกุล:</span> {user.name}</p>
          <p><span className="font-medium">อีเมล:</span> {user.email}</p>
          <p><span className="font-medium">ยืนยันอีเมล:</span> {user.isVerified ? "ยืนยันแล้ว" : "ยังไม่ยืนยัน"}</p>
          <p><span className="font-medium">คณะ:</span> {user.faculty || "-"}</p>
          <p><span className="font-medium">สาขา:</span> {user.major || "-"}</p>
          <p><span className="font-medium">กู้ กยศ:</span> {user.isLoan ? "ใช่" : "ไม่"}</p>
        </div>
      </div>

      {/* ปุ่มแก้ไขโปรไฟล์ */}
      <div className="mt-6 text-center">
        <Link to="/editProfile">
          <button className="bg-black text-white px-6 py-2 rounded-md hover:opacity-80 transition">
            แก้ไขโปรไฟล์
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
