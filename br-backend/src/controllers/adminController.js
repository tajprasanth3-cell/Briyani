const User = require('../models/User');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const Payment = require('../models/Payment');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalMenuItems = await MenuItem.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });

    const revenue = await Order.aggregate([
      { $match: { status: { $nin: ['cancelled'] } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    const recentOrders = await Order.find()
      .populate('user', 'name email phone')
      .populate('items.menuItem', 'name price image')
      .sort('-createdAt')
      .limit(10);

    successResponse(res, {
      totalUsers,
      totalOrders,
      totalMenuItems,
      pendingOrders,
      totalRevenue: revenue[0]?.total || 0,
      recentOrders,
    });
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt');
    successResponse(res, users);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email phone')
      .populate('items.menuItem', 'name price image')
      .sort('-createdAt');
    successResponse(res, orders);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return errorResponse(res, 'Order not found', 404);
    }
    order.status = status;
    await order.save();
    const updated = await Order.findById(order._id)
      .populate('user', 'name email phone')
      .populate('items.menuItem', 'name price image');
    successResponse(res, updated, 'Order status updated');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    if (user.isAdmin) {
      return errorResponse(res, 'Cannot delete admin user', 400);
    }
    await user.deleteOne();
    successResponse(res, null, 'User deleted successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { getDashboardStats, getAllUsers, getAllOrders, updateOrderStatus, deleteUser };
