import React, { useState, useEffect } from "react";
import weathericon from "../Images/weathericon.png";
import axios from "axios";
import "./Landing.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { Button } from "@mui/material";

const Landing = () => {
  const API_KEY = "314046562a2cf5ee9671679fbaedbf5a";
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isCity, setIsCity] = useState(false);
  let currentDate = new Date();

  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();

  var dateTimeString =
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("No such City found");
    }
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      setIsCity(true);
      fetchWeatherData();
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="background">
      <h1>Weather App</h1>

      <div className="search-box">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, p: 0.5 }}
            placeholder="Search City..."
            inputProps={{ "aria-label": "search city" }}
            onChange={handleCityChange}
          />
          <Button
            variant="contained"
            component="label"
            size="small"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Paper>
      </div>

      <div>
        {!isCity ? <div className="no-todo">Please add city</div> : null}
        {weatherData && (
          <div className="city-details">
            <div>
              <div>{dateTimeString}</div>
              <div className="temperature">{weatherData.main.temp} °C</div>
              <div className="other-info">
                <div>Pressure : {weatherData.main.pressure}</div>
                <div>Humidity : {weatherData.main.humidity}</div>
                <div>Min : {weatherData.main.temp_max} °C</div>
                <div>Max : {weatherData.main.temp_min} °C</div>
              </div>
            </div>
            <div>
              <div className="city-name">{weatherData.name}</div>
              <div>
                <img src={weathericon} alt="weather-icon" />
              </div>

              <div className="city-details">
                {weatherData.weather[0].description}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;

// try {
//     const response = await axios.get(API_BASE_URL, {
//       params: {
//         q: city,
//         appid: API_KEY,
//         units: "metric",
//       },
//     });
//     setWeatherData(response.data);
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error fetching weather data:", error);
//     alert("No such City found");
//   }
// };
