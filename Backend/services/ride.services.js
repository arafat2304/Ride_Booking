const rideModel = require("../module/ride")
const mapServices = require('./map.services');
const {getDistanceTime} = mapServices;
const crypto = require('crypto');

async function getFare(origin,destination){
    if(!origin || !destination){
        throw new Error("Invalid origin or destination");
    }
    // logic to calculate fare
    const distanceTime = await getDistanceTime(origin,destination);
    

    const baseFare={
        auto:30,
        car:50,
        motorcycle:20
    }

    const prKmRate={
        auto:10,
        car:15,
        motorcycle:8
    }

    const perMinuteRate={
        auto:2,
        car:3,
        motorcycle:1.5
    }

    const fare={
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value/1000) * prKmRate.auto) + ((distanceTime.duration.value/60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value/1000) * prKmRate.car) + ((distanceTime.duration.value/60) * perMinuteRate.car)),
        motorcycle:Math.round(baseFare.motorcycle + ((distanceTime.distance.value/1000) * prKmRate.motorcycle) + ((distanceTime.duration.value/60) * perMinuteRate.motorcycle)),
    }
    
    
    return fare;
}

module.exports.getFare = getFare;

function generateOtp(num){
    const otp = crypto.randomInt(Math.pow(10,num-1),Math.pow(10,num)).toString();
    return otp;
}

module.exports.createRide = async ({user,pickup, destination, vehicalType}) => {
    
    if(!user || !pickup || !destination || !vehicalType){
        throw new Error("Invalid input");
    }

    const fare = await getFare(pickup,destination);

    const ride = new rideModel({
        user,
        pickup,
        destination,
        otp:generateOtp(6),
        fare:fare[vehicalType],
    })

    return ride;
}

module.exports.confirmRide = async({rideId,captain})=>{
    if(!rideId){
        throw new Error("Invalid rideId");
    }

    console.log("this is "+captain)
    const response=await rideModel.findOneAndUpdate({_id:rideId},{status:"confirmed",captain:captain._id});
    const ride = await rideModel.findOne({_id:rideId}).populate("user").populate("captain").select("+otp");

    if(!ride){
        throw new Error("Ride not found");
    }

    return ride;
};