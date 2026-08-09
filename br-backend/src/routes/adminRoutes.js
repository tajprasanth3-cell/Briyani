const express = require('express');
const router = express.Router();
const {
  getDashboardStats, getAllUsers, getAllOrders, updateOrderStatus,
  deleteUser, exportOrdersCSV, getRevenueReports, toggleMenuAvailability,
  updateUserRole, getInventoryAlerts, updateStock,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.get('/dashboard', protect, admin, getDashboardStats);
router.get('/users', protect, admin, getAllUsers);
router.get('/orders', protect, admin, getAllOrders);
router.put('/orders/:id/status', protect, admin, updateOrderStatus);
router.delete('/users/:id', protect, admin, deleteUser);
router.get('/export/orders', protect, admin, exportOrdersCSV);
router.get('/reports/revenue', protect, admin, getRevenueReports);
router.put('/menu/:id/toggle', protect, admin, toggleMenuAvailability);
router.put('/users/:id/role', protect, admin, updateUserRole);
router.get('/inventory/alerts', protect, admin, getInventoryAlerts);
router.put('/menu/:id/stock', protect, admin, updateStock);

module.exports = router;
