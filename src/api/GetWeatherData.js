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
      appid: '8ca3fde957f091863552acf62b87f6a9',
    }
  })
  return res
  // Return data
}

export default GetWeatherData;