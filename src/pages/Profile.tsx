import React from 'react'

const Profile = () => {
  // ตัวอย่างข้อมูล mock
  const user = {
    fullName: "สมชาย ใจดี",
    nickname: "ชายน้อย",
    email: "somchai@example.com",
    phone: "0812345678",
    address: "123 หมู่ 4 ต.บางบ่อ อ.บางบ่อ จ.สมุทรปราการ 10560",
    profileImage: "/images/profile-placeholder.png",
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">ข้อมูลส่วนตัว</h2>

      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* รูปโปรไฟล์ */}
        <div className="flex-shrink-0">
          <img
            src="/images/profile_icon.png"
            alt="Profile"
            className="w-32 h-32 rounded-full object-contain border"
          />
        </div>

        {/* ข้อมูล */}
        <div className="flex-1 space-y-3">
          <p><span className="font-medium">ชื่อ-นามสกุล:</span> {user.fullName}</p>
          <p><span className="font-medium">ชื่อเล่น:</span> {user.nickname}</p>
          <p><span className="font-medium">อีเมล:</span> {user.email}</p>
          <p><span className="font-medium">เบอร์โทร:</span> {user.phone}</p>
          <p><span className="font-medium">ที่อยู่:</span> {user.address}</p>
        </div>
      </div>

      {/* ปุ่มแก้ไขโปรไฟล์ */}
      <div className="mt-6 text-center">
        <button className="bg-black text-white px-6 py-2 rounded-md hover:opacity-80 transition">
          แก้ไขโปรไฟล์
        </button>
      </div>
    </div>
  );
};


export default Profile
