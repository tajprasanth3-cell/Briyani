const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const bcrypt = require('bcryptjs');

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 'User already exists with this email', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      isAdmin: true,
    });

    successResponse(res, {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: true,
      token: generateToken(user._id),
    }, 'Admin account created successfully', 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { registerAdmin };
