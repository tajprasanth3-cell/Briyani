const express = require('express');
const router = express.Router();
const { bulkImportMenuItems } = require('../controllers/bulkImportController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.post('/menu', protect, admin, bulkImportMenuItems);

module.exports = router;
