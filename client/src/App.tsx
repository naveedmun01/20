import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = "8c95e3e8662f8a395dc5105bf4017233"; // ✅ New working API key

export default function App() {
  const [weather, setWeather] = useState<any>(null);
  const [location, setLocation] = useState('New York');
  const [coords, setCoords] = useState({ lat: 40.71, lon: -74.01 });
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`
      );
      setWeather(res.data);
    } catch (err) {
      setError("Failed to fetch weather.");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [coords]);

  return (
    <div>
      <h1>WeatherNow Pro - {location}</h1>
      {error && <p>{error}</p>}
      {!weather ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>🌡️ Temp: {weather.current.temp}°C</p>
          <p>☀️ UV Index: {weather.current.uvi}</p>
          <p>🫁 AQI: (placeholder)</p>
          <h3>📅 7-Day Forecast:</h3>
          <ul>
            {weather.daily.slice(0, 7).map((day: any, i: number) => (
              <li key={i}>
                {new Date(day.dt * 1000).toDateString()} - {day.temp.day}°C
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
