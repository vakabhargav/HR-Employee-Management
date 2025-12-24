const db = require('../config/database');

const getHRStats = (req, res) => {
  const stats = {};
  const queries = {
    totalEmployees: 'SELECT COUNT(*) as count FROM employees',
    departments: 'SELECT department, COUNT(*) as count FROM employees GROUP BY department',
    openLeaves: "SELECT COUNT(*) as count FROM leave_requests WHERE status = 'pending'",
    payrollThisMonth: 'SELECT COUNT(*) as count FROM payroll WHERE MONTH(payslip_date) = MONTH(CURDATE()) AND YEAR(payslip_date) = YEAR(CURDATE())'
  };

  db.query(queries.totalEmployees, (err, r1) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    stats.totalEmployees = r1[0]?.count || 0;
    db.query(queries.departments, (err2, r2) => {
      if (err2) return res.status(500).json({ message: 'Database error' });
      stats.byDepartment = r2 || [];
      db.query(queries.openLeaves, (err3, r3) => {
        if (err3) return res.status(500).json({ message: 'Database error' });
        stats.openLeaves = r3[0]?.count || 0;
        db.query(queries.payrollThisMonth, (err4, r4) => {
          if (err4) return res.status(500).json({ message: 'Database error' });
          stats.payrollThisMonth = r4[0]?.count || 0;
          return res.json(stats);
        });
      });
    });
  });
};

const getManagerStats = (req, res) => {
  const { employeeId } = req.user;
  const stats = {};
  const deptQuery = 'SELECT department FROM employees WHERE id = ?';
  db.query(deptQuery, [employeeId], (e, r) => {
    if (e) return res.status(500).json({ message: 'Database error' });
    const department = r[0]?.department;
    if (!department) return res.json({});
    const queries = {
      teamSize: 'SELECT COUNT(*) as count FROM employees WHERE department = ?',
      pendingLeaves: "SELECT COUNT(*) as count FROM leave_requests lr JOIN employees e ON lr.employee_id = e.id WHERE lr.status = 'pending' AND e.department = ?",
      performanceReviews: 'SELECT COUNT(*) as count FROM performance_reviews pr JOIN employees e ON pr.employee_id = e.id WHERE e.department = ? AND MONTH(pr.review_date) = MONTH(CURDATE()) AND YEAR(pr.review_date) = YEAR(CURDATE())'
    };
    db.query(queries.teamSize, [department], (e1, r1) => {
      if (e1) return res.status(500).json({ message: 'Database error' });
      stats.teamSize = r1[0]?.count || 0;
      db.query(queries.pendingLeaves, [department], (e2, r2) => {
        if (e2) return res.status(500).json({ message: 'Database error' });
        stats.pendingLeaves = r2[0]?.count || 0;
        db.query(queries.performanceReviews, [department], (e3, r3) => {
          if (e3) return res.status(500).json({ message: 'Database error' });
          stats.reviewsThisMonth = r3[0]?.count || 0;
          return res.json(stats);
        });
      });
    });
  });
};

const getEmployeeStats = (req, res) => {
  const { employeeId } = req.user;
  const stats = {};
  const attendanceQuery = `
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present
    FROM attendance WHERE employee_id = ? AND MONTH(date) = MONTH(CURDATE()) AND YEAR(date) = YEAR(CURDATE())`;
  const leaveQuery = `SELECT COUNT(*) as count FROM leave_requests WHERE employee_id = ? AND status = 'approved' AND YEAR(start_date) = YEAR(CURDATE())`;
  const performanceQuery = `SELECT AVG(rating) as rating FROM performance_reviews WHERE employee_id = ? AND YEAR(review_date) = YEAR(CURDATE())`;

  db.query(attendanceQuery, [employeeId], (e1, r1) => {
    if (e1) return res.status(500).json({ message: 'Database error' });
    stats.attendance = r1[0] || { total: 0, present: 0 };
    db.query(leaveQuery, [employeeId], (e2, r2) => {
      if (e2) return res.status(500).json({ message: 'Database error' });
      stats.approvedLeaves = r2[0]?.count || 0;
      db.query(performanceQuery, [employeeId], (e3, r3) => {
        if (e3) return res.status(500).json({ message: 'Database error' });
        stats.avgRating = r3[0]?.rating || 0;
        return res.json(stats);
      });
    });
  });
};

const getActivities = (req, res) => {
  const query = `
    SELECT 'leave' as type, id, employee_id, created_at as date FROM leave_requests ORDER BY created_at DESC LIMIT 10
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    return res.json(results || []);
  });
};

module.exports = { getHRStats, getManagerStats, getEmployeeStats, getActivities };







