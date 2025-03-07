const express = require('express');
const {getReports, postReports} = require('../controllers/reportController')
const upload = require('../middleware/uploadMiddleware');
// console.log(getReports); // Should log a function
// console.log(postReports); // Should log a function
const router = express.Router();

router.get('/', getReports); 
router.post('/', upload, postReports);

module.exports=router;