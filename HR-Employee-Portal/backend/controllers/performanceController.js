const db = require('../config/database');

const getPerformanceReviews = (req, res) => {
  const { employeeId, role } = req.user;

  let query = `
    SELECT pr.*, 
           e.first_name as employee_first_name, 
           e.last_name as employee_last_name,
           r.first_name as reviewer_first_name,
           r.last_name as reviewer_last_name
    FROM performance_reviews pr
    JOIN employees e ON pr.employee_id = e.id
    LEFT JOIN employees r ON pr.reviewer_id = r.id
    WHERE 1=1
  `;
  const params = [];

  if (role === 'employee') {
    query += ' AND pr.employee_id = ?';
    params.push(employeeId);
  } else if (role === 'manager') {
    query += ' AND e.department = (SELECT department FROM employees WHERE id = ?)';
    params.push(employeeId);
  }

  query += ' ORDER BY pr.review_date DESC';

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(results);
  });
};

const createPerformanceReview = (req, res) => {
  const { reviewerId } = req.user;
  const { employee_id, review_date, rating, comments, goals, achievements, areas_for_improvement } = req.body;

  const query = `
    INSERT INTO performance_reviews (employee_id, reviewer_id, review_date, rating, comments, goals, achievements, areas_for_improvement)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [employee_id, reviewerId, review_date, rating, comments, goals, achievements, areas_for_improvement], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.status(201).json({ message: 'Performance review created successfully' });
  });
};

const updatePerformanceReview = (req, res) => {
  const { id } = req.params;
  const { rating, comments, goals, achievements, areas_for_improvement, status } = req.body;

  const query = `
    UPDATE performance_reviews 
    SET rating = ?, comments = ?, goals = ?, achievements = ?, areas_for_improvement = ?, status = ?
    WHERE id = ?
  `;

  db.query(query, [rating, comments, goals, achievements, areas_for_improvement, status, id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json({ message: 'Performance review updated successfully' });
  });
};

module.exports = { getPerformanceReviews, createPerformanceReview, updatePerformanceReview };