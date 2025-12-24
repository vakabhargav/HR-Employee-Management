const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true
});

console.log('🔍 Database Verification Script\n');
console.log('Configuration:');
console.log('- Host:', process.env.DB_HOST || 'localhost');
console.log('- User:', process.env.DB_USER || 'root');
console.log('- Database:', process.env.DB_NAME || 'hr_management');
console.log('\n' + '='.repeat(50) + '\n');

connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
    console.error('\nPossible solutions:');
    console.error('1. Make sure MySQL is running');
    console.error('2. Check your credentials in .env file');
    console.error('3. Verify MySQL service is started');
    process.exit(1);
  }

  console.log('✅ Connected to MySQL server\n');

  // Check if database exists
  const dbName = process.env.DB_NAME || 'hr_management';
  connection.query(`SHOW DATABASES LIKE '${dbName}'`, (err, results) => {
    if (err) {
      console.error('❌ Error checking database:', err.message);
      connection.end();
      process.exit(1);
    }

    if (results.length === 0) {
      console.log(`⚠️  Database '${dbName}' does not exist`);
      console.log(`\n📝 Creating database '${dbName}'...\n`);
      
      connection.query(`CREATE DATABASE ${dbName}`, (err) => {
        if (err) {
          console.error('❌ Error creating database:', err.message);
          connection.end();
          process.exit(1);
        }
        
        console.log(`✅ Database '${dbName}' created successfully\n`);
        verifyTables();
      });
    } else {
      console.log(`✅ Database '${dbName}' exists\n`);
      verifyTables();
    }
  });
});

function verifyTables() {
  const dbName = process.env.DB_NAME || 'hr_management';
  
  // Switch to the database
  connection.query(`USE ${dbName}`, (err) => {
    if (err) {
      console.error('❌ Error switching to database:', err.message);
      connection.end();
      process.exit(1);
    }

    // Check for required tables
    const requiredTables = ['users', 'employees', 'attendance', 'leave_requests', 'payroll', 'performance_reviews'];
    
    connection.query('SHOW TABLES', (err, results) => {
      if (err) {
        console.error('❌ Error checking tables:', err.message);
        connection.end();
        process.exit(1);
      }

      const existingTables = results.map(row => Object.values(row)[0]);
      const missingTables = requiredTables.filter(table => !existingTables.includes(table));

      console.log('📋 Table Status:');
      requiredTables.forEach(table => {
        const exists = existingTables.includes(table);
        console.log(`   ${exists ? '✅' : '❌'} ${table}`);
      });
      console.log();

      if (missingTables.length > 0) {
        console.log(`⚠️  Missing tables: ${missingTables.join(', ')}`);
        console.log('\n📝 Please run the schema.sql file to create tables:');
        console.log(`   mysql -u ${process.env.DB_USER || 'root'} -p ${dbName} < database/schema.sql`);
        console.log('\nOr run this from MySQL:');
        console.log(`   USE ${dbName};`);
        console.log(`   SOURCE database/schema.sql;\n`);
        connection.end();
        process.exit(1);
      }

      // Verify table structure
      console.log('🔍 Verifying table structures...\n');
      verifyUsersTable();
    });
  });
}

function verifyUsersTable() {
  console.log('Checking users table...');
  connection.query('DESCRIBE users', (err, results) => {
    if (err) {
      console.error('❌ Error describing users table:', err.message);
      connection.end();
      process.exit(1);
    }

    const requiredColumns = ['id', 'email', 'password', 'role', 'is_active'];
    const existingColumns = results.map(row => row.Field);
    const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col));

    if (missingColumns.length > 0) {
      console.log(`❌ Missing columns in users table: ${missingColumns.join(', ')}`);
    } else {
      console.log('✅ Users table structure is correct');
    }

    verifyEmployeesTable();
  });
}

function verifyEmployeesTable() {
  console.log('Checking employees table...');
  connection.query('DESCRIBE employees', (err, results) => {
    if (err) {
      console.error('❌ Error describing employees table:', err.message);
      connection.end();
      process.exit(1);
    }

    const requiredColumns = ['id', 'user_id', 'employee_id', 'first_name', 'last_name', 'email', 
                             'phone', 'department', 'position', 'date_of_birth', 'address', 'hire_date'];
    const existingColumns = results.map(row => row.Field);
    const missingColumns = requiredColumns.filter(col => !existingColumns.includes(col));

    if (missingColumns.length > 0) {
      console.log(`❌ Missing columns in employees table: ${missingColumns.join(', ')}`);
    } else {
      console.log('✅ Employees table structure is correct');
    }

    testConnection();
  });
}

function testConnection() {
  console.log('\n' + '='.repeat(50));
  console.log('\n🎯 Testing database operations...\n');

  // Test insert into users
  const testEmail = `test_${Date.now()}@test.com`;
  const insertUserQuery = `INSERT INTO users (email, password, role, is_active) VALUES (?, ?, 'employee', TRUE)`;
  
  connection.query(insertUserQuery, [testEmail, 'test123'], (err, result) => {
    if (err) {
      console.error('❌ Error inserting test user:', err.message);
      connection.end();
      process.exit(1);
    }

    const userId = result.insertId;
    console.log('✅ Successfully inserted test user (ID:', userId + ')');

    // Test insert into employees
    const employeeId = 'EMP' + Date.now().toString().slice(-6);
    const insertEmployeeQuery = `
      INSERT INTO employees (
        user_id, employee_id, first_name, last_name, email, 
        phone, department, position, date_of_birth, address, hire_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE())
    `;

    connection.query(
      insertEmployeeQuery,
      [userId, employeeId, 'Test', 'User', testEmail, null, null, null, null, null],
      (err, result) => {
        if (err) {
          console.error('❌ Error inserting test employee:', err.message);
          console.error('SQL Error:', err.sqlMessage);
          
          // Cleanup user
          connection.query('DELETE FROM users WHERE id = ?', [userId], () => {
            connection.end();
            process.exit(1);
          });
          return;
        }

        console.log('✅ Successfully inserted test employee (ID:', result.insertId + ')');

        // Cleanup test data
        connection.query('DELETE FROM employees WHERE user_id = ?', [userId], () => {
          connection.query('DELETE FROM users WHERE id = ?', [userId], () => {
            console.log('✅ Test data cleaned up');
            
            console.log('\n' + '='.repeat(50));
            console.log('\n✅ ALL CHECKS PASSED!');
            console.log('\n📌 Your database is ready for signup functionality.\n');
            console.log('You can now:');
            console.log('1. Start the backend server: npm run dev');
            console.log('2. Start the frontend: npm start');
            console.log('3. Try signing up with new user details\n');
            
            connection.end();
            process.exit(0);
          });
        });
      }
    );
  });
}
