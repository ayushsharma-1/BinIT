const Report = require('../models/reportSchema'); // Import the Report model
const upload = require('../middleware/uploadMiddleware'); // Import the upload middleware

// Get all reports
const getReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving reports' });
    }
};

// Post a new report with image upload
const postReports = async (req, res) => {
    // Proceed with the report creation after successful upload
    try {
      const { areaType, pollutionPlace, pollutionType, area, city,  pincode, latitude, longitude } = req.body;
      const image = req.file ? req.file.location : null; // URL of the image in S3
  
      // Create a new report using the data from the request body
      const newReport = new Report({
        areaType,
        pollutionPlace,
        pollutionType,
        city,
        area,
        pincode,
        latitude,
        longitude,
        image, // Store the S3 URL of the image
      });
  
      // Save the new report to the database
      const savedReport = await newReport.save();
      res.status(201).json(savedReport); // Respond with the newly created report
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error creating the report', error: error.message }); // Error handling
    }
  };
module.exports = { getReports, postReports };
