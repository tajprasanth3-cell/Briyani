const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 'User already exists with this email', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword, phone, address });

    successResponse(res, {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    }, 'Account created successfully', 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    successResponse(res, {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    }, 'Login successful');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const logout = async (req, res) => {
  try {
    successResponse(res, null, 'Logged out successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { register, login, logout };
