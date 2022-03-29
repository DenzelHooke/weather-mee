import axios from 'axios';


async function GetGeoData (PLACENAME) {
  // Call api
  let res = await axios({
    method: 'get',
    url: 'https://api.opencagedata.com/geocode/v1/json',
    params: {
      q: PLACENAME,
      key: '19061c044dcc4c4e98a98a6c9f8e6c8e'
    }
  })
  return res
  // Return data
}

export default GetGeoData;