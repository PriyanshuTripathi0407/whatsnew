import React from 'react'
import './Model.css'
import demoImg from '../Image/demo.jpg'

const Bookmark = ({ show, bookmarks, onClose, onSelectArticle, onDeleteBookmark }) => {
    if (!show) {
        return null
    }
    return (
        <div className='model-overlay'>
            <div className='model-content'>
                <span className='close-button' onClick={onClose}>
                    <i className="fa-solid fa-circle-xmark"></i>
                </span>
                <h2 className='bookmarks-heading'> Bookmarked News </h2>
                <div className='bookmarks-list'>
                    {bookmarks.map((article, index) => (
                        <div className='bookmarks-item' key={index} onClick={()=> onSelectArticle(article)}>
                            <img src={article.image} alt={article.title} />
                            <h3>{article.title}</h3>
                            <i className="fa-solid fa-circle-xmark" style={{ color: '#b88efc' }}onClick={(e)=>{
                                e.stopPropagation()
                                onDeleteBookmark(article)
                            }}></i>
                        </div>
                    )
                    )}
                </div>
            </div>

        </div>
    )
}

export default Bookmark

