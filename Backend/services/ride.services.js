const rideModel = require("../module/ride")
const mapServices = require('./map.services');
const {getDistanceTime} = mapServices;

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
        auto: baseFare.auto + (distanceTime.distance * prKmRate.auto) + (distanceTime.time * perMinuteRate.auto),
        car: baseFare.car + (distanceTime.distance * prKmRate.car) + (distanceTime.time * perMinuteRate.car),
        motorcycle:baseFare.motorcycle + (distanceTime.distance * prKmRate.motorcycle) + (distanceTime.time * perMinuteRate.motorcycle),
    }
    
    return fare;
}

module.exports.createRide = async ({user, pickUp, destination, vehicalType}) => {
    if(!user || !pickUp || !destination || !vehicalType){
        throw new Error("Invalid input");
    }

    const fare = await getFare(pickUp,destination);

    const ride = new rideModel({
        user,
        pickUp,
        destination,
        fare:fare[vehicalType],
    })

    return ride.save();
}

