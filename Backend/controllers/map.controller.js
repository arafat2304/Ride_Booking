const { model } = require('mongoose');
const mapService = require('../services/map.services');
const {validationResult} = require('express-validator');

module.exports.getCordinates = async (req, res) => {
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({errors:validationResult(req).array()})
    }
    const { address } = req.query;
    console.log(address);
    try {
        const cordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(cordinates);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports.getDistanceTime = async (req, res) => {
    try{
        if(!validationResult(req).isEmpty()){
            return res.status(400).json({errors:validationResult(req).array()})
        }
        const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

module.exports.getSuggestions = async (req, res) => {
    try{
        if(!validationResult(req).isEmpty()){
            return res.status(400).json({errors:validationResult(req).array()})
        }
        const { input } = req.query;
        const suggestions = await mapService.getSuggestions(input);
        res.status(200).json(suggestions);
    }catch(error){
        res.status(400).json({error:error.message});
    }

}