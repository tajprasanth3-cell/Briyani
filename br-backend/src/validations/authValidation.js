const { errorResponse } = require('../utils/responseHandler');

const validateRegister = (req, res, next) => {
  const { name, email, password, phone, address } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required');
  if (!password || password.length < 6) errors.push('Password must be at least 6 characters');
  if (phone && !/^[0-9]{10}$/.test(phone.replace(/\s/g, ''))) errors.push('Phone must be 10 digits');

  if (errors.length > 0) return errorResponse(res, errors.join(', '), 400);
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required');
  if (!password) errors.push('Password is required');

  if (errors.length > 0) return errorResponse(res, errors.join(', '), 400);
  next();
};

const validatePasswordReset = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length < 6) {
    return errorResponse(res, 'Password must be at least 6 characters', 400);
  }
  next();
};

module.exports = { validateRegister, validateLogin, validatePasswordReset };
