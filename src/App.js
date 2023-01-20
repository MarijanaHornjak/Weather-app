import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=06531e5152d4905585f3835510a7dae7`;

  const searchLocation = (event) => {
    setIsLoading(true);
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
    setIsLoading(false);
  };
  return (
    <div
      className={
        typeof data.main !== "undefined"
          ? data.main.temp > 16
            ? "app warm"
            : "app cold"
          : "app"
      }
    >
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Search..."
          onKeyPress={searchLocation}
        ></input>
      </div>
      {!isLoading && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
              <p>{data.weather ? <p>{data.sys.country}</p> : null}</p>
            </div>
            <div className="temp">
              {data.main ? (
                <h1>{data.main.temp.toFixed()}°C</h1>
              ) : (
                "Search for City to get informations..."
              )}
            </div>
            <div className="description">
              <h2>{data.weather ? <p>{data.weather[0].main}</p> : null}</h2>
              <p>
                <i>
                  {data.weather ? <p>{data.weather[0].description}</p> : null}
                </i>
              </p>
            </div>
          </div>
          {data.main !== undefined && (
            <div className="bottom">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{data.main.feels_like.toFixed()} °C</p>
                ) : null}

                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity} %</p>
                ) : null}

                <p>humidity</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                ) : null}

                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      )}
      {isLoading && <p className="loading">Finding your City...</p>}
    </div>
  );
}

export default App;
