const axios = require('axios');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        console.log(response);
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