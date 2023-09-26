import React, { useState } from "react";
import "./homepage.css";
import { FaSearch } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import errorimg from "../../assets/images/404.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import clear from "../../assets/images/clear.png"
import cloud from "../../assets/images/cloud.png"
import mist from "../../assets/images/mist.png"
import rain from "../../assets/images/rain.png"
import snow from "../../assets/images/snow.png"
import drizzle from "../../assets/images/drizzle.png"
import light from "../../assets/images/light.png"

export const HomePage = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [humidity,setHumidity] = useState("")
  const [wind,setWind] = useState("")
  const [temperature,setTemperature] = useState("")
  const [wicon,setWicon] = useState("") 
  const [des,setDes] = useState("") 


  const validFrom = () => {
    if (city.trim() === "") {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=cd4dccc856db94d989b95d76744aa6b6`
      );
      setWeatherData(data)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setDes(data.weather[0].main)
      setTemperature(data.main.temp)
      setError(false);

      if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
        setWicon(clear)
      }
      else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n" || data.weather[0].icon==="03d" || data.weather[0].icon==="03n" || data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
        setWicon(cloud)
      }else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
        setWicon(rain)
      }else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
        setWicon(drizzle)
      }else if(data.weather[0].icon==="11d" || data.weather[0].icon==="11n"){
        setWicon(light)
      }else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
        setWicon(snow)
      }else if(data.weather[0].icon==="50d" || data.weather[0].icon==="50n"){
        setWicon(mist)
      }

    } catch(error) {
      setError(true);
      console.log(error);
    }
  };



  console.log(weatherData);
  const containerClass = error ? 'error-container' : (weatherData ? 'data-container' : 'container');
  const weatherBoxClass = error ? 'error-weather-box' : (weatherData ? 'data-weather-box' : 'weather-box');
  const weatherDetailsClass = error ? 'error-weather-details' : (weatherData ? 'data-weather-details' : 'weather-details');
  // const containerClass = error ? 'container error' : 'container';

  return (
    <div className={containerClass}>
      <form onSubmit={handleSubmit}>
        <div className="search-box">
          <FaMapMarkerAlt
            style={{
              position: "absolute",
              color: "#06283D",
              fontSize: "20px",
              marginRight: "35px",
            }}
          />
          <input
            type="text"
            value={city}
            placeholder="Enter your location"
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            disabled={!validFrom()}
            className="fa-solid fa-magnifying-glass"
          >
            <FaSearch style={{ height: "50px", width: "50px" }} />
          </button>
        </div>
      </form>

      {error  && (
      <div className="not-found">
        <img src={errorimg} alt="Not Found" />
        <p>Oops! Invalid location :/</p>
      </div>
       )}


      <div className={weatherBoxClass}>
        <img style={{height:"200px",width:"200px",margin:"50px"}} src={wicon} alt="Weather Icon" />
        <h2 className="temperature">{temperature}°C</h2>
        <h2 className="description">{des}</h2>
      </div>

      <div className={weatherDetailsClass}>
        <div className="humidity">
          <FontAwesomeIcon
            icon={faWater}
            style={{
              color: "#06283D",
              fontSize: "30px",
              marginRight: "10px",
              marginTop: "-4px",
            }}
          />
          <div className="text">
            <span>{humidity}%</span>
            <p>Humidity</p>
          </div>
        </div>
        <div className="wind">
          <FontAwesomeIcon
            icon={faWind}
            style={{
              color: "#06283D",
              fontSize: "30px",
              marginRight: "10px",
              marginTop: "-4px",
            }}
          />
          <div className="text">
            <span>{wind}Km/h</span>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};
