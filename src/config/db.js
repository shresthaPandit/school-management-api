const mysql = require('mysql2/promise');
require('dotenv').config();

const connectionConfig = {
  host: 'mysql.railway.internal',
  user: 'root',
  password: 'qzfokQMXQknlexwcwCJDzmlhyjTvAZhn',
  database: 'railway',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000
};

console.log('Database configuration:', {
  host: connectionConfig.host,
  user: connectionConfig.user,
  database: connectionConfig.database,
  port: connectionConfig.port
});

// Create a connection pool
const pool = mysql.createPool(connectionConfig);

// Initialize database tables
async function initializeTables() {
  try {
    console.log('Initializing database tables...');
    
    // Create schools table if it doesn't exist
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude DECIMAL(10, 6) NOT NULL,
        longitude DECIMAL(10, 6) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database tables:', error.message);
    throw error;
  }
}

// Test database connection
async function testConnection() {
  try {
    console.log('Attempting database connection...');
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    
    // Initialize tables after successful connection
    await initializeTables();
    
    const [rows] = await connection.query('SELECT 1 as test');
    console.log('Test query result:', rows);
    
    connection.release();
    return true;
  } catch (error) {
    console.error('Error connecting to database:', error.message);
    console.error('Full error:', error);
    return false;
  }
}

module.exports = {
  pool,
  testConnection
};