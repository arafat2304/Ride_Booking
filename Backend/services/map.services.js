const axios = require('axios');
const captainModel = require("../module/captain");

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status === "OK"){
            const location= response.data.results[0].geometry.location;
            return{
                lat: location.lat,
                lng: location.lng
            }
        }else{
            throw new Error("Invalid address");
        }
    }catch(error){
        console.log(error);
        throw new Error("Invalid address");
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error("Invalid origin or destination");
    }
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status === "OK"){
           if(response.data.rows[0].elements[0].status === "ZERO_RESULTS"){
                throw new Error("Invalid origin or destination");
           }   

           return response.data.rows[0].elements[0];
        }else{
            throw new Error("Invalid origin or destination");
        }
    }catch(error){
        console.log(error);
        throw new Error("Invalid origin or destination");
    }

}

module.exports.getSuggestions = async (input) => {

    if(!input){
        throw new Error("query is required");
    }
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status === "OK"){
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        }else{
            throw new Error("unable to fetch suggestions");
        }
    }catch(error){
        console.log(error);
        throw new Error("Invalid input");
    }
}

module.exports.getCaptainsInTheRadius = async (ltd,lng, radius) => {

       
    // const captains = await captainModel.find({
    //     location: {
    //         $geoWithin: {
    //             $centerSphere: [ [ 23.024349, 72.5301521 ], radius / 6371 ]
    //         }
    //     }
    // });

    const captains = await captainModel.find({});

    return captains;

       

}