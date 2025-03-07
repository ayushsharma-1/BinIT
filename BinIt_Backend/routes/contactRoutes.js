const express = require('express');
const router = express.Router();
const { getAllContacts, createContact } = require('../controllers/contactController');

// GET request to fetch all contacts/complaints
router.get('/', getAllContacts);

// POST request to create a new complaint
router.post('/', createContact);

module.exports = router;
