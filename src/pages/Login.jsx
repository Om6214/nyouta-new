import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { login, googleSignup,verifyEmail } from '../Store/slices/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const [otp,setotp]=useState();
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async(e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }
    const data = {
      emailorphone:formData.email,
      password:formData.password
    }
    const res = await dispatch(login(data));
    if (res.type === 'auth/login/fulfilled') {
      console.log(res.payload);
      if (res.payload.requiresOtp) {
        setIsOtpModalOpen(true);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    }
  }

  const handleGoogleLogin = async (response) => {
    const res = await dispatch(googleSignup(response));
    if (res.type === 'auth/googleSignup/fulfilled') {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }

  const handleOTP=async(e)=>{
    e.preventDefault();
    const data = {
      otp:otp,
      emailorphone:formData.email,
    }
    const res = await dispatch(verifyEmail(data));
    if (res.type === 'auth/verifyEmail/fulfilled') {
      setIsOtpModalOpen(false);
      navigate("/");
    } 
  }
  const OtpModal = () => (
    <div className="fixed z-100 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-bold">Enter OTP</h2>
        <input 
        type="text" 
        placeholder="Enter OTP" 
        className="border p-2 rounded w-full" 
        value={otp}
        onChange={(e)=>setotp(e.target.value)} 
        />
        <div className="mt-4 flex justify-end">
          <button onClick={() => setIsOtpModalOpen(false)} className="mr-2 text-gray-500">Cancel</button>
          <button onClick={handleOTP} className="bg-indigo-600 text-white px-4 py-2 rounded">Submit</button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={(e)=>setFormData({...formData,email:e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e)=>setFormData({...formData,password:e.target.value})}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs italic">{error}</p>}

          {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div> */}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>

          <div className="mt-4 flex justify-center">
            <GoogleLogin
              onSuccess={(response) => {

                handleGoogleLogin(response);
              }}
              onError={() => {
                console.log("Login failed");
              }}
              type="standard"
              text="continue_with"
              theme="dark"
              shape='square'
            />
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Register here
            </Link>
          </p>
        </div>
      </div>
      {isOtpModalOpen && (
        <OtpModal />
      )}
    </div>
  )
}