import { useEffect, useState } from 'react';
import logo from './logo.svg';
import Loading from './components/Loading'
import Search from './components/Search'
import GetGeoData from './api/GetGeoData'
import GetWeatherData from './api/GetWeatherData'
import GetAirQuality from './api/GetAirQuality'
import Weather from './components/Weather'
import './App.css';

//? Very first React project I made. Could refactor using Redux.

function App() {
  const [contentState, setContentState] = useState('blank');
  const [address, setAddress] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [geoData, setGeoData] = useState(null);

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
    try {
      setContentState('loading');
      const geoData = await GetGeoData(address);
      setGeoData(geoData.data.results[0]);
      setAirQuality(geoData.data.results[0]);
      setAddress(geoData.data.results[0].formatted)
      const weatherRes = await GetWeatherData(geoData.data.results[0]);
      setWeatherData(weatherRes);
      setContentState('weather');
      
    } catch (error) {
      setContentState('blank');
      setWeatherData(null);
      setGeoData(null);
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
