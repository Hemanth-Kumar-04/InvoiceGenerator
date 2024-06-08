import React from 'react';
import "../styles/Bookshelf.css"
const BookCard = ({ book, onAdd }) => {
    const { title, edition_count } = book;

    const handleAddToBookshelf = () => {
        onAdd(book);
    };

    return (
        <div className="book-card">
            <h3>{title}</h3>
            <p>Edition Count: {edition_count}</p>
            <button onClick={handleAddToBookshelf}>Add to Bookshelf</button>
        </div>
    );
};

export default BookCard;
