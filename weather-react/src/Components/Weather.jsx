import React, { useEffect, useRef, useState } from 'react'
import './weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import clear_icon_night from '../assets/clearnight.png'
import cloud_icon from '../assets/cloud.png'
import cloud_icon_night from '../assets/cloudnight.png'
import drizzle_icon from '../assets/drizzle.png'
import drizzle_icon_night from '../assets/drizzlenight.png'
import rain_icon from '../assets/rain.png'
import rain_icon_night from '../assets/rainnight.png'
import snow_icon from '../assets/snow3.png'
import snow_icon_night from '../assets/snownight.png'
import wind_icon from '../assets/wind.png'
import haze_icon from '../assets/haze.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

   const inputRef=useRef()


    const [weatherData,setWeatherData]=useState( {humidity: 0,
        windSpeed: 0,
        temperature: 0,
        location: "Loading...",
        icon: clear_icon,
        condition: "Loading...", 
    });



   

    
    const search = async (city) => {
      if (city === "") {
        alert("Enter the city name");
        return;
      }

    try{
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

        const response =await fetch(url);
        const data =await response.json();
        if(!response.ok){
            alert(data.message)
            return;
        }
        console.log(data);
        if (data.cod !== 200) {
            throw new Error(data.message || "City not found");
        }

       
        const iconMap = {
            Clouds: cloud_icon,
            Clear: clear_icon,
            Rain: rain_icon,
            Mist: haze_icon,
            Drizzle: drizzle_icon,
            Haze: haze_icon,
            Thunderstorm: cloud_icon,
            Snow: snow_icon,
        };
       

        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: iconMap[data.weather[0].main] || clear_icon,
          condition: data.weather[0].main,
        });
    }
    catch(error){
        console.error("Error fetching weather data:", error);
    }
}

useEffect(()=>{
    search("Delhi");
},[])


  return (
  <div className="Weather">
    <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search the city"/>
        <img  src={search_icon}  onClick={() => search(inputRef.current.value)}
          style={{ cursor: "pointer" }} />
    </div>
    {weatherData  ? (
  <>
    <img src={weatherData.icon} alt="" className="weather-icon" />
    <p className="weather-condition">{weatherData.condition}</p>
    <p className="temperature">{weatherData.temperature}°C</p>
    <p className="location">{weatherData.location}</p>
    <div className="weather-data">
      <div className="column">
        <img src={humidity_icon} alt="humidity icon" />
        <div>
          <p>{weatherData.humidity}%</p>
          <span>Humidity</span>
        </div>
      </div>
      <div className="column">
        <img src={wind_icon} alt="wind icon" />
        <div>
          <p>{weatherData.windSpeed} km/h</p>
          <span>Wind Speed</span>
        </div>
      </div>
    </div>
  </>
) : (

     <p>Loading weather data...</p>
  
)}
    </div>
  );
}

export default Weather
