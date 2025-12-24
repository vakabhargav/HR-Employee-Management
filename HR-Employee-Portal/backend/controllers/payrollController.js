const db = require('../config/database');

const getPayroll = (req, res) => {
  const { employeeId, role } = req.user;

  let query = `
    SELECT p.*, e.first_name, e.last_name, e.employee_id, e.department
    FROM payroll p
    JOIN employees e ON p.employee_id = e.id
    WHERE 1=1
  `;
  const params = [];

  if (role === 'employee') {
    query += ' AND p.employee_id = ?';
    params.push(employeeId);
  } else if (role === 'manager') {
    query += ' AND e.department = (SELECT department FROM employees WHERE id = ?)';
    params.push(employeeId);
  }

  query += ' ORDER BY p.payroll_month DESC';

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(results);
  });
};

const generatePayroll = (req, res) => {
  const { month, employees } = req.body;

  // Convert month to proper DATE format (e.g., '2024-01-01')
  const payrollMonth = `${month}-01`;

  const queries = employees.map(emp => {
    const { employee_id, basic_salary, allowances, deductions, overtime, bonus } = emp;
    const tax = basic_salary * 0.1; // Simplified tax calculation
    const net_salary = basic_salary + allowances + overtime + bonus - deductions - tax;

    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO payroll (employee_id, payroll_month, basic_salary, allowances, deductions, overtime, bonus, tax, net_salary, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
      `;
      db.query(query, [employee_id, payrollMonth, basic_salary, allowances, deductions, overtime, bonus, tax, net_salary], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  });

  Promise.all(queries)
    .then(() => res.json({ message: 'Payroll generated successfully' }))
    .catch(err => res.status(500).json({ message: 'Database error' }));
};

const getPayslip = (req, res) => {
  const { id } = req.params;
  const { employeeId, role } = req.user;

  const query = `
    SELECT p.*, e.*, u.email
    FROM payroll p
    JOIN employees e ON p.employee_id = e.id
    JOIN users u ON e.user_id = u.id
    WHERE p.id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Payslip not found' });
    }

    const payslip = results[0];

    // Authorization check
    if (role === 'employee' && payslip.employee_id != employeeId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(payslip);
  });
};

module.exports = { getPayroll, generatePayroll, getPayslip };