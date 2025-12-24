const db = require('../config/database');

const getAllEmployees = (req, res) => {
  const { role, employeeId } = req.user;
  
  let query = `
    SELECT e.*, u.role, m.first_name as manager_first_name, m.last_name as manager_last_name
    FROM employees e
    LEFT JOIN users u ON e.user_id = u.id
    LEFT JOIN employees m ON e.manager_id = m.id
    WHERE u.is_active = TRUE
  `;

  // Managers can only see employees in their department
  if (role === 'manager') {
    query += ` AND e.department = (SELECT department FROM employees WHERE id = ?)`;
    db.query(query, [employeeId], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json(results);
    });
  } else if (role === 'employee') {
    // Employees can only see their own profile
    query += ` AND e.id = ?`;
    db.query(query, [employeeId], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json(results);
    });
  } else {
    // HR can see all employees
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json(results);
    });
  }
};

const getEmployeeById = (req, res) => {
  const { id } = req.params;
  const { role, employeeId } = req.user;

  const query = `
    SELECT e.*, u.role, m.first_name as manager_first_name, m.last_name as manager_last_name
    FROM employees e
    LEFT JOIN users u ON e.user_id = u.id
    LEFT JOIN employees m ON e.manager_id = m.id
    WHERE e.id = ? AND u.is_active = TRUE
  `;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const employee = results[0];

    // Authorization check
    if (role === 'employee' && employee.id != employeeId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(employee);
  });
};

const updateEmployee = (req, res) => {
  const { id } = req.params;
  const { role, employeeId } = req.user;
  const updateData = req.body;

  // Authorization check
  if (role === 'employee' && id != employeeId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  const allowedFields = ['phone', 'address', 'emergency_contact'];
  const filteredData = {};
  
  allowedFields.forEach(field => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  if (Object.keys(filteredData).length === 0) {
    return res.status(400).json({ message: 'No valid fields to update' });
  }

  const query = 'UPDATE employees SET ? WHERE id = ?';
  
  db.query(query, [filteredData, id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'Employee updated successfully' });
  });
};

module.exports = { getAllEmployees, getEmployeeById, updateEmployee };