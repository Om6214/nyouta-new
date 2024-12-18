import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  clientId: {
    type: String,
  },
  avatar: {
    type: String,
    default: "https://www.gravatar.com/avatar/"
  },
  phone:{
    type: Number,
  },
  gender:{
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
    default: 'Prefer not to say',
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String, // Store OTP as a string
    required: false,
  },
  otpGeneratedAt: {
    type: Date, // Store the time when OTP was generated
    required: false,
  },
  partnerName: {
    type: String,
    required: false,
  },
  weddingDate: {
    type: Date,
    required: false,
  },
  weddingLocation: {
    type: String,
    required: false,
  },
  weddingVenue: {
    type: String,
    required: false,
  },
  templateId: {
    type: String,
    required: false,
  },
  isWeddingWebsiteCreated: {
    type: Boolean,
    default: false,
  },
});

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare input password with hashed password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;