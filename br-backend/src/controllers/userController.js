const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    successResponse(res, user);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return errorResponse(res, 'Email already in use', 400);
      }
      user.email = email;
    }

    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;

    const updatedUser = await user.save();

    successResponse(res, {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      isAdmin: updatedUser.isAdmin,
    }, 'Profile updated successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { getProfile, updateProfile };
