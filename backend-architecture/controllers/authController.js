import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    // Step 1: Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Step 2: Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Step 3: Hash password and create user
    const salt = await bcrypt.genSalt(10); // 10 is a common default for salt rounds
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store hashed password
    });

    const user = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    // Debugging: Log stored and entered passwords
    console.log('Entered password:', password);
    console.log('Stored hashed password:', user.password);

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role || 'user' }, // Add a default role if undefined
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send response with token and user info
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role || 'user',
      },
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Logout
const logoutUser = (req, res) => {
  try {
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { registerUser, loginUser, logoutUser };
