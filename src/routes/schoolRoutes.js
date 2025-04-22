const express = require('express');
const { addSchool, listSchools, deleteSchool } = require('../controllers/schoolController');
const { validateAddSchool, validateListSchools } = require('../middleware/validators');

const router = express.Router();

// Route for adding a new school
router.post('/addSchool', validateAddSchool, addSchool);

// Route for listing schools sorted by proximity
router.get('/listSchools', validateListSchools, listSchools);

// Route for deleting a school
router.delete('/deleteSchool/:id', deleteSchool);

module.exports = router;