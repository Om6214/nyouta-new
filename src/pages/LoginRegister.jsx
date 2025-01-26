import React, { useState, useEffect } from "react";
import { FaGooglePlusG } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { login, register, googleSignup, verifyEmail } from '../Store/slices/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import './Login.css'

export default function LoginRegister() {
  const [isRightPanelActive, setIsRightPanelActive] = useState();
// Function to check if the device is small (e.g., mobile or tablet)


const [isSmallScreen, setISSmallscreen] = useState(false);

// Function to check if the screen is small
function checkSmallScreen() {
  return window.innerWidth < 768;
}

// useEffect hook to handle screen resizing
useEffect(() => {
  // Initial check when component mounts
  setISSmallscreen(checkSmallScreen());

  // Event listener for resizing the window
  const handleResize = () => {
    setISSmallscreen(checkSmallScreen());
  };

  // Add the event listener when the component mounts
  window.addEventListener('resize', handleResize);

  // Cleanup the event listener when the component unmounts
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // Empty dependency array ensures this effect runs once after initial render



  const location = useLocation();
  useEffect(() => {
    setIsRightPanelActive(location.pathname === '/register');
  }, [location.pathname]);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
    navigate('/register');
  };
  const handleSignInClick = () => {
    setIsRightPanelActive(false);
    navigate('/login');
  };

  const [formData1, setformData1] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [otp1, setotp1] = useState();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error1, seterror1] = useState('')
  const [isotp1ModalOpen, setIsotp1ModalOpen] = useState(false);
  const dispatch1 = useDispatch();
  const handleGoogleLogin1 = async (response) => {
    const res = await dispatch1(googleSignup(response));
    if (res.type === 'auth/googleSignup/fulfilled') {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [otp, setotp] = useState();
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }
    const data = {
      emailorphone: formData.email,
      password: formData.password
    }
    const res = await dispatch(login(data));
    if (res.type === 'auth/login/fulfilled') {
      // console.log(res.payload);
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

  const handleOTP = async (e) => {
    e.preventDefault();
    const data = {
      otp: otp,
      emailorphone: formData.email,
    }
    const res = await dispatch(verifyEmail(data));
    if (res.type === 'auth/verifyEmail/fulfilled') {
      setIsOtpModalOpen(false);
      navigate("/");
    }
  }
  const OtpModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-bold">Enter OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          className="border p-2 rounded w-full"
          value={otp}
          onChange={(e) => setotp(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <button onClick={() => setIsOtpModalOpen(false)} className="mr-2 text-gray-500">Cancel</button>
          <button onClick={handleOTP} className="bg-indigo-600 text-white px-4 py-2 rounded">Submit</button>
        </div>
      </div>
    </div>
  );

  const handleChange1 = (e) => {
    const { name, value } = e.target
    setformData1(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit1 = async (e) => {
    e.preventDefault()
    seterror1('')

    if (!formData1.name || !formData1.email || !formData1.password || !formData1.confirmPassword) {
      seterror1('Please fill in all fields')
      return
    }

    if (formData1.password !== formData1.confirmPassword) {
      seterror1('Passwords do not match')
      return
    }

    const data1 = {
      name: formData1.name,
      emailorphone: formData1.email,
      password: formData1.password,
    }
    const res = await dispatch1(register(data1));
    if (res.type === 'auth/register/fulfilled') {
      setIsotp1ModalOpen(true);
    }
  }

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword)
    } else {
      setShowConfirmPassword(!showConfirmPassword)
    }
  }

  const handleotp1 = async (e) => {
    e.preventDefault();
    const data1 = {
      otp1: otp1,
      emailorphone: formData1.email,
    }
    // console.log(data1);
    const res = await dispatch1(verifyEmail(data1));
    if (res.type === 'auth/verifyEmail/fulfilled') {
      setIsotp1ModalOpen(false);
    }
  }
  const otp1Modal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-bold">Enter otp</h2>
        <input
          type="text"
          placeholder="Enter otp1"
          className="border p-2 rounded w-full"
          value={otp1}
          onChange={(e) => setotp1(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <button onClick={() => setIsotp1ModalOpen(false)} className="mr-2 text-gray-500">Cancel</button>
          <button onClick={handleotp1} className="bg-indigo-600 text-white px-4 py-2 rounded">Submit</button>
        </div>
      </div>
    </div>
  );

  return (

<>
  {
    !isSmallScreen &&(
<div
      className={` relative md:mx-[25%] mx-2 my-10 max-w-[768px] min-h-[500px] rounded-lg shadow-lg overflow-hidden bg-white transition-all duration-500 ${isRightPanelActive ? "right-panel-active" : ""}`}
    >
      {/* Sign Up Section */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 p-4 sm:p-12 flex flex-col items-center justify-center transition-transform duration-500 ${isRightPanelActive ? "translate-x-full opacity-100 z-10" : "opacity-0 z-0"
          }`}
      >
        <form className="text-center" onSubmit={handleSubmit1}>
          <h1 className="font-bold text-xl mb-4">Create Account</h1>
          <div className="flex justify-center items-center gap-2 mb-2">
            <div
              className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full text-gray-500 hover:text-gray-700"
            >
              <GoogleLogin
                onSuccess={(response) => {

                  handleGoogleLogin1(response);
                }}
                onerror1={() => {
                  // console.log("Login failed");
                }}
                type="standard"
                text="continue_with"
                theme="dark"
                shape='square'
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            or use your account
          </p>
          <input
            type="text"
            id="name"
            name="name"

            autoComplete="name"

            placeholder="Name"
            className="w-full p-3 mb-3 rounded-lg bg-gray-100 focus:outline-none"
            required
            value={formData1.name}
            onChange={handleChange1}
          />
          <input
            id="email-address"
            name="email"
            autoComplete="email"
            type="text"
            placeholder="Email"
            className="w-full p-3 mb-3 rounded-lg bg-gray-100 focus:outline-none"
            required
            value={formData1.email}
            onChange={handleChange1}
          />
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"

              placeholder="Password"
              className="w-full p-3 mb-3 rounded-lg bg-gray-100 focus:outline-none"
              required
              value={formData1.password}
              onChange={handleChange1}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => togglePasswordVisibility('password')}
            >{showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}</button>
          </div>

          <div className="relative">
            <input
              id="confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              placeholder="Password"
              className="w-full p-3 mb-3 rounded-lg bg-gray-100 focus:outline-none"
              value={formData1.confirmPassword}
              onChange={handleChange1}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => togglePasswordVisibility('confirmPassword')}
            >{showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
            </button>
          </div>
          {error1 && <p className="text-red-500 text-xs italic">{error1}</p>}
          <button
            id="button1"
            type="submit"
            className="px-8 py-3 mt-4 rounded-full bg-red-500 text-white uppercase font-bold hover:bg-red-600"
          >
            Sign Up
          </button>
        </form>
        {isotp1ModalOpen && <otp1Modal />}
      </div>

      {/* Sign In Section */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 p-4 sm:p-12 flex flex-col items-center justify-center transition-transform duration-500 ${isRightPanelActive ? "-translate-x-full opacity-0 z-0" : "opacity-100 z-10"
          }`}
      >
        <form className="text-center" onSubmit={handleSubmit}>
          <h1 className="font-bold text-2xl mb-4">Sign In</h1>
          <div className="flex justify-center items-center gap-4 mb-4">
            <div
              className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full text-gray-500 hover:text-gray-700"
            >
              <GoogleLogin
                onSuccess={(response) => {

                  handleGoogleLogin(response);
                }}
                onError={() => {
                  // console.log("Login failed");
                }}
                type="standard"
                text="continue_with"
                theme="dark"
                shape='square'
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">or use your account</p>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required

            placeholder="Email"
            className="w-full p-3 mb-3 rounded-lg bg-gray-100 focus:outline-none"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}

          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Password"
            className="w-full p-3 mb-3 rounded-lg bg-gray-100 focus:outline-none"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}

          />
          {/* <a href="#" className="text-sm text-gray-400 hover:text-gray-600 mb-4">
            Forgot your password?
          </a> */}
          <button
            id="button1"
            type="submit"
            className="md:px-8 py-3 px-4 mt-4 rounded-full bg-red-500 text-white uppercase font-bold hover:bg-red-600"
          >
            Sign In
          </button>
        </form>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}

        {isOtpModalOpen && (
          <OtpModal />
        )}
      </div>

      {/* Overlay Section */}
      <div
        className={`absolute top-0 left-1/2 h-full w-1/2 overflow-hidden transition-transform duration-500 z-20  ${isRightPanelActive ? "-translate-x-full" : "translate-x-0"
          }`}
      >
        <div className="absolute md:w-full inset-0 bg-gradient-to-r from-yellow-700 to-yellow-500 flex " >
          <div
            className={`absolute top-0 left-0 h-full  flex flex-col items-center justify-center p-6 sm:p-10 transition-transform duration-500 ${isRightPanelActive ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <h1 className="font-bold md:text-2xl text-white mb-4 hidden md:block">Hello, Friend!</h1>
            <p className="text-sm text-white mb-4 hidden md:block">
              Enter your personal details and start your journey with us
            </p>

            <button
              id="button1"
              className="px-8 py-3 rounded-full border border-white text-white uppercase font-bold hover:bg-white hover:text-yellow-700"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          </div>
          <div
            className={`absolute top-0 right-0 h-full  flex flex-col items-center justify-center p-10 transition-transform duration-500 ${isRightPanelActive ? "translate-x-full" : "translate-x-0"
              }`}
          >
            <h1 className="font-bold md:text-2xl text-white mb-4 hidden md:block">Welcome Back!</h1>
            <p className="text-sm text-white mb-4 hidden md:block">
              To keep connected with us, please login with your personal info
            </p>
            <button
              id="button1"
              className="px-8 py-3 rounded-full border border-white text-white uppercase font-bold hover:bg-white hover:text-yellow-700"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

    </div>
    )
  }
  {
    isSmallScreen &&(
      <div className="flex flex-col items-center justify-center mx-4 my-10 max-w-lg w-full p-6 rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-6">Welcome</h1>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          className={`py-2 px-4 rounded-lg font-bold transition ${
            isRightPanelActive ? "bg-gray-300" : "inset-0 bg-gradient-to-r from-yellow-700 to-yellow-500 text-white"
          }`}
          onClick={handleSignInClick}
        >
          Sign In
        </button>
        <button
          className={`py-2 px-4 rounded-lg font-bold transition ${
            isRightPanelActive ? "inset-0 bg-gradient-to-r from-yellow-700 to-yellow-500 text-white" : "bg-gray-300"
          }`}
          onClick={handleSignUpClick}
        >
          Sign Up
        </button>
      </div>

      {isRightPanelActive ? (
        <form className="w-full" onSubmit={handleSubmit1}>
          <h2 className="text-xl font-bold mb-4">Create Account</h2>
          <GoogleLogin
            onSuccess={(response) => handleGoogleLogin1(response)}
            onError={() => {}}
            type="standard"
            text="continue_with"
            theme="dark"
            shape="square"
            className="mb-4"
          />
          <p className="text-sm text-gray-500 mb-4">or use your email for registration</p>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 mb-3 rounded-lg border border-gray-300"
            required
            value={formData1.name}
            onChange={handleChange1}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-3 rounded-lg border border-gray-300"
            required
            value={formData1.email}
            onChange={handleChange1}
          />
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300"
              required
              value={formData1.password}
              onChange={handleChange1}
            />
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400"
              onClick={() => togglePasswordVisibility("password")}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="relative mb-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg border border-gray-300"
              required
              value={formData1.confirmPassword}
              onChange={handleChange1}
            />
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400"
              onClick={() => togglePasswordVisibility("confirmPassword")}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {error1 && <p className="text-red-500 text-xs italic mb-3">{error1}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600"
          >
            Sign Up
          </button>
        </form>
      ) : (
        <form className="w-full" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4">Sign In</h2>
          <GoogleLogin
            onSuccess={(response) => handleGoogleLogin(response)}
            onError={() => {}}
            type="standard"
            text="continue_with"
            theme="dark"
            shape="square"
            className="mb-4"
          />
          <p className="text-sm text-gray-500 mb-4">or use your email</p>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-3 rounded-lg border border-gray-300"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <div className="relative mb-3">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg border border-gray-300"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-3">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600"
          >
            Sign In
          </button>
        </form>
      )}
    </div>
    )
  }

</>
   

  );
};
