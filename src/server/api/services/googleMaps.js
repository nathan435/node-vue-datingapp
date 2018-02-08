const axios = require('axios');

const {
    GOOGLE_MAPS_GEOCODING_API_KEY
} = process.env;


const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';

const googleMapsGetGeolocationFromInput = async (input) => {
    const googleResult = await axios.get(`${baseUrl}address=${input}&region=Germany&key=${GOOGLE_MAPS_GEOCODING_API_KEY}`);
    return googleResult.data.results[0];
}

const googleMapsGetGeolocationFromCoordinates = async (geolocation) => {
    const lat = geolocation[0];
    const lng = geolocation[1];
    const googleResult = await axios.get(`${baseUrl}latlng=${lat},${lng}&key=${GOOGLE_MAPS_GEOCODING_API_KEY}`);
    return googleResult.data.results[0];
}

module.exports = {
    googleMapsGetGeolocationFromInput,
    googleMapsGetGeolocationFromCoordinates
}