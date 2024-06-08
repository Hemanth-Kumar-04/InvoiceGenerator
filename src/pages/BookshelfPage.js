import React, { useState } from 'react';
import Bookshelf from '../components/Bookshelf';
import { Link } from 'react-router-dom';
import '../styles/BookshelfPage.css';

const BookshelfPage = () => {
    const [bookshelf, setBookshelf] = useState(() => {
        const saved = localStorage.getItem('bookshelf');
        return saved ? JSON.parse(saved) : [];
    });

    return (
        <div className="bookshelf-page">
            <Bookshelf books={bookshelf} />
            <Link to="/" className="navigation-button">Back to Search</Link>
        </div>
    );
};

export default BookshelfPage;
