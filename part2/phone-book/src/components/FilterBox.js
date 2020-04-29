import React from 'react';

export const FilterBox = ({ handleChange }) => (
    <div>
        <input 
            type="search"
            onChange={handleChange}
        />
    </div>
)
  