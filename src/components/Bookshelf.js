import React from 'react';

const Bookshelf = ({ books }) => {
    return (
        <div className="bookshelf">
            {books.map((book, index) => (
                <div key={index} className="book-card">
                    <h3>{book.title}</h3>
                    <p>Edition Count: {book.edition_count}</p>
                </div>
            ))}
        </div>
    );
};

export default Bookshelf;
