import { useEffect, useState } from "react";
import axios from "axios";
import "../../../css/home-news.css";

function HomeNews() {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            const api = import.meta.env.VITE_NEWS_API;
            const url = `${api}/news`;  // URL of your backend API to get news from MongoDB

            try {
                const response = await axios.get(url);
                if (response.data && response.data.length > 0) {
                    // Function to shuffle the news articles array
                    const shuffleArray = (array) => {
                        let shuffled = array.slice(); // Create a copy of the array to avoid mutating the original
                        for (let i = shuffled.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
                        }
                        return shuffled;
                    };

                    // Shuffle and pick first 6 articles
                    const randomNews = shuffleArray(response.data).slice(0, 7);
                    setNews(randomNews);

                } else {
                    setError("No news articles found.");
                }
            } catch (error) {
                setError(`Error fetching news: ${error.response?.data?.message || error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="home-news">
            <div className="home-news-title">NEWS UPDATE</div>
            <div className="news-grid">
                {loading ? (
                    <p>Loading latest news...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    news.map((article, index) => (
                        <div key={index} className={`news-card ${index === 0 ? "featured" : ""}`}>
                            {/* Making the image clickable */}
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={article.urlToImage || "/news-placeholder.png"} // Fallback image if no image found
                                    alt="News"
                                    className="news-image"
                                    loading="lazy"
                                    onError={(e) => (e.target.src = "/news-placeholder.png")}
                                />
                            </a>
                            <div className="news-content">
                                <h3 className="news-title">{article.title}</h3>
                                <p className="news-description">
                                    {article.description || "No description available."}
                                </p>
                                <div className="news-footer">
                                    <span className="news-date">
                                        {article.publishedAt
                                            ? new Intl.DateTimeFormat("en-US", {
                                                  year: "numeric",
                                                  month: "short",
                                                  day: "numeric",
                                              }).format(new Date(article.publishedAt))
                                            : "N/A"}
                                    </span>
                                    {/* Read More button */}
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="news-btn"
                                    >
                                        Read More &rarr;
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default HomeNews;
