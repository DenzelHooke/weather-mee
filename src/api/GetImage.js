import axios from 'axios';

async function GetImageFromQuery(formatted_name) {
  const res = await axios({
    method: 'GET',

    url: 'https://api.pexels.com/v1/search?',
    params: {
      query: formatted_name,
      per_page: 5,
      orientation: 'landscape',
      size: 'medium',
    },
    headers: {
      "Authorization": process.env.REACT_IMAGE_API,
    }
  })

  return res.data;
}

export default GetImageFromQuery;