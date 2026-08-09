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
  const { email, code, password } = req.body;
  const errors = [];

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required');
  if (!code) errors.push('Reset code is required');
  if (!password || password.length < 6) errors.push('Password must be at least 6 characters');

  if (errors.length > 0) return errorResponse(res, errors.join(', '), 400);
  next();
};

const validateChangePassword = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const errors = [];

  if (!currentPassword) errors.push('Current password is required');
  if (!newPassword || newPassword.length < 6) errors.push('New password must be at least 6 characters');

  if (errors.length > 0) return errorResponse(res, errors.join(', '), 400);
  next();
};

module.exports = { validateRegister, validateLogin, validatePasswordReset, validateChangePassword };
