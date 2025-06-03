import React, { useEffect, useState } from 'react';
import '../index.css';
import './News.css';
import userimg from '../Image/User1.avif';
// import noimg from '../Image/no-img.png';
import axios from 'axios';
import NewsModel from './NewsModel';
import Bookmark from './Bookmark';
import Button from '@mui/material/Button';
import v1 from '../Video/Django Tutorial In Hindi.mp4'

const categories = ["general", "world", "business", "technology", "entertainment", "science", "health", "nation", "sports"];

function News() {
    const [headline, setHeadline] = useState(null);
    const [news, setNews] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('general');
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showModel, setShowModel] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [bookmarks, setBookmarks] = useState([]);
    const [showbookmarksModel, setShowBookmarksModel] = useState(false);


    useEffect(() => {
        const fetchNews = async () => {
            let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=a4b39d2d3e744ffa77cc2693b25188c2`;


            if (searchQuery) {
                url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=a4b39d2d3e744ffa77cc2693b25188c2`;
            }

            const response = await axios.get(url);
            const fetchedNews = response.data.articles;
            setHeadline(fetchedNews[0]);
            const updatedNews = [...fetchedNews.slice(1, 3)];
            setNews(updatedNews);

            const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []
            setBookmarks(savedBookmarks)

        };

        fetchNews();
    }, [selectedCategory, searchQuery]); // Dependencies

    const handleCategoryClick = (e, category) => {
        e.preventDefault();
        setSelectedCategory(category);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
        setSearchInput('');
    };

    const handleArticleClick = (article) => {
        setSelectedArticle(article)
        setShowModel(true)
    }

    const handleBookmarkClick = (article) => {
        setBookmarks((prevBookmarks) => {
            const updatedBookmarks = prevBookmarks.find((bookmark) => bookmark.title === article.title)
                ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title)
                : [...prevBookmarks, article]
            localStorage.setItem("bookmark", JSON.stringify(updatedBookmarks))
            return updatedBookmarks
        })
    }
    return (
        <div className="news">
            <header className="news-header">
                <p className="gradient-text ">What's New! </p>
                <div className="search-bar">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search here. . ."
                        // value={searchInput}
                        // onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
            </header>
            <div className="news-content">
                <div className="navbar">
                    <div className="user">
                        <img src={userimg} alt="User Image" />
                        <p>User_name</p>
                    </div>
                    <nav className="categories">
                        <h1 className="nav-heading">Categories</h1>
                        <div className="nav-links">
                            {categories.map((category) => (
                                <a
                                    href="#"
                                    className="nav-link"
                                    key={category}
                                    onClick={(e) => handleCategoryClick(e, category)}
                                >
                                    {category}
                                </a>
                            ))}
                            <a
                                href="#"
                                className="nav-link"
                                onClick={() => setShowBookmarksModel(true)}>
                                Bookmarks <i className="fa-solid fa-bookmark"></i>
                            </a>
                        </div>
                    </nav>
                </div>
                <div className="news-section">

                    <div className="search-bar">
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search News....."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <button type="submit">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>
                    </div>

                    {headline && (
                        <div className="headline" onClick={() => handleArticleClick(headline)}>
                            <img src={headline.image} alt={headline.title} />
                            <h2 className="headline-title">
                                {headline.title}
                            </h2>
                            <i className={`${bookmarks.some((bookmark) =>
                                bookmark.title === headline.title) /* ` ` is called template literal */
                                ? "fa-solid"
                                : "fa-regular"
                                } fa-bookmark bookmark`}
                                onClick={(e) => {
                                    e.stopPropagation() /*prevents triggering the parent elements on clicking it */
                                    handleBookmarkClick(headline)
                                }}
                            ></i>
                        </div>
                    )}

                    <div className="news-grid">
                        {/* Map through the 'news' array and return JSX for each article */}
                        {news.map((article, index) => (
                            <div key={index} className="news-grid-item" onClick={() => handleArticleClick(article)}>
                                <img src={article.image} alt={article.title} />
                                <h3>
                                    {article.title}
                                </h3>
                                <i
                                    className={`${bookmarks.some((bookmark) =>
                                        bookmark.title === article.title)
                                        ? 'fa-solid'
                                        : 'fa-regular'
                                        } fa-bookmark bookmark`}
                                    onClick={(e) => {
                                        e.stopPropagation() /*prevents triggering the parent elements on clicking it */
                                        handleBookmarkClick(article)
                                    }}
                                ></i>
                                {/* <p>{article.description}</p> You can show other fields like description here */}
                            </div>
                        ))}
                    </div>


                </div>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'start' }}>
                    <h3>User Uploads</h3>
                    <div className='image-blogs'>
                        <div className='Image-item'>
                            <img src={userimg} alt='Uploaded Image' />
                            <img src={userimg} alt='Uploaded Image' />
                            <img src={userimg} alt='Uploaded Image' />
                            <img src={userimg} alt='Uploaded Image' />
                            {/* <img src={userimg} alt='Uploaded Image'/>                             */}
                        </div>
                        <div className='Upload-button'>
                            <Button variant="contained">Upload your Image Blogs </Button>
                        </div>
                    </div>
                    {/* <div className='video-blogs'>
                        <div className='Video-item'>
                            <video width="100%" controls>
                                <source src={v1} type="video/mp4" />                               
                            </video>
                            <video width="100%" controls>
                                <source src={v1} type="video/mp4" />                               
                            </video>                                                 
                        </div>
                        <div className='Upload-button'>
                            <Button variant="contained">Upload your Video Vlogs </Button>
                        </div>
                    </div> */}

                </div>
                <NewsModel show={showModel} article={selectedArticle} onClose={() => setShowModel(false)} />
                <Bookmark
                    show={showbookmarksModel} /* whether bookmark is visible or not */
                    bookmarks={bookmarks} /* list of bookmarks articles */
                    onClose={() => setShowBookmarksModel(false)} /* */
                    onSelectArticle={handleArticleClick}
                    onDeleteBookmark={handleBookmarkClick}
                />


            </div>

        </div>
    );
}

export default News;
