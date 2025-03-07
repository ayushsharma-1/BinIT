const express = require('express');
const router = express.Router();
const subscribe = require('../controllers/subscribeController')

// Route to handle subscribing to news
router.post('/', subscribe);

module.exports = router;
