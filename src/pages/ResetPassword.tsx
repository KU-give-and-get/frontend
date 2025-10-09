import React, { useState } from 'react'

const ResetPassword = () => {
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('')

    }
    return (
    <div className='flex flex-col items-center mt-30'>
      <form 
        className='w-full flex flex-col items-center sm:max-w-96 m-auto mt-14 text-gray-800 gap-4'
        onSubmit={handleSubmit}
      >
        <p className='prata-regular text-3xl'>{'Reset Password'}</p>

        {/* แสดง error ถ้ามี */}
        {error && (
          <div className='w-full text-red-600 text-sm border border-red-500 bg-red-50 px-3 py-2 rounded'>
            {error}
          </div>
        )}
        <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='w-full px-3 py-2 border border-gray-800' 
            placeholder='Password' 
            required
          />
            <input 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            value={confirmPassword} 
            className='w-full px-3 py-2 border border-gray-800' 
            placeholder='Confirm Password' 
            required
          />
        <button type='submit' className='bg-black text-white font-light px-8 py-2 hover:opacity-80'>
          {'Confirm'}
        </button>
      </form>
    </div>
  )
}

export default ResetPassword