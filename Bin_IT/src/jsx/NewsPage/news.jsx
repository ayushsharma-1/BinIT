import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/news-main.css';
import Header from '../Commen-Components/header';
import Footer from '../Commen-Components/footer';

const News = () => {
    const [articles, setArticles] = useState([]);  // All the articles
    const [error, setError] = useState(null);  // Error handling
    const [loading, setLoading] = useState(true);  // Loading state for initial fetch
    const [page, setPage] = useState(1);  // Track page number for pagination
    const [hasMore, setHasMore] = useState(true);  // Check if more articles exist

    useEffect(() => {
        const fetchNews = async () => {
            const api = import.meta.env.VITE_NEWS_API;  // Backend API URL from .env file
            const url = `${api}/news?page=${page}&limit=15`;  // Backend API with page number and limit

            try {
                const response = await axios.get(url);
                if (response.data && response.data.length > 0) {
                    // Shuffle the articles and select random ones
                    const shuffledArticles = shuffleArray(response.data);
                    const randomArticles = shuffledArticles.slice(0, 15); // Get only 15 random articles
                    setArticles((prevArticles) => [...prevArticles, ...randomArticles]);  // Append to existing articles
                    if (response.data.length < 15) {
                        setHasMore(false);  // No more articles left
                    }
                } else {
                    setError("No news articles found.");
                    setHasMore(false);  // Stop showing the button if no articles are returned
                }
            } catch (err) {
                setError(`Error fetching news: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [page]);  // Dependency array includes `page`, so fetches will trigger when page changes

    // Helper function to shuffle articles array
    const shuffleArray = (array) => {
        let shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const timeSince = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = Math.floor(seconds / 86400);
        if (interval >= 1) return interval + ' days ago';
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) return interval + ' hours ago';
        interval = Math.floor(seconds / 60);
        if (interval >= 1) return interval + ' minutes ago';
        return Math.floor(seconds) + ' seconds ago';
    };

    const getAuthorName = (name) => (name ? name : 'Unknown Author');

    const displayNews = () => {
        return articles.map((article, index) => (
            <div key={index} className="card-main">
                {article.urlToImage && (
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <img 
                            src={article.urlToImage} 
                            alt={article.title} 
                            className="article-image" 
                        />
                    </a>
                )}
                <div className="article-content">
                    <div className="article-title">{article.title}</div>
                    <div className="article-description">
                        {article.description || 'No description available'}
                    </div>
                    <div className="article-meta">
                        <span>{timeSince(article.publishedAt)}</span>
                        <span>{`by ${getAuthorName(article.author)}`}</span>
                    </div>
                    <div className="article-actions">
                        <a href={article.url} className="read-more-btn">Read More</a>
                    </div>
                </div>
            </div>
        ));
    };
    

    const handleViewMore = () => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);  // Increment page when "View More" is clicked
        }
    };

    return (
        <>
            <Header />
            <main>
                <div className="news-main">
                    <div className="news-main-title">News</div>
                    <div className="trending-news-top">
    {articles.length > 0 && articles[0].urlToImage && (
        <div className="trending-news-img">
            <a href={articles[0].url} target="_blank" rel="noopener noreferrer">
                <img 
                    src={articles[0].urlToImage} 
                    alt={articles[0].title} 
                    className="article-image" 
                />
            </a>
        </div>
    )}
    <div className="trending-news-right">
        <div className="trending">
            <span className="trending-news">Trending</span>
        </div>
        {articles.length > 0 && (
            <>
                <span className="trending-news-title">{articles[0].title}</span>
                <span className="trending-news-description">{articles[0].description || 'No description available'}</span>
                <div className="trending-news-meta">
                    <span>{timeSince(articles[0].publishedAt)}</span>
                    <span>{`by ${getAuthorName(articles[0].author)}`}</span>
                </div>
                {/* Add Read More in the trending section */}
                <a href={articles[0].url} className="read-more-btn trending-read-more">Read More</a>
            </>
                    )}
                    </div>
                </div>
                </div>
                <div className="news-container">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <div className="news-grid">{displayNews()}</div>
                    )}
                    {hasMore && (
                        <button className="btn-view-more" onClick={handleViewMore}>
                            View More
                        </button>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default News;

