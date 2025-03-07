const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); // Import v3 S3 client and command
const multer = require('multer');
const { Upload } = require("@aws-sdk/lib-storage");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
// console.log(process.env.AWS_ACCESS_KEY_ID)
// console.log(process.env.AWS_SECRET_ACCESS_KEY)


// Set up multer storage and handle file upload
const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory to pass it to S3
});

const s3Uploader = async (file) => {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `reports/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    // ACL: 'public-read',
  };

  const uploadCommand = new PutObjectCommand(uploadParams);
  await s3.send(uploadCommand); // Use the send method of S3Client
};

// Export middleware to handle single file upload
module.exports = (req, res, next) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file', error: err.message });
    }
    try {
      if (req.file) {
        await s3Uploader(req.file); // Upload file to S3
        req.file.location = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/reports/${Date.now()}_${req.file.originalname}`;
      }
      next(); // Proceed to the next middleware/controller
    } catch (error) {
      return res.status(500).json({ message: 'Error uploading image to S3', error: error.message });
    }
  });
};
