import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig'; // Ensure correct path
import './BusinessNews.css';

interface NewsArticle {
    title: string;
    description: string;
    url: string;
    source: {
        name: string;
    };
}

const News: React.FC = () => {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMarketNews = async () => {
            try {
                const response = await axios.get('/market/market-news');
                setNews(response.data.news);
                setIsLoading(false);
            } catch (error) {
                setError('Error fetching market news');
                setIsLoading(false);
            }
        };

        fetchMarketNews();
    }, []);

    return (
        <div className="news-container">
            <h2>Market News</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                news.map((article, index) => (
                    <div key={index} className="news-article">
                        <h4>{article.title}</h4>
                        <p>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            Read more at {article.source.name}
                        </a>
                    </div>
                ))
            )}
        </div>
    );
};

export default News;
