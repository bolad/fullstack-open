import React, {useState, useEffect} from 'react';

import axios from 'axios';

import FilterSearch from './components/FilterSearch';
import Country from './components/Country';

const App = () => {

    const [countries, setCountries] = useState([]);
    const [filteredCountry, setFilteredCountry] = useState('');

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleFilteredCountry = event => {
        setFilteredCountry(event.target.value)
    }

    const showAllCountries = countries.map(country =>
        <div key={country.name}>{country.name}</div>
    )
    
    const filteredCountries = countries.filter(
        country => country.name.toLowerCase().includes(filteredCountry.toLowerCase())
    );

    const showCountry = country => setFilteredCountry(country.name.toLowerCase());

    return (
        <>
            <div>
                <FilterSearch 
                    value={filteredCountry}
                    handleChange={handleFilteredCountry} 
                />
                {
                    filteredCountry.length === 0 && <div>{showAllCountries}</div>
                }
                {
                    filteredCountries.length > 10 ? (
                        <p>Too many matches, specify another filter</p>
                    ) : filteredCountries.length > 1 && filteredCountries.length < 10 ? (
                        <div>
                            {
                                filteredCountries.map(country => (
                                    <div>
                                        <li key={country.name}>
                                            {country.name}
                                            <button onClick={() => showCountry(country)}>Show</button>
                                        </li>
                                    </div> 
                                ))
                            }
                        </div>
                    ) : filteredCountries.length === 1 ? (
                        <Country countries={filteredCountries} />
                    ) : (
                        <p>Cannot find country </p>
                    )
                }
            </div>
        </>   
    )
}

export default App;