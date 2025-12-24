const express = require('express');
const { recordAttendance, getAttendance, getAttendanceSummary } = require('../controllers/attendanceController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/record', authenticateToken, recordAttendance);
router.get('/', authenticateToken, getAttendance);
router.get('/summary/:employeeId', authenticateToken, getAttendanceSummary);
router.get('/summary', authenticateToken, getAttendanceSummary); // Add separate route for no employeeId

module.exports = router;