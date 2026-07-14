const Payment = require('../models/Payment');
const Order = require('../models/Order');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const processPayment = async (req, res) => {
  try {
    const { orderId, method, transactionId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return errorResponse(res, 'Order not found', 404);
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Not authorized to pay for this order', 403);
    }

    if (['confirmed', 'delivered', 'cancelled'].includes(order.status)) {
      return errorResponse(res, `Cannot pay for order with status: ${order.status}`, 400);
    }

    const payment = await Payment.create({
      order: orderId,
      user: req.user._id,
      amount: order.totalAmount,
      method,
      transactionId,
      status: 'completed',
    });

    order.status = 'confirmed';
    await order.save();

    successResponse(res, payment, 'Payment processed successfully', 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { processPayment };
