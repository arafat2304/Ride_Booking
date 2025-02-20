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
}