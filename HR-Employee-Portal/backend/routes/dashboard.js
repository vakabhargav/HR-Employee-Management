const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { getHRStats, getManagerStats, getEmployeeStats, getActivities } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/hr-stats', authenticateToken, authorizeRoles('hr'), getHRStats);
router.get('/manager-stats', authenticateToken, authorizeRoles('manager', 'hr'), getManagerStats);
router.get('/employee-stats', authenticateToken, getEmployeeStats);
router.get('/activities', authenticateToken, getActivities);

module.exports = router;







