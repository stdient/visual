import { useEffect, useState } from "react";
import './TodayWeather.css'

export default function
  TodayWeather() {
  const [weatherJson, setWeatherJson] = useState(null);
  const [geoJson, setGeoJson] = useState(null);
  const [cityName, setSityName] = useState(null);
  const [temp, setTemp] = useState(null);
  // const [tempLine, setTempLine] = useState(null);
  // const [tempLineDesc, setTempLineDesc] = useState(null);

  function tempToNormalAppearance(temp) { return (temp - 273.15).toFixed(1) }

  useEffect(() => {
    fetch('/test_data/weather.json')
      .then((response) => response.json())
      .then((jsonWeatherData) => {
        setWeatherJson(jsonWeatherData);
      })
      .then(() => {
        setTemp(tempToNormalAppearance(weatherJson.list[0].main.temp));

        // for (let i = 0; i <= 4; ++i) {
        //   setTempLine(tempToNormalAppearance(weatherJson.list[i].main.temp));
        //   setTempLineDesc((weatherJson.list[1].dt_txt).substring());
        // }
      })

    fetch('/test_data/geo.json')
      .then((response) => response.json())
      .then((jsonGeoData) => {
        setGeoJson(jsonGeoData);
      })
      .then(() => { setSityName(geoJson[0].local_names.ru) })
  }, [geoJson, weatherJson]);

  let data = new Date();
  let day = data.getDate();
  let week_day = data.getDay();
  let days_of_week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

  return (
    <div className="today_weather__container">
      <h3>{days_of_week[week_day]}, {day}</h3>
      <h2>{cityName}</h2>
      <pre>{temp}</pre>
    </div >
  );
};
