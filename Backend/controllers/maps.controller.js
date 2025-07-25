const mapsService = require('../services/maps.service')
const {validationResult} = require('express-validator')

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {address} = req.query

    try{
        const coordinates = await mapsService.getAddressCoordinates(address)
        res.status(200).json({success: true, data: coordinates})

    } catch(error) {
        console.error('Error fetching coordinates:', error)
        res.status(500).json({success: false, message: 'Failed to fetch coordinates', error: error.message})
    }
}

module.exports.getDistanceTime = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { pickup, destination } = req.query;

        const distanceTime = await mapsService.getDistanceTime(pickup, destination);

        res.status(200).json(distanceTime);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await mapsService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}