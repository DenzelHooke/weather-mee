import axios from "axios";

async function GetImageFromQuery(formatted_name, per_page) {
    const res = await axios.get(`https://api.pexels.com/v1/search`, {
        headers: {
            authorization: "563492ad6f917000010000015104cbea62cf42f185edabe089135d48",
        },
        params: {
            query: formatted_name,
            per_page: per_page,
        }
    })
    console.log(res.data)
    return res.data.photos;
}

export default GetImageFromQuery;