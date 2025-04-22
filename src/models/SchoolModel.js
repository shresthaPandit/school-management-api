const { pool } = require('../config/db');

class School {
  /**
   * Add a new school to the database
   * @param {Object} schoolData - School data to be added
   * @returns {Object} - Newly created school
   */
  static async addSchool(schoolData) {
    try {
      const { name, address, latitude, longitude } = schoolData;
      
      const [result] = await pool.execute(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [name, address, latitude, longitude]
      );
      
      const [newSchool] = await pool.execute(
        'SELECT * FROM schools WHERE id = ?',
        [result.insertId]
      );
      
      return newSchool[0];
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Get all schools from the database
   * @returns {Array} - List of all schools
   */
  static async getAllSchools() {
    try {
      const [schools] = await pool.execute('SELECT * FROM schools');
      return schools;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a school from the database
   * @param {number} id - School ID to delete
   * @returns {boolean} - True if deleted successfully
   */
  static async deleteSchool(id) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM schools WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = School;