const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true, // Ensures uniqueness
        index: true // Explicitly create an index
    },
    address: {
        street: String,
        city: String,
        state: String,
        pincode: String
    },
    contact: {
        type: String,
        required: true,
        unique: true, // Ensures uniqueness
        index: true // Explicitly create an index
    },
    website: {
        type: String
    },
    establishedYear: {
        type: Number,
        required: true
    },
    missionStatement: {
        type: String,
        required: true
    },
    areasOfWork: [{
        type: String
    }]
});

// Ensure indexes are created
// ngoSchema.index({ registrationNumber: 1 }, { unique: true });
// ngoSchema.index({ contact: 1 }, { unique: true });

const NGO = mongoose.model('NGO', ngoSchema);
module.exports = NGO;
