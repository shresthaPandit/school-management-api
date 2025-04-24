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

// Test database connection
async function testConnection() {
  try {
    console.log('Attempting database connection...');
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    
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