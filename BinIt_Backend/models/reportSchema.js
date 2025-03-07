const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    areaType: {
        type: String,
        enum: ['land', 'water','Land','Water'],
        required: true
    },
    pollutionPlace:{
        type: String,
        enum:['Street', 'Landfill site','Forest and Park' ,'Others','River Banks', 'Seashore','Littoral Zone'],
        required: true
    },
    pollutionType:{
        type: String,
        enum:['MicroPlastic','Organic waste','Invasive Aquatic Plants','Other','Regular home waste','Oil and Chemical','Agricultural Runoff','Others','other','others'],
        required: true
    },
    area: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
   
    pincode: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    image: {
        type: String, // URL or path to the image
        required: false
    }
});

const report = mongoose.model('report', reportSchema);
module.exports = report;
