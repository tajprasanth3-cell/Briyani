const express = require('express');
const router = express.Router();
const { register, login, logout, forgotPassword, resetPassword, changePassword } = require('../controllers/authController');
const { registerAdmin } = require('../controllers/adminAuthController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');
const { validateRegister, validateLogin, validatePasswordReset, validateChangePassword } = require('../validations/authValidation');

router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);
router.post('/logout', logout);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authLimiter, validatePasswordReset, resetPassword);
router.put('/change-password', protect, validateChangePassword, changePassword);
router.post('/register-admin', protect, admin, registerAdmin);

module.exports = router;
