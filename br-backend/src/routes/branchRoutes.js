const express = require('express');
const router = express.Router();
const { getBranches, getAllBranches, createBranch, updateBranch, deleteBranch } = require('../controllers/branchController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.get('/', getBranches);
router.get('/all', protect, admin, getAllBranches);
router.post('/', protect, admin, createBranch);
router.put('/:id', protect, admin, updateBranch);
router.delete('/:id', protect, admin, deleteBranch);

module.exports = router;
