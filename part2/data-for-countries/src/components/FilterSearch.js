import React from 'react';

const FilterSearch = ({handleChange, value}) => (
    <div>
        <label> Find countries </label>
        <input
            type="search"
            value={value}
            onChange={handleChange}
        />
    </div>
);

export default FilterSearch;