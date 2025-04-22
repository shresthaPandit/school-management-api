const School = require('../models/SchoolModel');
const { calculateDistance } = require('../utils/distance');

/**
 * Add a new school
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function addSchool(req, res) {
  try {
    const schoolData = {
      name: req.body.name,
      address: req.body.address,
      latitude: parseFloat(req.body.latitude),
      longitude: parseFloat(req.body.longitude)
    };
    
    const newSchool = await School.addSchool(schoolData);
    
    res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: newSchool
    });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add school',
      error: error.message
    });
  }
}

/**
 * List all schools sorted by proximity to user location
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function listSchools(req, res) {
  try {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);
    
    const schools = await School.getAllSchools();
    
    // Calculate distance for each school and add it as a property
    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(
        userLat, userLon,
        school.latitude, school.longitude
      );
      
      return {
        ...school,
        distance: parseFloat(distance.toFixed(2)) // Round to 2 decimal places
      };
    });
    
    // Sort schools by distance (closest first)
    const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    
    res.status(200).json({
      success: true,
      message: 'Schools retrieved successfully',
      user_location: {
        latitude: userLat,
        longitude: userLon
      },
      data: sortedSchools
    });
  } catch (error) {
    console.error('Error listing schools:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve schools',
      error: error.message
    });
  }
}

/**
 * Delete a school by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteSchool(req, res) {
  try {
    const schoolId = parseInt(req.params.id);
    
    const deleted = await School.deleteSchool(schoolId);
    
    if (deleted) {
      res.status(200).json({
        success: true,
        message: 'School deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'School not found'
      });
    }
  } catch (error) {
    console.error('Error deleting school:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete school',
      error: error.message
    });
  }
}

module.exports = {
  addSchool,
  listSchools,
  deleteSchool
};