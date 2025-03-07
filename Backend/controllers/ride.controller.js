const rideService = require("../services/ride.services");
const {validationResult} = require("express-validator");

module.exports.createRide = async (req, res) => {
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({messages:validationResult(req).array()});
    }

    const {userId,pickup,destination,vehicalType}=req.body;
    
    try{
        const ride = await rideService.createRide({user:req.user._id,pickup,destination,vehicalType});
        console.log(ride);  
        return res.status(201).json(ride);
    }catch(err){
        return res.status(500).json({messages:err.message})
    }
}