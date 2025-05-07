const rideService = require("../services/ride.services");
const {validationResult} = require("express-validator");
const mapService = require("../services/map.services");
const {sendMessageToSocketId} = require("../socket");
const rideModel = require("../module/ride");

module.exports.createRide = async (req, res) => {
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({messages:validationResult(req).array()});
    }

    const {userId,pickup,destination,vehicalType}=req.body;
    
    try{
        
        const distance = await mapService.getDistanceTime(pickup,destination);
        const ride = await rideService.createRide({user:req.user._id,pickup,destination,vehicalType,});
        ride.distance=distance.distance.text;
        ride.duration=distance.duration.text;
        ride.save();
        res.status(201).json(ride);

        const pickupCoordinate = await mapService.getAddressCoordinate(pickup);

        const captainInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinate.lat,pickupCoordinate.lng,10);
        ride.otp="";

        const rideWithUser = await rideModel.findById(ride._id).populate("user");

        captainInRadius.map(captain => {
            // console.log("Sending ride to captain:", captain._id);
            sendMessageToSocketId(captain.socketId,{
                event:"new-ride",
                data:rideWithUser
            })
        });
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

module.exports.confirmRide = async (req,res)=>{

    if(!validationResult(req).isEmpty()){
        return res.status(400).json({messages:validationResult(req).array()});
    }

    const rideId = req.body.rideId;

    try{
        const ride = await rideService.confirmRide({rideId,captain:req.body.captain});

        sendMessageToSocketId(ride.user.socketId,{
            event:"ride-confirmed",
            data:ride
        });
        return res.status(200).json(ride);
    }catch(err){
        return res.status(500).json({messages:err.message})
    }
}


module.exports.startRide = async (req,res)=>{
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({messages:validationResult(req).array()});
    }

    const {rideId,otp} = req.query;

    try{
        const ride = await rideService.startRide({rideId,otp});
        sendMessageToSocketId(ride.user.socketId,{
            event:"ride-started",
            data:ride
        });
        return res.status(200).json(ride);
    }catch(err){
        return res.status(500).json({messages:err.message})
    }
}

module.exports.endRide = async (req,res)=>{
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({messages:validationResult(req).array()});
    }
console.log("hii")
    const {rideId} = req.body;
    try{
        const ride = await rideService.endRide({rideId,captain:req.captain});
        sendMessageToSocketId(ride.user.socketId,{
            event:"ride-ended",
            data:ride
        });
        return res.status(200).json(ride);
    }catch(err){
        return res.status(500).json({messages:err.message})
    }
}