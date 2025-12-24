const express = require('express');
const { getPayroll, generatePayroll, getPayslip } = require('../controllers/payrollController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, getPayroll);
router.post('/generate', authenticateToken, authorizeRoles('hr'), generatePayroll);
router.get('/:id/payslip', authenticateToken, getPayslip);

module.exports = router;