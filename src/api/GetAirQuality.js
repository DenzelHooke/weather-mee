import axios from 'axios';

async function GetAirQuality (location) {
  // Call api
  let res = await axios({
    method: 'get',
    
    url: 'https://api.openweathermap.org/data/2.5/air_pollution?',
    params: {
      lat: location.geometry.lat,
      lon: location.geometry.lng,
      appid: '8ca3fde957f091863552acf62b87f6a9',
    }
  })
  return res.data
  // Return data
}

export default GetAirQuality;
