import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// console.log(transporter);
// console.log(process.env.EMAIL_USER,process.env.EMAIL_PASS)
// Generate OTP
const generateOTP = () => {
  // Generate a 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Register user with email verification
export const register = async (req, res) => {
  try {
    const { emailorphone, password, name } = req.body;
    if (!emailorphone || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let existingUser;
    if (emailorphone.includes("@")) {
      existingUser = await User.findOne({ email: emailorphone });
    } else {
      existingUser = await User.findOne({ phone: emailorphone });
    }

    if (existingUser) {
      if(existingUser.isVerified){
        return res.status(400).json({ message: 'User already registered. Please log in.' });
      }
      else{
        const otp = generateOTP();
        existingUser.otp = otp;
        existingUser.otpGeneratedAt = Date.now();
        await existingUser.save();
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: emailorphone,
          subject: 'Verify Your Email Address',
          html: `<p>Hello ${name},</p>
                 <p>Thank you for registering. Please verify your email address by entering the OTP below:</p>
                 <p><strong>${otp}</strong></p>
                 <p>This OTP is valid for 10 mins.</p>`,
        });
        return res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
      }
    }

    const email = emailorphone.includes("@") ? emailorphone : null;
    const phone = emailorphone.includes("@") ? null : emailorphone;
    const user = new User({ email, partnerName:name, phone, password, name, isVerified: false });

    const otp = generateOTP();
    user.otp = otp;
    await user.save();
   console.log(user.otp);
    if (email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email Address',
        html: `<p>Hello ${name},</p>
               <p>Thank you for registering. Please verify your email address by entering the OTP below:</p>
               <p><strong>${otp}</strong></p>
               <p>This OTP is valid for 10 mins.</p>`,
      });
      return res.status(201).json({
        message: 'User registered successfully. Please verify your email.',
      });
    } else {
      const formatContactNumber = (contactNumber) => {
        if (contactNumber.startsWith("+91")) {
          return contactNumber.slice(3); // Remove +91
        }
        return contactNumber;
      };

      const formattedPhone = formatContactNumber(phone);
      const fast2smsData = {
        route: "otp",
        variables_values: otp,
        numbers: formattedPhone,
      };

      const fast2smsHeaders = {
        authorization: process.env.FAST2SMS_API_KEY,
        "Content-Type": "application/json",
      };

      const response = await fetch(
        "https://www.fast2sms.com/dev/bulkV2",
        {
          method: "POST",
          body: JSON.stringify(fast2smsData),
          headers: fast2smsHeaders
        }
      );

      if (response.status === 200) {
        return res.status(201).json({
          message: 'User registered successfully. Please verify your phone number.',
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { emailorphone, password } = req.body;
    if (!emailorphone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user;
    if (emailorphone.includes("@")) {
      user = await User.findOne({ email: emailorphone });
    } else {
      user = await User.findOne({ phone: emailorphone });
    }

  if(!user){
    return res.status(401).json({ message: 'User not found' });
  }
  else{
    if(!user.isVerified){
      const otp = generateOTP();
      user.otp = otp;
      user.otpGeneratedAt = Date.now();
      await user.save();
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Verify Your Email Address',
        html: `<p>Hello ${user.name},</p>
               <p>Thank you for registering. Please verify your email address by entering the OTP below:</p>
               <p><strong>${user.otp}</strong></p>
               <p>This OTP is valid for 10 mins.</p>`,
      });
      return res.status(201).json({ message: 'Please verify your email.',requiresOtp:true });
    }
  }
  if(!(await user.comparePassword(password))){
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  if(!user.isVerified){
    return res.status(403).json({ message: 'Please verify your email to log in.' });
  }
    const token = jwt.sign(
      { userId: user._id, role: user.role},
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    const { _id, name, email: userEmail, phone, role, isWebsiteCreated } = user;
    res.json({ token, user: { _id, name, userEmail, phone, role, isWebsiteCreated } });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Verify OTP
export const verifyEmail = async (req, res) => {
  try {
    const { emailorphone, otp } = req.body;

    let user;
    if (emailorphone.includes("@")) {
      user = await User.findOne({ email: emailorphone });
    } else {
      user = await User.findOne({ phone: emailorphone });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP.' });
    }

    const otpExpirationTime = 10 * 60 * 1000; // 10 minutes
    if (Date.now() - user.otpGeneratedAt > otpExpirationTime) {
      return res.status(400).json({ error: 'OTP has expired.' });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Email verified successfully.',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isWebsiteCreated: user.isWebsiteCreated,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid request.' });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Google Signup
export const googleSignup = async (req, res) => {
  try {
    const response = req.body;
    const clientId = response.clientId;
    const clientCredentials = response.credential;
    const jwtDecode = jwt.decode(clientCredentials);
    console.log(jwtDecode);
    const user = await User.findOne({ email: jwtDecode.email });
    console.log(user);
    if (user) {
      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({
        success: true,
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          role: user.role,
          isWebsiteCreated: user.isWebsiteCreated,
        },
        message: "Signed in successfully",
      });
    }

    const newUser = new User({
      email: jwtDecode.email,
      name: jwtDecode.name,
      partnerName: jwtDecode.name,
      clientId: clientId,
      isVerified: true,
      avatar: jwtDecode.picture,
    });
    console.log(newUser)
    try {
      await newUser.save();
    } catch (error) {
      console.error("Error saving user:", error.message);
      return res.status(400).json({ success: false, message: error.message });
    }    
    console.log("hiii");
    jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: 'Error generating token',
        });
      }
      console.log(token);
      return res.status(201).json({
        success: true,
        token,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          avatar: newUser.avatar,
          role: newUser.role,
          isWebsiteCreated: newUser.isWebsiteCreated,
        },
        message: "Signed up successfully",
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


// Get user by ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { _id, name, email, phone, role, isWebsiteCreated } = user;
    res.status(200).json({ user });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}
