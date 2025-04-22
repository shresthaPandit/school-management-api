const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Import database
const { testConnection } = require('./src/config/db');

// Import routes
const schoolRoutes = require('./src/routes/schoolRoutes');

// Initialize express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Test database connection
testConnection();

// Routes
app.use('/api', schoolRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to School Management API',
    endpoints: {
      addSchool: '/api/addSchool',
      listSchools: '/api/listSchools'
    }
  });
});

// 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});