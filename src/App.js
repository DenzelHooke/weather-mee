import { useEffect, useState } from 'react';
import logo from './logo.svg';
import Loading from './components/Loading'
import Search from './components/Search'
import GetGeoData from './api/GetGeoData'
import GetWeatherData from './api/GetWeatherData'
import GetAirQuality from './api/GetAirQuality'
import Weather from './components/Weather'
import pickRandomImageUrl from './helpers/images.js';
import GetImageFromQuery from './api/GetImage';
import './App.css';



//? Very first React project I made. Could refactor using Redux.

function App() {
  const [contentState, setContentState] = useState('blank');
  const [address, setAddress] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [locationImage, setLocationImage] = useState(null);

  useEffect(() => {

    document.body.style.backgroundImage = `url('${locationImage}')`;
    // document.body.style.backgroundPosition = 'center center';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    console.log(document.body.style.backgroundImage); 
    // console.log(locationImage)
  }, [locationImage])

  const Main = {
    blank: () => '',
    name: () => (<div>name</div>),
    loading: () => (<Loading />),
    weather: () => (<Weather weatherData={weatherData} geoData={geoData} airQuality={airQuality}/>),
  }
  
  const onChange = (input_val) => {
    setAddress(input_val);
    console.log(input_val);
  }

  const onSearch = async () => {
    const per_page = 10;

    try {
      if (!address) return;

      setContentState('loading');
      const geoData = await GetGeoData(address);
      setGeoData(geoData.data.results[0]);

      const formatted  = geoData.data.results[0].formatted ? geoData.data.results[0].formatted : 'city';
      const photos = await GetImageFromQuery(formatted, per_page);

      const photo = pickRandomImageUrl(photos);
      setLocationImage(photo);
      console.log(photos);

      const airQual = await GetAirQuality(geoData.data.results[0]);
      setAirQuality(airQual);
      
      setAddress(geoData.data.results[0].formatted);
      const weatherRes = await GetWeatherData(geoData.data.results[0]);
      setWeatherData(weatherRes);
      setContentState('weather');
      
    } catch (error) {
      setContentState('blank');
      setWeatherData(null);
      setGeoData(null);
      setAddress('');
    }
  }

  return (
    <div className="main-container">
      { <Search onClick={onSearch} onChange={onChange} address={address}/> }
      { Main[contentState]() }
    </div>
  );
}

export default App;
