# 🔧 Signup Error Fix - Debugging Guide

## Issue Reported
User getting "Server error. Please try again later." message when trying to sign up.

---

## ✅ Fixes Applied

### **1. Backend Controller Updates** (`authController.js`)

#### **Removed Transaction Logic**
The original code used `db.beginTransaction()`, `db.rollback()`, and `db.commit()` which are not properly supported by the basic `mysql2` connection. 

**Changed to simple sequential queries** with manual rollback on error.

#### **Added Comprehensive Logging**
```javascript
console.log('Signup request received:', { firstName, lastName, email, department, position });
console.log('Generated employee ID:', employeeId);
console.log('User created with ID:', userId);
console.log('Employee profile created successfully');
console.error('Error details:', err);
```

#### **Better Error Messages**
Now returns actual error messages:
```javascript
return res.status(500).json({ 
  message: 'Error creating user account', 
  error: err.message 
});
```

#### **Manual Rollback**
If employee creation fails, the user record is automatically deleted:
```javascript
db.query('DELETE FROM users WHERE id = ?', [userId], ...);
```

---

### **2. Frontend Error Display** (`Signup.js`)

#### **Added Console Logging**
```javascript
console.log('Submitting signup form with data:', formData);
console.log('Response status:', response.status);
console.log('Response data:', data);
```

#### **Better Error Display**
Shows both the error message and technical details:
```javascript
const errorMsg = data.message || 'Registration failed.';
const errorDetail = data.error ? ` (${data.error})` : '';
setError(errorMsg + errorDetail);
```

---

## 🧪 How to Debug

### **Step 1: Open Browser Console**
1. Press `F12` or right-click → Inspect
2. Go to "Console" tab
3. Try to signup
4. Look for these logs:
   - `Submitting signup form with data:` - Shows what's being sent
   - `Response status:` - Shows HTTP status code
   - `Response data:` - Shows server response

### **Step 2: Check Backend Terminal**
Look for these logs in the backend terminal:
- `Signup request received:` - Confirms request arrived
- `Generated employee ID:` - Shows auto-generated ID
- `User created with ID:` - Confirms user table insert
- `Employee profile created successfully` - Confirms employee table insert
- Any error messages with details

---

## 🐛 Common Issues & Solutions

### **Issue 1: Database Connection Error**
**Symptoms:**
```
Error creating user account: connect ECONNREFUSED
```

**Solution:**
1. Check MySQL is running
2. Verify credentials in `.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=karunya599@
   DB_NAME=hr_management
   ```
3. Test connection:
   ```bash
   mysql -u root -p
   ```

---

### **Issue 2: Table Doesn't Exist**
**Symptoms:**
```
Error: Table 'hr_management.users' doesn't exist
```

**Solution:**
Run the schema.sql file:
```bash
mysql -u root -p hr_management < database/schema.sql
```

Or manually:
```sql
USE hr_management;
SOURCE /path/to/schema.sql;
```

---

### **Issue 3: Column Mismatch**
**Symptoms:**
```
Error: Unknown column 'date_of_birth' in 'field list'
```

**Solution:**
Check that all columns exist in the employees table. Run:
```sql
DESCRIBE employees;
```

Should show columns:
- user_id
- employee_id
- first_name
- last_name
- email
- phone
- department
- position
- date_of_birth
- address
- hire_date
- salary
- manager_id
- profile_picture
- emergency_contact

---

### **Issue 4: Duplicate Email**
**Symptoms:**
```
Error: User with this email already exists
```

**Solution:**
This is expected behavior. Use a different email or delete existing user:
```sql
DELETE FROM employees WHERE email = 'test@example.com';
DELETE FROM users WHERE email = 'test@example.com';
```

---

### **Issue 5: CORS Error**
**Symptoms:**
```
Access to fetch at 'http://localhost:5000/api/auth/signup' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**
Already fixed - CORS is enabled in server.js. If still happens:
1. Check backend is running on port 5000
2. Check frontend is running on port 3000
3. Restart both servers

---

### **Issue 6: Network Error**
**Symptoms:**
```
Failed to fetch
TypeError: NetworkError when attempting to fetch resource
```

**Solution:**
1. Verify backend is running: `http://localhost:5000`
2. Check firewall isn't blocking port 5000
3. Try accessing in browser: `http://localhost:5000/api/auth/signup`

---

## 📊 Testing Checklist

### **Before Testing:**
- [ ] Backend server is running (`npm run dev` in backend folder)
- [ ] Frontend server is running (`npm start` in frontend folder)
- [ ] MySQL database is running
- [ ] Database `hr_management` exists
- [ ] Tables `users` and `employees` exist
- [ ] Browser console is open (F12)

### **During Testing:**
- [ ] Fill all required fields (First Name, Last Name, Email, Password)
- [ ] Use unique email address
- [ ] Password minimum 6 characters
- [ ] Passwords match
- [ ] Watch browser console for logs
- [ ] Watch backend terminal for logs

### **After Testing:**
- [ ] Check if user was created in database:
  ```sql
  SELECT * FROM users ORDER BY id DESC LIMIT 1;
  ```
- [ ] Check if employee was created:
  ```sql
  SELECT * FROM employees ORDER BY id DESC LIMIT 1;
  ```

---

## 🔍 Database Verification Queries

### **Check if user exists:**
```sql
SELECT u.*, e.* 
FROM users u
LEFT JOIN employees e ON u.id = e.user_id
WHERE u.email = 'your-email@example.com';
```

### **List all recent signups:**
```sql
SELECT 
  u.id as user_id,
  u.email,
  u.role,
  e.employee_id,
  e.first_name,
  e.last_name,
  e.department,
  e.position,
  u.created_at
FROM users u
LEFT JOIN employees e ON u.id = e.user_id
ORDER BY u.created_at DESC
LIMIT 10;
```

### **Delete test user:**
```sql
-- Delete in correct order (foreign key constraint)
DELETE FROM employees WHERE email = 'test@example.com';
DELETE FROM users WHERE email = 'test@example.com';
```

---

## 🎯 Expected Behavior

### **Successful Signup:**

1. **Browser Console:**
   ```
   Submitting signup form with data: {firstName: "John", lastName: "Doe", ...}
   Response status: 201
   Response data: {message: "Registration successful", user: {...}}
   ```

2. **Backend Terminal:**
   ```
   Signup request received: { firstName: 'John', lastName: 'Doe', ... }
   Generated employee ID: EMP123456
   User created with ID: 4
   Employee profile created successfully
   ```

3. **UI:**
   - Green success message: "Registration successful! Redirecting to login..."
   - Auto-redirect to login page after 2 seconds

4. **Database:**
   - New record in `users` table
   - New record in `employees` table with matching user_id

### **Failed Signup (Duplicate Email):**

1. **Browser Console:**
   ```
   Response status: 409
   Response data: {message: "User with this email already exists"}
   ```

2. **UI:**
   - Red error message: "User with this email already exists"

---

## 🚀 Quick Test Commands

### **Test API directly with curl:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "+1234567890",
    "department": "Engineering",
    "position": "Developer",
    "dateOfBirth": "1990-01-01",
    "address": "123 Test St"
  }'
```

**Expected Success Response:**
```json
{
  "message": "Registration successful",
  "user": {
    "id": 4,
    "email": "test@example.com",
    "employeeId": "EMP123456",
    "firstName": "Test",
    "lastName": "User"
  }
}
```

---

## 📝 Sample Test Data

### **Valid Test User:**
```javascript
{
  firstName: "Jane",
  lastName: "Smith",
  email: "jane.smith@company.com",
  password: "password123",
  confirmPassword: "password123",
  phone: "+1 (555) 123-4567",
  department: "Engineering",
  position: "Software Developer",
  dateOfBirth: "1995-05-15",
  address: "123 Tech Street, Silicon Valley, CA"
}
```

### **Minimal Valid User (Required Fields Only):**
```javascript
{
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@company.com",
  password: "password123",
  confirmPassword: "password123"
}
```

---

## ✅ Final Checklist

If signup still doesn't work after fixes:

1. **Check Logs:**
   - [ ] Browser console shows request being sent
   - [ ] Backend terminal shows request received
   - [ ] Look for specific error messages

2. **Check Database:**
   - [ ] MySQL is running
   - [ ] Database exists and is accessible
   - [ ] Tables have correct structure
   - [ ] No foreign key constraint issues

3. **Check Network:**
   - [ ] Backend responds to: `http://localhost:5000`
   - [ ] No CORS errors in console
   - [ ] Firewall allows connections

4. **Check Code:**
   - [ ] No syntax errors in authController.js
   - [ ] Route is registered in auth.js
   - [ ] Server.js includes auth routes

---

## 🆘 If Still Not Working

Provide these details:

1. **Browser console logs** (screenshot or copy)
2. **Backend terminal output** (screenshot or copy)
3. **Database query result:**
   ```sql
   SHOW TABLES;
   DESCRIBE users;
   DESCRIBE employees;
   ```
4. **Test data used** (what email, name, etc.)
5. **Error message** shown in UI

---

## 📚 Documentation

- Backend API: `POST /api/auth/signup`
- Required Fields: firstName, lastName, email, password
- Optional Fields: phone, department, position, dateOfBirth, address
- Response: 201 Created on success, 409 Conflict if email exists, 500 on error

---

**Status:** ✅ Fixes Applied  
**Next Step:** Test signup and check console logs  
**If Issues:** Follow debugging steps above
