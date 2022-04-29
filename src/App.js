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
import { getGeoLocation } from './helpers/geoLocation';

import './App.css';



//? Very first React project I made. Could refactor using Redux.

function App() {
  const [contentState, setContentState] = useState('blank');
  const [address, setAddress] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [locationImage, setLocationImage] = useState(null);
  const [gettingLocation, setGettingLocation] = useState(null);

  const Main = {
    blank: () => '',
    name: () => (<div>name</div>),
    loading: () => (<Loading />),
    weather: () => (<Weather weatherData={weatherData} geoData={geoData} airQuality={airQuality} locationImage={locationImage}/>),
  }
  
  const onChange = (input_val) => {
    setAddress(input_val);
    console.log(input_val);
  }

  const onSearch = async (getLocation) => {
    const per_page = 10;
    let geoData;

    try {
      if (!address && !getLocation) return;

      setContentState('loading'); 
      if(getLocation) {
        geoData = await getGeoLocation();
        console.log(geoData);
      } else {
        geoData = await GetGeoData(address);
      }



      setGeoData(geoData.data.results[0]);
      // console.log(geoData.data.results[0])

      const formatted  = geoData.data.results[0].formatted ? geoData.data.results[0].formatted : 'city';
      const photos = await GetImageFromQuery(formatted, per_page, 'landscape', 'large');

      const photo = pickRandomImageUrl(photos, 'original');
      setLocationImage(photo);

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
      { <Search onClick={onSearch} onChange={onChange} address={address} contentState={contentState}/> }
      { Main[contentState]() }
    </div>
  );
}

export default App;
