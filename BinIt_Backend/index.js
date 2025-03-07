const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connectDB');
const reportRoutes = require('./routes/reportRoutes');
const ngoRegistrationRoutes = require('./routes/ngoRegistrationRoutes');
const subscribeRoutes = require('./routes/subscribeRoutes');
const contactRoutes = require('./routes/contactRoutes');
const cors = require('cors');

const dbName = process.env.DBNAME;
const port = process.env.PORT || 8080;

// ✅ Connect to Database
connectDB(dbName);

// ✅ Initialize Express App
const app = express();
app.use(express.json());

// ✅ CORS Configuration from .env file
const corsOptions = {
    origin: [
        process.env.CORS_ORIGIN_1,
        process.env.CORS_ORIGIN_2,
        process.env.CORS_ORIGIN_3,
        process.env.CORS_ORIGIN_4,
        process.env.CORS_ORIGIN_5,
        process.env.CORS_ORIGIN_6,
        process.env.CORS_ORIGIN_7,
        process.env.CORS_ORIGIN_8,
        process.env.CORS_ORIGIN_9,
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies and auth headers if needed
};
app.use(cors(corsOptions));

// ✅ Debugging: Log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log("Headers:", req.headers);
    next();
});

// ✅ Routes
app.use('/reports', reportRoutes);
app.use('/ngo', ngoRegistrationRoutes);
app.use('/subscribe', subscribeRoutes);
app.use('/contact', contactRoutes);

// ✅ Handle CORS Preflight Requests
app.options('*', cors(corsOptions));

// ✅ Global Error Handler (Prevents Server Crash on Errors)
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
