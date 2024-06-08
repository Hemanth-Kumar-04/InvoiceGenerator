import React, { useState } from 'react';

const BookSearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    return (
        <div className="book-search">
            <input
                type="text"
                placeholder="Search for books..."
                value={query}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default BookSearch;
