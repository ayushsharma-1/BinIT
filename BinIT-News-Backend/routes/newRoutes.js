const express = require('express');
const { fetchAndSaveNews, getNews } = require('../controllers/newController');
const router = express.Router();
// Route to post a news article
router.get('/fetch', fetchAndSaveNews);

// Route to get all news articles
router.get('/',getNews);


module.exports=router