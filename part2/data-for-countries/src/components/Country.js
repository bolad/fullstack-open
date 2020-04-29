import React from 'react';
import Weather from './Weather';

const Country = ({ countries }) => (
    <>
        <h2>{countries[0].name}</h2>
        <div>Capital: {countries[0].capital}</div>
        <div>Population: {countries[0].population} inhabitants</div>
        <h3>Languages</h3>
            <ul>
                {countries[0].languages.map(language =>
                <li key={language.iso639_1}>
                    {language.name}
                </li>
                )}
            </ul>
        <div>
            <img src={countries[0].flag} width="100" alt="nationalFlag" />
        </div>
        <Weather capital={countries[0].capital} />
    </>
)

export default Country;