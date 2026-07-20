const { errorResponse } = require('../utils/responseHandler');

const VALID_CATEGORIES = [
  'Chicken Biryani', 'Mutton Biryani', 'Fish Biryani', 'Prawn Biryani',
  'Egg Biryani', 'Starters', 'Beverages', 'Desserts', 'Roti & Breads',
];

const validateMenuItem = (req, res, next) => {
  const { name, description, price, category } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters');
  if (!description || description.trim().length < 5) errors.push('Description must be at least 5 characters');
  if (price === undefined || price === null || Number(price) < 0) errors.push('Valid price is required');
  if (!category || !VALID_CATEGORIES.includes(category)) errors.push('Valid category is required');

  if (errors.length > 0) return errorResponse(res, errors.join(', '), 400);
  next();
};

module.exports = { validateMenuItem };
