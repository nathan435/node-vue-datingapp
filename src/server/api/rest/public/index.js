const express = require('express');

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const {
    googleMapsGetGeolocationFromInput,
    googleMapsGetGeolocationFromCoordinates,
    getCityFromGoogleResults
} = require('../../services/googleMaps');

const publicRouter = express();

publicRouter.get('/public/geolocation/input', [
    check('input').exists()
], async (req, res) => {
    try {
        validationResult(req).throw();
        const data = matchedData(req);

        const googleResult = await googleMapsGetGeolocationFromInput(data.input);
        console.log(googleResult.address_components);
        return res.json({
            geolocation: {
                formattedAddress: googleResult.formatted_address,
                coordinates: googleResult.geometry.location,
                city: getCityFromGoogleResults(googleResult)
            }
        });
    } catch (e) {
        if (e.mapped) return res.json({ errors: e.mapped() });
        console.log(e);
        return res.json({});
    }
})

publicRouter.get('/public/geolocation/coordinates', [
    check('lat').exists(),
    check('lng').exists()
], async (req, res) => {
    try {
        validationResult(req).throw();
        const data = matchedData(req);

        const googleResult = await googleMapsGetGeolocationFromCoordinates([data.lat, data.lng]);
        console.log(googleResult);
        return res.json({
            geolocation: {
                formattedAddress: googleResult.formatted_address,
                coordinates: {
                    lat: data.lat,
                    lng: data.lng
                },
                city: getCityFromGoogleResults(googleResult)
            }
        });
    } catch (e) {
        if (e.mapped) return res.json({ errors: e.mapped() });
        console.log(e);
        return res.json({});
    }
})

module.exports = publicRouter;