const rideService = require("../services/ride.services");
const {validationResult} = require("express-validator");

module.exports.createRide = async (req, res) => {
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {userId,pickUp,destination,vehicalType}=req.body;

    try{
        const ride = rideService.createRide({user:userId,pickUp,destination,vehicalType});
        return res.status(201).json(ride);
    }catch(err){
        return res.status(500).json({messages:err.message})
    }
}