import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '957644072ea706ae572a3a7bc8e9a2f0';
const week_names = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

function App() {
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('Novosibirsk');

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        setForecast(groupForecastByDay(response.data.list));
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchForecast();
    const amnt_hours = 3;
    const hours_to_milisec = amnt_hours * 60 * 60 * 100;
    const interval = setInterval(fetchForecast, hours_to_milisec);
    return () => clearInterval(interval);
  }, [city]);

  const groupForecastByDay = (forecastList) => {
    const grouped = {};
    forecastList.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    return grouped;
  };

  const date = new Date();
  const date_of_month = date.getDate();
  const week_day = date.getDay();

  return (
    <div>
      <span className='date'>{week_names[week_day]}, {date_of_month}</span>
      <CitySelector setCity={setCity} />
      <p style={{ color: 'white', fontSize: '2em' }}>Current city: {city}</p>
      {forecast && <ForecastDisplay forecast={forecast} />}
    </div>
  );
}

function CitySelector({ setCity }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите город"
      />
      <button type="submit">Выбрать город</button>
    </form>
  );
}

function ForecastDisplay({ forecast }) {
  return (
    <div className='forecast__container'>
      {Object.keys(forecast).map((date) => (
        <div key={date}>
          <h3>{week_names[new Date(date).getDay()]}, {new Date(date).getDate()}</h3>
          <div style={{ display: 'flex', overflowX: 'auto' }}>
            {forecast[date].map((item, index) => (
              <WeatherCard key={index} weather={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function WeatherCard({ weather }) {
  return (
    <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <p>{new Date(weather.dt * 1000).toLocaleTimeString().substring(0, 5)}</p>
      <p>{(weather.main.temp).toFixed(1)}°C</p>
      <WeatherIcon icon={weather.weather[0].icon} />
      <p>{weather.weather[0].description}</p>
      <p>Влажность: {weather.main.humidity}%</p>
      <p>Ветер: {weather.wind.speed} м/с</p>
    </div>
  );
}

function WeatherIcon({ icon }) {
  return <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />;
}

export default App;
