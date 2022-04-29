import GetReverseGeoData from "../api/getReverseGeoData";
var root = document.querySelector('#root');

export const getGeoLocation = async () => {
  var location;

  return new Promise((resolve, reject) => {
    const allowed = async (data) => {
      // console.log(data);
      // console.log(success);
      location = await GetReverseGeoData(
        {
          lat: data.coords.latitude, 
          lng: data.coords.longitude
        }
      );
      console.log('done.')
      resolve(location);
    }
    
    const notAllowed = (error) => {
      switch(error.code) {
        case error.PERMISSION_DENIED: 
          reject("User denied the request for Geolocation");
          break;  
               
        case error.POSITION_UNAVAILABLE: 
          reject("Couldn't get users position");
          break;

        case error.TIMEOUT: 
          reject("The request to get user location timed out");
          break;

        case error.UNKOWN_ERROR: 
          reject("An unkown error occured.");
          break;
      }
    }
  
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(allowed, notAllowed);
      console.log(location);
  
    } else {
      console.log('Geolocation is not available in browser.')
    }
  }) //End of promise
}
 
