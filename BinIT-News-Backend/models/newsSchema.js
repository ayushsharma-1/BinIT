const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    source: { type: String },
    author: { type: String },
    publishedAt: { type: Date },
    content: { type: String },
    urlToImage: { type: String },
});

// Create a model based on the schema
const News = mongoose.model('News', newsSchema);

module.exports = News;
