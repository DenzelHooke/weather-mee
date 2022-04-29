import axios from "axios";

async function GetImageFromQuery(formatted_name, per_page, orientation, size) {
    const res = await axios.get(`https://api.pexels.com/v1/search`, {
        headers: {
            authorization: process.env.REACT_APP_PEXELS_API,
        },
        params: {
            query: formatted_name,
            per_page: per_page,
            orientation: orientation,
            size: size,
        }
    })
    console.log(res.data)
    return res.data.photos;
}

export default GetImageFromQuery;