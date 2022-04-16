import { useState, useEffect } from 'react';

import React from 'react';
import moment from 'moment-timezone';
// moment = require('moment-timezone');
const Weather = ({ weatherData, geoData, airQuality }) => {
  useEffect(() => {
    document.querySelector('.search-wrapper').classList.add('weather-state');
  }, [])
  const [current, setCurrent] = useState({});

  useEffect(() => {
    setCurrent(weatherData.data.current);
  }
  , [weatherData])
  const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  const air = [
    {
      class: 'air-good',
      value: 'Good'
    },
    {
      class: 'air-fair',
      value: 'Fair'
    },
    {
      class: 'air-moderate',
      value: 'Moderate'
    },
    {
      class: 'air-poor',
      value: 'Poor'
    },
    {
      class: 'air-verypoor',
      value: 'Very Poor'
    }
  ]

  const weather = weatherData.data.current.weather[0];
  const id = weatherData.data.current.weather[0].icon;
  const date = moment.unix(current.dt).tz(geoData.annotations.timezone.name);
  // console.log(date)



  // console.log(weatherData)
  // console.log(geoData)
  return (
    <div className="weather-container">
      <div className="immediate content">
        <div className="location-name">
          <h2>{geoData.formatted}</h2>
        </div>
        <div className="location-details">
          <div>
            <p>
              {date.format('h:mm A')} {weekdays[date.isoWeekday()]}
            </p>
          </div>
        </div>
      <div className="weekly">
        {
          weatherData.data.daily.map((item, index) => {
            console.log(item)
            if (index > 0) {
              return (
                <div className="weekly-item" key={index}>
                    <span className="item-day">
                      {moment(moment.unix(item.dt)).local().format('ddd')}
                    </span>
                    <span className="item-icon">
                      <img
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        className="forecast-icon"
                        alt="Weather forecast"
                      />
                    </span>
                    <br />
                    <div className="min-max">
                      <span className="item-max">
                        {Math.round(item.temp.max)}&deg;
                      </span>
                      <span className="item-min">{Math.round(item.temp.min)}&deg;</span>
                    </div>
                </div>
              )
            }
          })
        }
      </div>
    </div>

      <div className="weather-state data">
        <div class="main-weather-wrapper">
          <div className="main-weather-state-wrapper">
            <img
              src={`http://openweathermap.org/img/wn/${id}@4x.png`}
              className="weather-picture"
              alt="Current Weather Image"
            />
            <div className="weather-type">{weather.main}</div>
          </div>
          <div className="main-weather-temp">
              <div className="current-temp flex-inline">
                <span className="noticable-text">{Math.round(current.temp)} &deg;</span>
                <div className="secondary-data__item__middle temp-middle"></div>
                <span className="flat-text">Current</span>
              </div>
              <div className="feelsLike-temp flex-inline">
                <span className="noticable-text">{Math.round(current.feels_like)}&deg;</span>
                <div className="secondary-data__item__middle temp-middle"></div>
                <span className="flat-text">Feels like</span>
              </div>
          </div>
        </div>
        <div className="secondary-data">
          <div className="secondary-data__item">
            <div className="secondary-data__item__type space-text flat-text">Humidity(%)</div>
            <div className="secondary-data__item__middle"></div>
            <div className="secondary-data__item__value noticable-text">{current.humidity}</div>
          </div>
          <div className="secondary-data__item">
            <div className="secondary-data__item__type space-text flat-text">Wind (Meters/s)</div>
            <div className="secondary-data__item__middle"></div>
            <div className="secondary-data__item__value noticable-text">{current.wind_speed}</div>
          </div>
          <div className="secondary-data__item">
            <div className="secondary-data__item__type space-text flat-text">Air Quality</div>
            <div className="secondary-data__item__middle"></div>
            <div className={`secondary-data__item__value noticable-text ${air[airQuality.list[0].main.aqi].class}`}>{air[airQuality.list[0].main.aqi].value}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather