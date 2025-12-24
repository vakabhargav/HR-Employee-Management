const express = require('express');
const { 
  createLeaveRequest, 
  getLeaveRequests, 
  updateLeaveStatus 
} = require('../controllers/leaveController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticateToken, createLeaveRequest);
router.get('/', authenticateToken, getLeaveRequests);
router.put('/:id/status', authenticateToken, authorizeRoles('hr', 'manager'), updateLeaveStatus);

module.exports = router;