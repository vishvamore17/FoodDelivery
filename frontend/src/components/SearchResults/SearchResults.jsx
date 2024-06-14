import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((food) => (
            <li key={food._id}>{food.name}</li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
