import axios from 'axios';


async function GetWeatherData (location) {
  // Call api
  let res = await axios({
    method: 'get',
    url: 'https://api.openweathermap.org/data/2.5/onecall?',
    params: {
      lat: location.geometry.lat,
      lon: location.geometry.lng,
      units: 'metric',
      appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
    }
  })
  return res
  // Return data
}

export default GetWeatherData;