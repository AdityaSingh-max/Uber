const mapService = require('../services/maps.service')
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinates(address);
        res.json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Failed to fetch coordinates', error: error.message });
    }
}

module.exports.getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceAndTime(origin, destination);
        res.json(distanceTime);
    } catch(error){
        res.status(404).json({ message: 'Failed to fetch distance and time', error: error.message });
    }
}    


module.exports.getSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const { input } = req.query;
        const suggestions = await mapService.getSuggestions(input);
        res.json(suggestions);
    } catch(error){
        res.status(404).json({ message: 'Failed to fetch suggestions', error: error.message });
    }
}    