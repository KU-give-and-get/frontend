import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';


const Login = () => {
  const [currentState, setCurrentState] = useState<string>('Login');
  const [showVerificationMessage, setShowVerificationMessage] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const navigate = useNavigate()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('')
    
    try {
      const url = currentState === 'Login'
        ? 'http://localhost:4000/api/auth/login'
        : 'http://localhost:4000/api/auth/signup'
      
      const payload = {
        email,
        password,
        ...(currentState === 'Sign up' && {name})
      }

      const res = await axios.post(url, payload)
      console.log('Success:', res.data)
        
      if (res.data.user.isVerified) {
        if (res.data.token) {
          // If it's a login, store the token and navigate to the home page
          localStorage.setItem('token', res.data.token);
        }
        // ถ้า verified แล้ว ไปหน้าหลัก
        navigate('/');
      } else {
        // ถ้ายังไม่ verified แสดงข้อความให้ตรวจสอบอีเมล
        setShowVerificationMessage(true);
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      } else {
        setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
      }
    }
  }

    
const login = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      // ใช้ access_token ดึงข้อมูล user จาก Google
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        }
      );

      // ส่งข้อมูล user หรือ access_token ไป backend
      const res = await axios.post('http://localhost:4000/api/auth/google', {
        accessToken: tokenResponse.access_token,
        email: userInfo.data.email,
        name: userInfo.data.name,
        googleId: userInfo.data.sub,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err : any) {
      if (err.response && err.response.data) {
        console.error(err);
        setError(err.response.data.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      } else {
        setError("เกิดข้อผิดพลาดในการเชื่อมต่อ");
      }
    }
  },
  onError: () => {
    console.log('Login Failed');
  },
});

  if (showVerificationMessage) {
    return (
      <div className='flex flex-col items-center mt-30'>
        <div className='w-full sm:max-w-96 m-auto mt-14 text-gray-800 p-8 border rounded-lg shadow-lg text-center'>
          <h2 className='text-2xl font-semibold mb-4'>โปรดตรวจสอบอีเมลของคุณ</h2>
          <p className='text-gray-600 mb-4'>
            เราได้ส่งอีเมลยืนยันบัญชีไปให้คุณแล้ว<br/>
            กรุณาตรวจสอบในกล่องจดหมายเข้า (Inbox) หรือในกล่องจดหมายขยะ (Spam)
          </p>
          <Link to="/" className='text-sm text-blue-500 hover:underline'>กลับสู่หน้าหลัก</Link>
        </div>
      </div>
    );
  }



  return (
    <div className='flex flex-col items-center mt-30'>
      {/* local login */}
      <form 
        className='w-full flex flex-col items-center sm:max-w-96 m-auto mt-14 text-gray-800 gap-4'
        onSubmit={handleSubmit}
      >
        <p className='prata-regular text-3xl'>{currentState}</p>

        {/* แสดง error ถ้ามี */}
        {error && (
          <div className='w-full text-red-600 text-sm border border-red-500 bg-red-50 px-3 py-2 rounded'>
            {error}
          </div>
        )}

        {currentState == 'Login'? '' : (
          <input 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            type='text' 
            className='w-full px-3 py-2 border border-gray-800' 
            placeholder='Name' 
            required
          />
        )}
        <input 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          type='text' 
          className='w-full px-3 py-2 border border-gray-800' 
          placeholder='Email' 
          required
        />
        <div className='relative w-full'>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            type={showPassword ? 'text' : 'password'}
            className='w-full px-3 py-2 border border-gray-800' 
            placeholder='Password' 
            required
          />
          <img 
            src="/images/eye_icon.png" 
            alt="" 
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer w-12 h-12'/>
        </div>
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot your password?</p>
          {
            currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign up')} className='cursor-pointer'>Create account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
          }
        </div>
        <button type='submit' className='bg-black text-white font-light px-8 py-2 hover:opacity-80'>
          {currentState}
        </button>
      </form>

      <div className='w-full inline-flex items-center justify-center my-4 sm:max-w-96 gap-1'>
        <hr className='border-none h-[1.5px] w-1/2 bg-gray-800'></hr>
        <p className='px-2 text-md text-gray-500 bg-white font-medium'>
          or
        </p>
        <hr className='border-none h-[1.5px] w-1/2 bg-gray-800'></hr>
      </div>

      {/* google login */}
      <div 
        onClick={() =>login()}
        className='w-full text-gray-800 justify-center items-center sm:max-w-96 flex border gap-2 px-3 py-2 hover:text-white hover:bg-gray-800 hover:border-gray-200'>
        <img src="/images/google_logo.png" alt="" className='w-4'/>
        <p className='font-medium'>Continue with google</p>
      </div>
    </div>
  )
}

export default Login
