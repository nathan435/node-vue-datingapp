import api from './axios'



const getGeolocationByInput = (input) => {
    return api.get('/public/geolocation/input?input=' + input);
}

const getGeolocationByCoordinates = (coordinates) => {
    console.log(coordinates)
    return api.get('/public/geolocation/coordinates?lat=' + coordinates[0] + '&lng=' + coordinates[1]);
}

export default {
    getGeolocationByInput,
    getGeolocationByCoordinates
}