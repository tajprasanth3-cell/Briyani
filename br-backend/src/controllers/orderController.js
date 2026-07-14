const Order = require('../models/Order');
const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const createOrder = async (req, res) => {
  try {
    const { items, orderType, tableNumber, deliveryAddress, specialInstructions } = req.body;

    if (!items || items.length === 0) {
      return errorResponse(res, 'No order items provided', 400);
    }

    const menuItemIds = items.map((item) => item.menuItem);
    const menuItems = await MenuItem.find({ _id: { $in: menuItemIds } });

    const menuItemMap = {};
    for (const item of menuItems) {
      menuItemMap[item._id.toString()] = item;
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const menuItem = menuItemMap[item.menuItem];
      if (!menuItem) {
        return errorResponse(res, `Menu item ${item.menuItem} not found`, 404);
      }

      if (!menuItem.isAvailable) {
        return errorResponse(res, `${menuItem.name} is currently unavailable`, 400);
      }

      orderItems.push({
        menuItem: item.menuItem,
        quantity: item.quantity,
        price: menuItem.price,
      });

      totalAmount += menuItem.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      orderType,
      tableNumber,
      deliveryAddress,
      specialInstructions,
    });

    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $set: { items: [] } }
    );

    successResponse(res, order, 'Order placed successfully', 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const getOrders = async (req, res) => {
  try {
    const filter = {};
    if (!req.user.isAdmin) {
      filter.user = req.user._id;
    }

    const orders = await Order.find(filter)
      .populate('user', 'name email phone')
      .populate('items.menuItem', 'name price image')
      .sort('-createdAt');

    successResponse(res, orders);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('items.menuItem', 'name price image category');

    if (!order) {
      return errorResponse(res, 'Order not found', 404);
    }

    if (!req.user.isAdmin && order.user._id.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Not authorized to view this order', 403);
    }

    successResponse(res, order);
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
    const updatedOrder = await order.save();

    successResponse(res, updatedOrder, 'Order status updated successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus };
