const Notification = require('../models/Notification');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const filter = {};
    if (!req.user.isAdmin) {
      filter.user = req.user._id;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const notifications = await Notification.find(filter)
      .sort('-createdAt')
      .skip(skip)
      .limit(Number(limit));
    const total = await Notification.countDocuments(filter);
    const unread = await Notification.countDocuments({ ...filter, read: false });

    successResponse(res, {
      notifications,
      total,
      unread,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!notification) {
      return errorResponse(res, 'Notification not found', 404);
    }
    successResponse(res, notification, 'Marked as read');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const filter = {};
    if (!req.user.isAdmin) {
      filter.user = req.user._id;
    }
    await Notification.updateMany({ ...filter, read: false }, { read: true });
    successResponse(res, null, 'All notifications marked as read');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const createNotification = async (userId, type, title, message, data = {}) => {
  try {
    await Notification.create({ user: userId, type, title, message, data });
  } catch (error) {
    console.error('Failed to create notification:', error.message);
  }
};

module.exports = { getNotifications, markAsRead, markAllAsRead, createNotification };
