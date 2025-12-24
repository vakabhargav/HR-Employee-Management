# HR Employee Portal - Setup & Run Guide

## 🔧 Prerequisites

Before running the application, ensure you have:

- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **npm** or **yarn**

## 📦 Installation Steps

### 1. Database Setup

First, set up the MySQL database:

```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
source database/schema.sql

# Or manually create the database
CREATE DATABASE IF NOT EXISTS hr_management;
USE hr_management;
# Then run the contents of database/schema.sql
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Verify .env file exists with correct configuration
# The file should contain:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password_here
# DB_NAME=hr_management
# JWT_SECRET=your-jwt-secret-key-change-this-in-production
# PORT=5000

# Update DB_PASSWORD in .env with your MySQL password

# Start the backend server
npm run dev
# or for production
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## 🚀 Running the Application

### Method 1: Manual Start (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Method 2: Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder with a static server
```

## 👥 Demo Accounts

The application comes with pre-configured demo accounts:

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| HR Manager | hr@company.com | password | Full access to all features |
| Manager | manager@company.com | password | Department-level access |
| Employee | employee@company.com | password | Personal profile access |

## 🔍 Troubleshooting

### Error: "undefined" is not valid JSON
**Solution:** This has been fixed in the latest update. Clear your browser's localStorage:
```javascript
// Open browser console and run:
localStorage.clear();
// Then refresh the page
```

### Error: Cannot connect to database
**Solutions:**
1. Ensure MySQL is running
2. Verify database credentials in `.env` file
3. Check if `hr_management` database exists
4. Verify MySQL user has proper permissions

### Error: Port 5000 already in use
**Solution:** Either:
1. Stop the process using port 5000
2. Change PORT in backend `.env` file
3. Update API_BASE_URL in `frontend/src/services/api.js`

### Error: Module not found
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Backend not responding
**Check:**
1. Backend server is running (check Terminal 1)
2. Database connection is successful
3. No errors in backend console
4. Backend URL in frontend is correct (`http://localhost:5000/api`)

## 📱 Application Features

### Home Page (/)
- Professional landing page
- Features showcase
- Demo account information
- Call-to-action buttons

### Login Page (/login)
- Split-screen design
- Password visibility toggle
- Remember me option
- Quick login for demo accounts
- Form validation

### Dashboard (/dashboard)
- Role-based dashboards (HR, Manager, Employee)
- Statistics and metrics
- Quick actions
- Recent activities

### Employee Management (/employees)
- Employee directory
- CRUD operations
- Profile management
- Department organization

### Attendance Tracking (/attendance)
- Clock in/out
- Attendance history
- Summary statistics

### Leave Management (/leave)
- Submit leave requests
- Approve/reject requests
- Leave balance tracking

### Payroll (/payroll, /payslips)
- Salary processing
- Payslip generation
- Tax calculations

### Performance Reviews (/performance)
- Review submissions
- Performance tracking
- Goal management

## 🎨 Key Features Implemented

### Frontend:
✅ Modern, responsive UI with glassmorphism effects
✅ Smooth animations and transitions
✅ Professional color scheme and typography
✅ Mobile-friendly design
✅ Loading states and error handling
✅ Protected routes with role-based access
✅ Context API for state management
✅ React Query for server state

### Backend:
✅ RESTful API architecture
✅ JWT authentication
✅ Role-based authorization
✅ Input validation
✅ Error handling middleware
✅ CORS configuration
✅ MySQL database integration

## 📊 Technology Stack

### Frontend:
- React 19.2.0
- React Router DOM 7.9.4
- React Query (TanStack Query) 5.90.2
- Axios 1.12.2
- Material-UI 7.3.4
- Chart.js 4.5.0
- Styled Components 6.1.19

### Backend:
- Node.js
- Express 5.1.0
- MySQL2 3.15.2
- JWT (jsonwebtoken 9.0.2)
- bcryptjs 3.0.2
- Express Validator 7.2.1
- CORS 2.8.5

## 🔐 Security Notes

1. **Change JWT Secret:** Update `JWT_SECRET` in `.env` before production
2. **Database Password:** Never commit `.env` file to version control
3. **CORS:** Configure allowed origins in production
4. **HTTPS:** Use HTTPS in production
5. **Input Validation:** All inputs are validated on backend

## 📝 Next Steps

1. Start both backend and frontend servers
2. Visit `http://localhost:3000`
3. Explore the home page
4. Click "Get Started" or navigate to Login
5. Use demo credentials to test different roles
6. Explore all features

## 🆘 Support

If you encounter any issues:

1. Check console for error messages
2. Verify all prerequisites are installed
3. Ensure database is properly configured
4. Clear browser cache and localStorage
5. Restart both servers

## 🎉 Enjoy Your HR Portal!

The application is now fully set up with a professional UI/UX. All features are working and ready to use!
