# 🧪 Signup Feature Testing Guide

## Quick Start Testing

### 🎯 Access the Signup Page

**Option 1: From Login Page**
1. Click the preview button to open the app
2. Navigate to Login page (or it opens by default)
3. Look for "Don't have an account? **Create one now**" at the bottom
4. Click "**Create one now**" link

**Option 2: Direct URL**
- Visit: `http://localhost:3000/signup`

---

## ✅ Test Case 1: Successful Registration

### **Steps:**
1. **Step 1 - Basic Information:**
   - First Name: `Jane`
   - Last Name: `Smith`
   - Email: `jane.smith@company.com`
   - Phone: `+1 (555) 123-4567`
   - Click **Next →**

2. **Step 2 - Security:**
   - Password: `password123`
   - Confirm Password: `password123`
   - Click **Next →**

3. **Step 3 - Additional Details:**
   - Department: `Engineering` (select from dropdown)
   - Position: `Frontend Developer`
   - Date of Birth: `1995-05-15`
   - Address: `123 Tech Street, Silicon Valley, CA`
   - Click **Create Account**

### **Expected Result:**
```
✓ Success message appears: "Registration successful! Redirecting to login..."
✓ After 2 seconds, automatically redirects to login page
✓ User data saved in database
✓ Employee ID auto-generated (e.g., EMP123456)
```

---

## ❌ Test Case 2: Duplicate Email

### **Steps:**
1. Try to register with: `hr@company.com` (already exists)
2. Fill all other required fields correctly
3. Submit the form

### **Expected Result:**
```
⚠️ Error message: "User with this email already exists"
✗ Registration blocked
✗ No new record created
```

---

## ❌ Test Case 3: Password Mismatch

### **Steps:**
1. Fill Step 1 correctly, click Next
2. **Step 2:**
   - Password: `password123`
   - Confirm Password: `different456`
3. Try to click Next

### **Expected Result:**
```
⚠️ Error message: "Passwords do not match"
✗ Cannot proceed to Step 3
```

---

## ❌ Test Case 4: Missing Required Fields

### **Test 4A: Missing First Name**
- Leave First Name empty
- Try to click Next

**Expected:**
```
⚠️ Error: "First name is required"
```

### **Test 4B: Missing Email**
- Leave Email empty
- Try to click Next

**Expected:**
```
⚠️ Error: "Email is required"
```

### **Test 4C: Invalid Email Format**
- Email: `notanemail`
- Try to click Next

**Expected:**
```
⚠️ Error: "Please enter a valid email address"
```

---

## ❌ Test Case 5: Short Password

### **Steps:**
1. Fill Step 1 correctly
2. **Step 2:**
   - Password: `12345` (only 5 characters)
   - Confirm Password: `12345`
3. Try to click Next

### **Expected Result:**
```
⚠️ Error: "Password must be at least 6 characters long"
✗ Cannot proceed
```

---

## ✅ Test Case 6: Navigation Flow

### **Test 6A: Previous Button**
1. Complete Step 1, go to Step 2
2. Click **← Previous**

**Expected:**
```
✓ Returns to Step 1
✓ Previously entered data still present
✓ Progress indicator updates (Step 1 active)
```

### **Test 6B: Multi-Step Navigation**
1. Step 1 → Next → Step 2 → Next → Step 3
2. Click Previous → Back to Step 2
3. Click Previous → Back to Step 1

**Expected:**
```
✓ Smooth transitions
✓ Data persists
✓ Progress indicator accurate
```

---

## 🎨 Test Case 7: UI/UX Features

### **Test 7A: Password Toggle**
1. Enter password
2. Click the eye icon (👁️)

**Expected:**
```
✓ Password becomes visible
✓ Icon changes appearance
✓ Click again to hide
```

### **Test 7B: Progress Indicator**
1. Observe progress indicator at each step

**Expected:**
```
Step 1: ● ━━━ ○ ━━━ ○  (Circle 1 filled blue)
Step 2: ✓ ━━━ ● ━━━ ○  (Circle 1 green check, Circle 2 blue)
Step 3: ✓ ━━━ ✓ ━━━ ●  (Circles 1&2 green, Circle 3 blue)
```

### **Test 7C: Loading State**
1. Click Create Account
2. Observe button during submission

**Expected:**
```
✓ Button shows spinner: [◐ Creating Account...]
✓ Button is disabled during loading
✓ Cannot double-submit
```

---

## 📱 Test Case 8: Responsive Design

### **Test 8A: Desktop View (>1024px)**
**Expected:**
```
✓ Two-column layout visible
✓ Branding panel on left
✓ Form on right
✓ All features accessible
```

### **Test 8B: Tablet View (768-1024px)**
**Expected:**
```
✓ Single column layout
✓ Branding panel hidden
✓ Form centered
✓ All inputs full width
```

### **Test 8C: Mobile View (<640px)**
**Expected:**
```
✓ Compact single column
✓ Progress indicator smaller
✓ Form fields stack vertically
✓ Touch-friendly buttons
```

---

## 🔄 Test Case 9: Complete User Journey

### **Full Flow:**
```
1. Visit homepage → Click "Get Started"
2. See login page → Click "Create one now"
3. Fill signup form (all 3 steps)
4. Submit and see success
5. Redirect to login page
6. Login with new credentials
7. See personalized dashboard
```

**Expected:**
```
✓ Seamless flow with no errors
✓ User data properly saved
✓ Authentication works
✓ Dashboard shows correct user info
```

---

## 🔍 Test Case 10: Optional Fields

### **Steps:**
1. Fill only required fields:
   - First Name ✓
   - Last Name ✓
   - Email ✓
   - Password ✓
   - Confirm Password ✓
2. Skip all optional fields:
   - Phone (empty)
   - Department (not selected)
   - Position (empty)
   - DOB (empty)
   - Address (empty)
3. Submit

### **Expected Result:**
```
✓ Registration successful
✓ Optional fields stored as NULL in database
✓ User can add these later in profile
```

---

## 🎯 Backend API Testing

### **Using Postman/Thunder Client:**

**Endpoint:** `POST http://localhost:5000/api/auth/signup`

**Test Request 1: Success**
```json
{
  "firstName": "Test",
  "lastName": "User",
  "email": "test.user@company.com",
  "password": "testpass123",
  "confirmPassword": "testpass123",
  "phone": "+1 (555) 999-8888",
  "department": "Marketing",
  "position": "Marketing Manager",
  "dateOfBirth": "1988-03-20",
  "address": "456 Market St"
}
```

**Expected Response (201):**
```json
{
  "message": "Registration successful",
  "user": {
    "id": 5,
    "email": "test.user@company.com",
    "employeeId": "EMP789012",
    "firstName": "Test",
    "lastName": "User"
  }
}
```

**Test Request 2: Missing Fields**
```json
{
  "firstName": "Test",
  "email": "test@test.com"
}
```

**Expected Response (400):**
```json
{
  "message": "Please provide all required fields"
}
```

**Test Request 3: Duplicate Email**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "hr@company.com",
  "password": "password123"
}
```

**Expected Response (409):**
```json
{
  "message": "User with this email already exists"
}
```

---

## 💾 Database Verification

### **Check Users Table:**
```sql
SELECT * FROM users WHERE email = 'jane.smith@company.com';
```

**Expected:**
```
id | email                    | role     | is_active
4  | jane.smith@company.com   | employee | 1
```

### **Check Employees Table:**
```sql
SELECT * FROM employees WHERE email = 'jane.smith@company.com';
```

**Expected:**
```
id | user_id | employee_id | first_name | last_name | department
4  | 4       | EMP123456   | Jane       | Smith     | Engineering
```

---

## 🎨 Visual Regression Tests

### **Check These UI Elements:**
- [ ] Gradient background renders correctly
- [ ] Floating shapes animate smoothly
- [ ] Progress indicator shows correct state
- [ ] Form inputs have proper styling
- [ ] Buttons have hover effects
- [ ] Error alerts display properly
- [ ] Success alerts display properly
- [ ] Icons display next to inputs
- [ ] Font sizes are consistent
- [ ] Colors match design spec

---

## ⚡ Performance Tests

### **Test Loading Speed:**
1. Clear cache
2. Navigate to `/signup`
3. Measure load time

**Expected:**
```
✓ Page loads < 2 seconds
✓ No console errors
✓ Animations smooth (60fps)
```

### **Test Form Submission:**
1. Fill form
2. Click submit
3. Measure response time

**Expected:**
```
✓ API response < 1 second
✓ Success message appears immediately
✓ Redirect happens within 2 seconds
```

---

## 🔐 Security Tests

### **Test 1: SQL Injection Prevention**
Try special characters in fields:
```
Email: test'); DROP TABLE users;--@test.com
```
**Expected:** Properly escaped, no SQL injection

### **Test 2: XSS Prevention**
Try script tags:
```
First Name: <script>alert('xss')</script>
```
**Expected:** Rendered as text, not executed

---

## 📋 Accessibility Tests

### **Keyboard Navigation:**
1. Use only Tab key to navigate
2. Use Enter to submit

**Expected:**
```
✓ All fields reachable via keyboard
✓ Visual focus indicators visible
✓ Logical tab order
✓ Form submittable via Enter
```

### **Screen Reader:**
1. Use screen reader (NVDA/JAWS)
2. Navigate through form

**Expected:**
```
✓ Labels announced correctly
✓ Error messages read aloud
✓ Button states announced
✓ Field requirements clear
```

---

## 🎯 Quick Test Checklist

**Before Release:**
- [ ] Successful registration works
- [ ] Duplicate email blocked
- [ ] Password validation works
- [ ] Required fields enforced
- [ ] Optional fields work
- [ ] Navigation Previous/Next works
- [ ] Progress indicator accurate
- [ ] Loading states show
- [ ] Error messages clear
- [ ] Success flow complete
- [ ] Redirect to login works
- [ ] Mobile responsive
- [ ] Desktop layout correct
- [ ] No console errors
- [ ] Database records correct
- [ ] Login with new account works
- [ ] All animations smooth
- [ ] Accessibility pass
- [ ] Security checks pass

---

## 🐛 Known Edge Cases

### **Edge Case 1: Network Failure**
**Test:** Disconnect internet, submit form
**Expected:** Error message about server connection

### **Edge Case 2: Database Down**
**Test:** Stop MySQL, submit form
**Expected:** Graceful error handling

### **Edge Case 3: Very Long Input**
**Test:** Enter 1000 character first name
**Expected:** Database constraint handles it

### **Edge Case 4: Special Characters**
**Test:** Use émojis, ümlauts, 中文
**Expected:** UTF-8 properly handles all characters

---

## 📊 Test Results Template

```
Test Date: _______________
Tester: __________________
Browser: _________________
OS: ______________________

✓ PASSED | ✗ FAILED | ⚠️ WARNING

Test Case 1 (Success):        [ ]
Test Case 2 (Duplicate):      [ ]
Test Case 3 (Mismatch):       [ ]
Test Case 4 (Missing):        [ ]
Test Case 5 (Short Pass):     [ ]
Test Case 6 (Navigation):     [ ]
Test Case 7 (UI/UX):          [ ]
Test Case 8 (Responsive):     [ ]
Test Case 9 (Journey):        [ ]
Test Case 10 (Optional):      [ ]

Notes:
_________________________________
_________________________________
_________________________________
```

---

## 🎉 Success Criteria

**All tests passed when:**
- ✅ Users can register successfully
- ✅ Invalid data properly rejected
- ✅ UI is attractive and responsive
- ✅ Navigation is intuitive
- ✅ Data persists correctly
- ✅ No security vulnerabilities
- ✅ Accessible to all users
- ✅ Performance is acceptable
- ✅ Integration with login works

---

**Happy Testing! 🚀**
