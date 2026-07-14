const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  deleteUser,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.get('/dashboard', protect, admin, getDashboardStats);
router.get('/users', protect, admin, getAllUsers);
router.get('/orders', protect, admin, getAllOrders);
router.put('/orders/:id/status', protect, admin, updateOrderStatus);
router.delete('/users/:id', protect, admin, deleteUser);

module.exports = router;
