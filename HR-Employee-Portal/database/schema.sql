-- Create database
CREATE DATABASE IF NOT EXISTS hr_management;
USE hr_management;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('hr', 'manager', 'employee') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Employees table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    department VARCHAR(100),
    position VARCHAR(100),
    salary DECIMAL(10,2),
    hire_date DATE,
    address TEXT,
    date_of_birth DATE,
    emergency_contact VARCHAR(255),
    profile_picture VARCHAR(255),
    manager_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Attendance table
CREATE TABLE attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    check_in TIMESTAMP,
    check_out TIMESTAMP,
    date DATE NOT NULL,
    total_hours DECIMAL(4,2),
    status ENUM('present', 'absent', 'late', 'half_day') DEFAULT 'present',
    notes TEXT,
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leave requests table
CREATE TABLE leave_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    leave_type ENUM('sick', 'vacation', 'personal', 'maternity', 'paternity') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    approved_by INT,
    comments TEXT,
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (approved_by) REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Payroll table
CREATE TABLE payroll (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    payroll_month DATE NOT NULL, -- Changed from YEAR_MONTH to DATE
    basic_salary DECIMAL(10,2),
    allowances DECIMAL(10,2) DEFAULT 0,
    deductions DECIMAL(10,2) DEFAULT 0,
    overtime DECIMAL(10,2) DEFAULT 0,
    bonus DECIMAL(10,2) DEFAULT 0,
    tax DECIMAL(10,2) DEFAULT 0,
    net_salary DECIMAL(10,2),
    payment_date DATE,
    status ENUM('pending', 'paid') DEFAULT 'pending',
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance reviews table
CREATE TABLE performance_reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    reviewer_id INT,
    review_date DATE NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comments TEXT,
    goals TEXT,
    achievements TEXT,
    areas_for_improvement TEXT,
    status ENUM('draft', 'completed') DEFAULT 'draft',
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (reviewer_id) REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (email, password, role) VALUES 
('hr@company.com', '$2b$10$exampleHash', 'hr'),
('manager@company.com', '$2b$10$exampleHash', 'manager'),
('employee@company.com', '$2b$10$exampleHash', 'employee');

INSERT INTO employees (user_id, employee_id, first_name, last_name, email, department, position, salary, hire_date) VALUES
(1, 'HR001', 'John', 'Smith', 'hr@company.com', 'HR', 'HR Manager', 75000, '2023-01-15'),
(2, 'MGR001', 'Sarah', 'Johnson', 'manager@company.com', 'Engineering', 'Project Manager', 65000, '2023-02-20'),
(3, 'EMP001', 'Mike', 'Davis', 'employee@company.com', 'Engineering', 'Software Developer', 55000, '2023-03-10');

-- Insert sample attendance records
INSERT INTO attendance (employee_id, check_in, check_out, date, total_hours, status) VALUES
(3, '2024-01-15 09:00:00', '2024-01-15 17:00:00', '2024-01-15', 8.0, 'present'),
(3, '2024-01-16 09:15:00', '2024-01-16 17:00:00', '2024-01-16', 7.75, 'present'),
(3, '2024-01-17 09:00:00', '2024-01-17 17:00:00', '2024-01-17', 8.0, 'present');

-- Insert sample leave requests
INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason, status) VALUES
(3, 'vacation', '2024-02-01', '2024-02-05', 'Family vacation', 'pending');

-- Insert sample payroll records
INSERT INTO payroll (employee_id, payroll_month, basic_salary, allowances, deductions, overtime, bonus, tax, net_salary, status) VALUES
(3, '2024-01-01', 55000, 2000, 1500, 500, 1000, 5500, 55000 + 2000 - 1500 + 500 + 1000 - 5500, 'paid');

-- Insert sample performance reviews
INSERT INTO performance_reviews (employee_id, reviewer_id, review_date, rating, comments, status) VALUES
(3, 2, '2024-01-10', 4, 'Excellent performance this quarter', 'completed');