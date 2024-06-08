import React, { useState, useEffect } from 'react';
import BookSearch from '../components/BookSearch';
import BookCard from '../components/BookCard';
import { Link } from 'react-router-dom';
import '../styles/SearchPage.css';

const SearchPage = () => {
    const [books, setBooks] = useState([]);
    const [bookshelf, setBookshelf] = useState(() => {
        const saved = localStorage.getItem('bookshelf');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        fetchDefaultBooks();
    }, []);

    const fetchDefaultBooks = () => {
        fetch(`https://openlibrary.org/search.json?q=react&limit=10&page=1`)
            .then(response => response.json())
            .then(data => setBooks(data.docs.map(book => ({
                title: book.title,
                edition_count: book.edition_count
            }))));
    };

    const handleSearch = (query) => {
        if (query) {
            fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
                .then(response => response.json())
                .then(data => setBooks(data.docs.map(book => ({
                    title: book.title,
                    edition_count: book.edition_count
                }))));
        } else {
            fetchDefaultBooks();
        }
    };

    const addToBookshelf = (book) => {
        setBookshelf([...bookshelf, book]);
        localStorage.setItem('bookshelf', JSON.stringify([...bookshelf, book]));
    };

    return (
        <div className="search-page">
            <BookSearch onSearch={handleSearch} />
            <Link to="/bookshelf" className="navigation-button">Go to My Bookshelf</Link>
            <div className="book-results">
                {books.map((book, index) => (
                    <BookCard key={index} book={book} onAdd={addToBookshelf} />
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
