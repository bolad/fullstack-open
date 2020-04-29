import React, {useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState('');
    const [icon, setIcon] = useState('');

    const params = {
        access_key: process.env.REACT_APP_WEATHER_API_KEY,
        query: capital
    }

    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
                console.log(response.data)
                setWeather(response.data.current)
                setIcon(response.data.current.weather_icons)
            })
    }, [])

    return (
        <div>
            <h3>Weather in {capital}</h3>
            <h4>Description: {weather.weather_descriptions}</h4>
            <h4>Temperature: {weather.temperature} &deg;C</h4>
            <img src={icon} />
            <h4>Wind: {weather.wind_speed} mph direction {weather.wind_dir}</h4>
        </div>
    )
}

export default Weather;