const axios = require('axios');

const LOCATIONIQ_KEY = process.env['API_KEY'];

const findLatitudeAndLongitude = (query) => {
  let latitude, longitude;
  axios.get('https://us1.locationiq.com/v1/search.php',
  {
    params: {
      key: LOCATIONIQ_KEY,
      q: 'Seattle, Washington, USA',
      format: 'json'
    }
  })
  .then( (response) => {
    latitude = response.data[0].lat;
    longitude = response.data[0].lon;
    console.log('success in findLatitudeAndLongitude!', latitude, longitude);
  })
  .catch( (error) => {
    console.log('error in findLatitudeAndLongitude!');
  });

  return {
      seattleLat: latitude,
      seattleLon: longitude
  }
}

const findLocation = (latitude, longitude) => {
  axios.get('https://us1.locationiq.com/v1/reverse.php',
  {
    params: {
      key: LOCATIONIQ_KEY,
      format: 'json',
      lat: latitude,
      lon: longitude
    }
  })
  .then( (response) => {
    console.log('success in findLocation!', response.data);
    return response.data;
  })
  .catch( (error) => {
    console.log('error in findLocation!');
  });
}

const seattleCoordinates = findLatitudeAndLongitude('Seattle, Washington, USA');

const locations = findLocation(seattleCoordinates.seattleLat, seattleCoordinates.seattleLon);

console.log(locations);