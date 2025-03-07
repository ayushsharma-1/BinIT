const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { fetchAndSaveNews } = require('./controllers/newController');
const connectDB = require('./db/connectDB');
const newRoutes = require('./routes/newRoutes');

const app = express();

// Handle preflight requests (OPTIONS)
const allowedOrigins = [
    process.env.CORS_ORIGIN_1,
    process.env.CORS_ORIGIN_2,
    'https://binit.site',
    'https://www.binit.site',
    'https://admin.binit.site',
    'https://www.admin.binit.site',
    'http://localhost:3000'  // Default fallback
].filter(Boolean);  // Remove undefined values

console.log("Allowed Origins:", allowedOrigins); // Debugging

// CORS Configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`Blocked by CORS: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests (OPTIONS)
app.options('*', cors(corsOptions)); // Ensure OPTIONS are allowed

const port = process.env.PORT || 5004;
const dbName = process.env.MONGO_DATABASE_NAME;
connectDB(dbName)
// Fetch and save news on server startup
fetchAndSaveNews()
    .then(() => console.log('30 news articles fetched and saved successfully!'))
    .catch(err => console.error('Error fetching and saving news:', err));

app.use(express.json());



// Use the news routes
app.use('/news', newRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
