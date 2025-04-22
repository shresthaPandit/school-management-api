const { body, query, validationResult } = require('express-validator');

// Validation for adding a school
const validateAddSchool = [
  body('name')
    .notEmpty().withMessage('School name is required')
    .isString().withMessage('School name must be a string')
    .trim()
    .isLength({ min: 2, max: 255 }).withMessage('School name must be between 2 and 255 characters'),
  
  body('address') 
    .notEmpty().withMessage('Address is required')
    .isString().withMessage('Address must be a string')
    .trim()
    .isLength({ min: 5, max: 255 }).withMessage('Address must be between 5 and 255 characters'),
  
  body('latitude')
    .notEmpty().withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid number between -90 and 90'),
  
  body('longitude')
    .notEmpty().withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid number between -180 and 180'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }
    next();
  }
];

// Validation for listing schools
const validateListSchools = [
  query('latitude')
    .notEmpty().withMessage('User latitude is required')
    .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be a valid number between -90 and 90'),
  
  query('longitude')
    .notEmpty().withMessage('User longitude is required')
    .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be a valid number between -180 and 180'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }
    next();
  }
];

module.exports = {
  validateAddSchool,
  validateListSchools
};