import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // Assuming you have a loading spinner library

const VerifyEmail = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  // useEffect to run the verification process when the component mounts
  useEffect(() => {
    // This function will handle the API call for email verification
    const verifyUserEmail = async () => {
      if (!token) {
        // If there's no token in the URL, show an error message
        setStatus('error');
        setMessage('ลิงก์ยืนยันไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง');
        return;
      }

      try {
        // Send the token to the backend for verification
        const res = await axios.get(`http://localhost:4000/api/auth/verify-email/${token}`);
        
        // If the verification is successful
        if (res.status === 200) {
          setStatus('success');
          setMessage('การยืนยันบัญชีสำเร็จแล้ว! คุณสามารถเข้าสู่ระบบได้เลย');
          // You could automatically navigate the user to the login page after a delay
          // setTimeout(() => navigate('/login'), 5000);
        } else {
          // Handle other potential success statuses if needed
          setStatus('error');
          setMessage('การยืนยันไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        }
      } catch (err) {
        // Handle API errors (e.g., token expired, invalid token)
        setStatus('error');
        if (axios.isAxiosError(err) && err.response && err.response.data) {
          setMessage(err.response.data.message || 'เกิดข้อผิดพลาดในการยืนยัน');
        } else {
          setMessage('เกิดข้อผิดพลาดในการเชื่อมต่อ');
        }
      }
    };

    verifyUserEmail();
  }, [token, navigate]);

  // Render content based on the status
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {status === 'loading' && (
          <>
            <div className="flex justify-center mb-4">
              <ClipLoader color="#3B82F6" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700">กำลังยืนยัน...</h2>
            <p className="mt-2 text-gray-500">กรุณารอสักครู่</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">ยืนยันสำเร็จ!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              ไปที่หน้าเข้าสู่ระบบ
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-red-500 text-6xl mb-4">✗</div>
            <h2 className="text-2xl font-bold text-red-700 mb-2">เกิดข้อผิดพลาด</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              กลับไปหน้าเข้าสู่ระบบ
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;