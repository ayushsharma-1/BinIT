const News = require('../models/newsSchema'); // Import your News model
const axios = require('axios');

const fetchAndSaveNews = async () => {
    try {
        const NEWS_API_KEY = process.env.NEWS_API_KEY;
        const NEWS_API_URL = process.env.NEWS_API_URL;

        const query = 'pollution OR garbage OR landfill OR water pollution OR environmental issues OR waste management';

        // Make the request to NewsAPI
        const response = await axios.get(NEWS_API_URL, {
            params: {
                apiKey: NEWS_API_KEY,
                q: query,
                language: 'en',
                pageSize: 30
            }
        });

        const articles = response.data.articles; // Extract articles from response

        if (!articles || !articles.length) {
            console.log('No relevant news articles found.');
            return;
        }

        // Log the articles to verify their structure
        // console.log('Fetched articles:', articles);

        // Proceed to save the articles if data is valid
        const savedNews = await News.insertMany(
            articles.map(article => ({
                title: article.title || 'No Title',  // Default value if missing
                description: article.description || 'No Description',
                url: article.url || 'No URL',
                source: article.source.name || 'Unknown Source',
                author: article.author || 'Unknown Author',
                publishedAt: article.publishedAt || new Date(),
                content: article.content || 'No Content',
                urlToImage: article.urlToImage || 'No Image'
            }))
        ).catch((err) => {
            console.error('Error inserting articles into MongoDB:', err);
        });
        

        console.log('Relevant news articles fetched and saved successfully');
    } catch (error) {
        console.error('Error fetching and saving news:', error);
    }
};

// GET request: Fetch pollution-related news from MongoDB
const getNews = async (req, res) => {
    try {
        // Fetch only news articles related to pollution, garbage, land, or water
        const newsArticles = await News.find({
            $or: [
                { title: { $regex: 'pollution|garbage|landfill|water pollution|waste management', $options: 'i' } },
                { description: { $regex: 'pollution|garbage|landfill|water pollution|waste management', $options: 'i' } },
                { content: { $regex: 'pollution|garbage|landfill|water pollution|waste management', $options: 'i' } }
            ]
        });

        // Return the filtered news articles
        res.status(200).json(newsArticles);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news articles' });
    }
};

module.exports = { fetchAndSaveNews, getNews };