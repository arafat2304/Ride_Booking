const rideService = require("../services/ride.services");
const {validationResult} = require("express-validator");
const mapService = require("../services/map.services");

module.exports.createRide = async (req, res) => {
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({messages:validationResult(req).array()});
    }

    const {userId,pickup,destination,vehicalType}=req.body;
    
    try{
        const ride = await rideService.createRide({user:req.user._id,pickup,destination,vehicalType});
        res.status(201).json(ride);

        const pickupCoordinate = await mapService.getAddressCoordinate(pickup);
        console.log(pickupCoordinate);

        const captainInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinate.lng,pickupCoordinate.lat, 2);
        console.log(captainInRadius);
    }catch(err){
        // res.status(500).json({messages:err.message})
        console.log(err.message)
    }
}

module.exports.getFare = async (req, res) => {
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({messages:validationResult(req).array()});
    }

    const {pickup,destination}=req.query;

    try{
        const fare = await rideService.getFare(pickup,destination);
        return res.status(200).json(fare);
    }catch(err){
        return res.status(500).json({messages:err.message})
    }
}