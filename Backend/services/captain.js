const captainModel = require("../module/captain");

module.exports.createCaptain= async ({firstName,lastName,email,password,color,plate,capicity, vehicalType})=>{
    console.log(firstName,lastName,email,password,color,plate,capicity, vehicalType);
    if(!firstName  || !email || !password || !color || !plate || !capicity || !vehicalType){
        throw new Error("All fields are required")
    }

    const captain = captainModel.create({
        fullName:{
            firstName,
            lastName,
        },
        email,
        password,
        vehical:{
            color,
            plate,
            capicity,
            vehicalType
        }
    })

    return captain;
}