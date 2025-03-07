const express = require('express');
const router = express.Router();
const {getNGOs, registerNGO, getNGOByRegistrationNumber, updateNGOByRegistrationNumber, deleteNGOByRegistrationNumber} = require('../controllers/ngoController');

// Define routes
router.get('/', getNGOs);  // Get all NGOs
router.post('/', registerNGO); // Register a new NGO
router.get('/:registrationNumber', getNGOByRegistrationNumber); // Get NGO by Registration Number
router.put('/:registrationNumber', updateNGOByRegistrationNumber); // Update NGO by Registration Number
router.delete('/:registrationNumber', deleteNGOByRegistrationNumber); // Delete NGO by Registration Number

module.exports = router;
