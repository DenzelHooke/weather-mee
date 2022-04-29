import axios from 'axios';

async function GetAirQuality (location) {
  // Call api
  let res = await axios({
    method: 'get',
    
    url: 'https://api.openweathermap.org/data/2.5/air_pollution?',
    params: {
      lat: location.geometry.lat,
      lon: location.geometry.lng,
      appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
    }
  })
  return res.data
  // Return data
}

export default GetAirQuality;
