import React from 'react';

export const FilterBox = ({ handleChange }) => (
    <div className="filter">
        <label> Filter shown with:</label>
        <input 
            type="search"
            onChange={handleChange}
        />
    </div>
)
  