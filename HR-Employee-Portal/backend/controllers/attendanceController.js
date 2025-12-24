const db = require('../config/database');

const recordAttendance = (req, res) => {
  const { employeeId } = req.user;
  const { type } = req.body; // 'check_in' or 'check_out'
  
  const currentTime = new Date();
  const today = currentTime.toISOString().split('T')[0];

  if (type === 'check_in') {
    // Check if already checked in today
    const checkQuery = 'SELECT * FROM attendance WHERE employee_id = ? AND date = ?';
    db.query(checkQuery, [employeeId, today], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      
      if (results.length > 0) {
        return res.status(400).json({ message: 'Already checked in today' });
      }

      const insertQuery = 'INSERT INTO attendance (employee_id, check_in, date) VALUES (?, ?, ?)';
      db.query(insertQuery, [employeeId, currentTime, today], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json({ message: 'Checked in successfully', time: currentTime });
      });
    });
  } else if (type === 'check_out') {
    // Find today's check-in and update check-out
    const findQuery = 'SELECT * FROM attendance WHERE employee_id = ? AND date = ? AND check_out IS NULL';
    db.query(findQuery, [employeeId, today], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      
      if (results.length === 0) {
        return res.status(400).json({ message: 'No check-in found for today' });
      }

      const attendance = results[0];
      const checkInTime = new Date(attendance.check_in);
      const totalHours = ((currentTime - checkInTime) / (1000 * 60 * 60)).toFixed(2);

      const updateQuery = 'UPDATE attendance SET check_out = ?, total_hours = ? WHERE id = ?';
      db.query(updateQuery, [currentTime, totalHours, attendance.id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        res.json({ message: 'Checked out successfully', time: currentTime, totalHours });
      });
    });
  }
};

const getAttendance = (req, res) => {
  const { employeeId, role } = req.user;
  const { startDate, endDate } = req.query;

  let query = `
    SELECT a.*, e.first_name, e.last_name, e.employee_id 
    FROM attendance a 
    JOIN employees e ON a.employee_id = e.id 
    WHERE 1=1
  `;
  const params = [];

  if (role === 'employee') {
    query += ' AND a.employee_id = ?';
    params.push(employeeId);
  }

  if (startDate && endDate) {
    query += ' AND a.date BETWEEN ? AND ?';
    params.push(startDate, endDate);
  }

  query += ' ORDER BY a.date DESC LIMIT 100';

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(results);
  });
};

const getAttendanceSummary = (req, res) => {
  const { employeeId, role } = req.user;
  
  // Use employeeId from params if provided, otherwise from authenticated user
  const targetEmployeeId = req.params.employeeId || employeeId;

  let query = `
    SELECT 
      COUNT(*) as total_days,
      SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present_days,
      SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent_days,
      AVG(total_hours) as avg_hours
    FROM attendance 
    WHERE employee_id = ?
  `;

  // Authorization check
  if (role === 'employee' && targetEmployeeId != employeeId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  db.query(query, [targetEmployeeId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(results[0] || { total_days: 0, present_days: 0, absent_days: 0, avg_hours: 0 });
  });
};

module.exports = { recordAttendance, getAttendance, getAttendanceSummary };