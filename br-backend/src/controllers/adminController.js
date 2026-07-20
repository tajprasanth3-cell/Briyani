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
    const { status, search, startDate, endDate, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate + 'T23:59:59');
    }

    let query = Order.find(filter)
      .populate('user', 'name email phone')
      .populate('items.menuItem', 'name price image')
      .sort('-createdAt');

    const skip = (Number(page) - 1) * Number(limit);
    let orders = await query.skip(skip).limit(Number(limit));
    const total = await Order.countDocuments(filter);

    if (search) {
      const searchLower = search.toLowerCase();
      orders = orders.filter((order) => {
        const userName = order.user?.name?.toLowerCase() || '';
        const userEmail = order.user?.email?.toLowerCase() || '';
        const orderId = order._id.toString().toLowerCase();
        return userName.includes(searchLower) || userEmail.includes(searchLower) || orderId.includes(searchLower);
      });
    }

    successResponse(res, { orders, page: Number(page), pages: Math.ceil(total / Number(limit)), total });
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

const exportOrdersCSV = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email phone')
      .populate('items.menuItem', 'name price')
      .sort('-createdAt');

    const headers = ['Order ID', 'Customer', 'Email', 'Phone', 'Items', 'Total', 'Type', 'Status', 'Date'];
    const rows = orders.map((order) => [
      order._id.toString().slice(-8).toUpperCase(),
      order.user?.name || 'N/A',
      order.user?.email || 'N/A',
      order.user?.phone || 'N/A',
      order.items.map((i) => `${i.menuItem?.name || 'Item'} x${i.quantity}`).join('; '),
      order.totalAmount,
      order.orderType,
      order.status,
      new Date(order.createdAt).toLocaleDateString(),
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach((row) => {
      csv += row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n';
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=orders.csv');
    res.send(csv);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const getRevenueReports = async (req, res) => {
  try {
    const { period = 'daily' } = req.query;
    let groupBy;

    if (period === 'daily') {
      groupBy = { year: { $year: '$createdAt' }, month: { $month: '$createdAt' }, day: { $dayOfMonth: '$createdAt' } };
    } else if (period === 'weekly') {
      groupBy = { year: { $year: '$createdAt' }, week: { $week: '$createdAt' } };
    } else {
      groupBy = { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } };
    }

    const reports = await Order.aggregate([
      { $match: { status: { $nin: ['cancelled'] } } },
      { $group: { _id: groupBy, revenue: { $sum: '$totalAmount' }, count: { $sum: 1 } } },
      { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } },
      { $limit: 30 },
    ]);

    successResponse(res, reports);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const toggleMenuAvailability = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return errorResponse(res, 'Menu item not found', 404);
    }
    item.isAvailable = !item.isAvailable;
    await item.save();
    successResponse(res, item, `Menu item ${item.isAvailable ? 'enabled' : 'disabled'}`);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = {
  getDashboardStats, getAllUsers, getAllOrders, updateOrderStatus,
  deleteUser, exportOrdersCSV, getRevenueReports, toggleMenuAvailability,
};
