const db = require('../config/database');

const createLeaveRequest = (req, res) => {
  const { employeeId } = req.user;
  const { leave_type, start_date, end_date, reason } = req.body;

  const query = `
    INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [employeeId, leave_type, start_date, end_date, reason], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.status(201).json({ message: 'Leave request submitted successfully' });
  });
};

const getLeaveRequests = (req, res) => {
  const { role, employeeId } = req.user;

  let query = `
    SELECT lr.*, e.first_name, e.last_name, e.department
    FROM leave_requests lr
    JOIN employees e ON lr.employee_id = e.id
  `;

  if (role === 'employee') {
    query += ' WHERE lr.employee_id = ?';
    db.query(query, [employeeId], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json(results);
    });
  } else if (role === 'manager') {
    query += ' WHERE e.department = (SELECT department FROM employees WHERE id = ?)';
    db.query(query, [employeeId], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json(results);
    });
  } else {
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json(results);
    });
  }
};

const updateLeaveStatus = (req, res) => {
  const { id } = req.params;
  const { status, comments } = req.body;
  const { employeeId } = req.user;

  const query = `
    UPDATE leave_requests 
    SET status = ?, approved_by = ?, comments = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.query(query, [status, employeeId, comments, id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'Leave request updated successfully' });
  });
};

module.exports = { createLeaveRequest, getLeaveRequests, updateLeaveStatus };