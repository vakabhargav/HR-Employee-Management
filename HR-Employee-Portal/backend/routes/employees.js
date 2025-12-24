const express = require('express');
const { getAllEmployees, getEmployeeById, updateEmployee } = require('../controllers/employeeController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, getAllEmployees);
router.get('/:id', authenticateToken, getEmployeeById);
router.put('/:id', authenticateToken, updateEmployee);

module.exports = router;