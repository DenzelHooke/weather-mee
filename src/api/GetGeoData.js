import axios from 'axios';


async function GetGeoData (PLACENAME) {
  // Call api
  let res = await axios({
    method: 'get',
    url: 'https://api.opencagedata.com/geocode/v1/json',
    params: {
      q: PLACENAME,
      key: process.env.REACT_APP_OPEN_CAGE_KEY,
    }
  })
  return res
  // Return data
}

export default GetGeoData;