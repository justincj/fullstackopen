import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const baseURL = "http://api.weatherstack.com/current";

const Weather = ({ capital }) => {
  const [temperature, setTemperature] = useState(0);
  const [windspeed, setWindSpeed] = useState(0);
  const [dir, setDir] = useState("");
  const [icon, setIcon] = useState("");

  const request = `${baseURL}?access_key=${API_KEY}&query=${capital}`;
  console.log(request);

  useEffect(() => {
    axios.get(request).then((response) => {
      console.log(response.data.current.temperature);
      setTemperature(response.data.current.temperature);
      setWindSpeed(response.data.current.wind_speed);
      setDir(response.data.current.wind_dir);
      setIcon(response.data.current.weather_icons[0]);
    });
  }, []);
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        <b>temperature:</b> {temperature} Celcius.
      </p>
      <p>
        <img src={`${icon}`} alt="icon" />
      </p>
      <p>
        <b> wind:</b>
        {windspeed}mph direction {dir}
      </p>
    </div>
  );
};

export default Weather;
