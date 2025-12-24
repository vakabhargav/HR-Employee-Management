const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const login = (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt for:', email);

  // Validation
  if (!email || !password) {
    console.log('Login failed: Missing email or password');
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const query = `
    SELECT u.*, e.id as employee_id, e.first_name, e.last_name, e.department, e.position 
    FROM users u 
    LEFT JOIN employees e ON u.id = e.user_id 
    WHERE u.email = ? AND u.is_active = TRUE
  `;

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Database error during login:', err);
      return res.status(500).json({ message: 'Database error', error: err.message });
    }

    console.log('Query results:', results.length > 0 ? 'User found' : 'No user found');

    if (results.length === 0) {
      console.log('Login failed: Invalid email');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    console.log('User found:', { id: user.id, email: user.email, role: user.role });

    // Compare provided password with stored hash
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      console.log('Login failed: Invalid password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('Login successful for:', email);

    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role,
        employeeId: user.employee_id 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        department: user.department,
        position: user.position,
        employeeId: user.employee_id
      }
    });
  });
};

const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      department,
      position,
      dateOfBirth,
      address,
      role
    } = req.body;

    console.log('Signup request received:', { firstName, lastName, email, department, position });

    // Validation
    if (!firstName || !lastName || !email || !password) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed: Invalid email format');
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Validate role
    const allowedRoles = ['employee', 'manager', 'hr'];
    const normalizedRole = (role || 'employee').toString().trim().toLowerCase();
    if (!allowedRoles.includes(normalizedRole)) {
      console.log('Validation failed: Invalid role');
      return res.status(400).json({ message: 'Invalid role. Allowed: employee, manager, hr' });
    }

    // Check if user already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    
    db.query(checkQuery, [email], async (err, results) => {
      if (err) {
        console.error('Database error checking existing user:', err);
        return res.status(500).json({ message: 'Database error', error: err.message });
      }

      if (results.length > 0) {
        console.log('User already exists:', email);
        return res.status(409).json({ message: 'User with this email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate employee ID
      const employeeId = 'EMP' + Date.now().toString().slice(-6);
      console.log('Generated employee ID:', employeeId);

      // Insert user first
      const insertUserQuery = `
        INSERT INTO users (email, password, role, is_active)
        VALUES (?, ?, ?, TRUE)
      `;

      db.query(insertUserQuery, [email, hashedPassword, normalizedRole], (err, userResult) => {
        if (err) {
          console.error('Error creating user account:', err);
          return res.status(500).json({ message: 'Error creating user account', error: err.message });
        }

        const userId = userResult.insertId;
        console.log('User created with ID:', userId);

        // Prepare employee data with proper null handling
        const employeeData = [
          userId,
          employeeId,
          firstName.trim(),
          lastName.trim(),
          email.trim(),
          phone ? phone.trim() : null,
          department ? department.trim() : null,
          position ? position.trim() : null,
          dateOfBirth || null,
          address ? address.trim() : null
        ];

        // Insert employee
        const insertEmployeeQuery = `
          INSERT INTO employees (
            user_id,
            employee_id,
            first_name,
            last_name,
            email,
            phone,
            department,
            position,
            date_of_birth,
            address,
            hire_date
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())
        `;

        console.log('Inserting employee with data:', employeeData);

        db.query(insertEmployeeQuery, employeeData, (err, employeeResult) => {
          if (err) {
            console.error('Error creating employee profile:', err);
            console.error('SQL Error Details:', {
              code: err.code,
              sqlMessage: err.sqlMessage,
              sql: err.sql
            });
            
            // Try to delete the user if employee creation fails
            db.query('DELETE FROM users WHERE id = ?', [userId], (deleteErr) => {
              if (deleteErr) {
                console.error('Error rolling back user creation:', deleteErr);
              }
            });
            
            return res.status(500).json({ 
              message: 'Error creating employee profile', 
              error: err.sqlMessage || err.message 
            });
          }

          console.log('Employee profile created successfully with ID:', employeeResult.insertId);
          res.status(201).json({
            message: 'Registration successful',
            user: {
              id: userId,
              email: email,
              employeeId: employeeId,
              firstName: firstName,
              lastName: lastName
            }
          });
        });
      });
    });
  } catch (err) {
    console.error('Unexpected error in signup:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { login, signup };