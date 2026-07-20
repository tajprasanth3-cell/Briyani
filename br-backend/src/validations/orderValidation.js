const { errorResponse } = require('../utils/responseHandler');

const validateOrder = (req, res, next) => {
  const { items, orderType } = req.body;
  const errors = [];

  if (!items || !Array.isArray(items) || items.length === 0) {
    errors.push('At least one order item is required');
  } else {
    items.forEach((item, i) => {
      if (!item.menuItem) errors.push(`Item ${i + 1}: menu item ID is required`);
      if (!item.quantity || item.quantity < 1) errors.push(`Item ${i + 1}: quantity must be at least 1`);
    });
  }

  const validTypes = ['dine-in', 'takeaway', 'delivery'];
  if (orderType && !validTypes.includes(orderType)) {
    errors.push('Order type must be dine-in, takeaway, or delivery');
  }

  if (errors.length > 0) return errorResponse(res, errors.join(', '), 400);
  next();
};

module.exports = { validateOrder };
