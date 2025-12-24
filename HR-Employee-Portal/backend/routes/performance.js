const express = require('express');
const { getPerformanceReviews, createPerformanceReview, updatePerformanceReview } = require('../controllers/performanceController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, getPerformanceReviews);
router.post('/', authenticateToken, authorizeRoles('hr', 'manager'), createPerformanceReview);
router.put('/:id', authenticateToken, authorizeRoles('hr', 'manager'), updatePerformanceReview);

module.exports = router;