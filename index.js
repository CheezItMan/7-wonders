const axios = require('axios');
require('dotenv').config();

const LOCATIONIQ_KEY = process.env['API_KEY'];

const findLatitudeAndLongitude = (location) => {
  let latitude, longitude;
  axios.get('https://us1.locationiq.com/v1/search.php',
  {
    params: {
      key: LOCATIONIQ_KEY,
      q: location,
      format: 'json'
    }
  })
  .then( (response) => {
    latitude = response.data[0].lat;
    longitude = response.data[0].lon;
    console.log(`${location} is at (${latitude}, ${longitude})`);
  })
  .catch( (error) => {
    console.log('error in findLatitudeAndLongitude!');
  });

  return {
      seattleLat: latitude,
      seattleLon: longitude
  }
}

// getLocations
// Go through the array of locations
// and use the API to find each location
// Make each API call after 1000 ms
const getLocations = () => {
  const locations = [
    "Great Wall of China",
    "Petra",
    "Colosseum",
    "Chichen Itza",
    "Machu Picchu",
    "Taj Mahal",
    "Christ the Redeemer",
  ];

  // Every 1000 ms call findLatitudeAndLongitude
  // After finishing the array, end the interval.
  let currentIndex = 0;
  const intervalObj = setInterval(() => {
    const coordinates = findLatitudeAndLongitude(locations[currentIndex]);

    currentIndex += 1;

    // If we've found all the locations stop the interval
    if (currentIndex >= locations.length) {
      clearInterval(intervalObj);
    }
  }, 1000)
}

getLocations();
