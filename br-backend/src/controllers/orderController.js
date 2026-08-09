const Order = require('../models/Order');
const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { emitOrderUpdate, emitNewOrder } = require('../websocket');

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

    const populated = await Order.findById(order._id)
      .populate('items.menuItem', 'name price image category')
      .populate('user', 'name email phone');

    emitNewOrder(populated);

    successResponse(res, populated, 'Order placed successfully', 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const getOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (!req.user.isAdmin) {
      filter.user = req.user._id;
    }
    if (status) {
      filter.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const orders = await Order.find(filter)
      .populate('user', 'name email phone')
      .populate('items.menuItem', 'name price image category')
      .sort('-createdAt')
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments(filter);

    successResponse(res, {
      orders,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone address')
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

    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return errorResponse(res, 'Invalid order status', 400);
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return errorResponse(res, 'Order not found', 404);
    }

    order.status = status;
    const updatedOrder = await order.save();

    emitOrderUpdate(order._id, { status: updatedOrder.status, updatedAt: updatedOrder.updatedAt });

    successResponse(res, updatedOrder, 'Order status updated successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return errorResponse(res, 'Order not found', 404);
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Not authorized to cancel this order', 403);
    }

    if (['delivered', 'cancelled'].includes(order.status)) {
      return errorResponse(res, `Cannot cancel order with status: ${order.status}`, 400);
    }

    order.status = 'cancelled';
    await order.save();

    emitOrderUpdate(order._id, { status: 'cancelled', updatedAt: order.updatedAt });

    successResponse(res, order, 'Order cancelled successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus, cancelOrder };
