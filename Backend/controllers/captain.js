const captainModel = require("../module/captain");
const captainService = require("../services/captain");
const {validationResult} = require("express-validator");
const BlackListToken = require("../module/blaklistToken");

module.exports.registerCaptain = async (req,res)=>{
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({errors:validationResult(req).array()})
    }

    const isCaptainAlreadyExist = await captainModel.findOne({email:req.body.email});
    if(isCaptainAlreadyExist){
        return res.status(400).json({errors:"Captain already exist"});
    }
console.log(req.body)
    const {fullName,email,password,vehical} = req.body;
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({firstName:fullName.firstName,lastName:fullName.lastName,email,password:hashedPassword,color:vehical.color,plate:vehical.plate,capicity:vehical.capicity,vehicalType:vehical.vehicalType});
    const token = captain.generateAuthToken();

    res.status(201).json({captain,token});
}

module.exports.loginCaptain = async (req,res)=>{
    if(!validationResult(req).isEmpty()){
        return res.status(400).json({errors:validationResult(req).array()})
    }

    const {email,password} = req.body;
    const captain = await captainModel.findOne({email}).select("+password");

    if(!captain){
        return res.status(404).json({errors:"Invalid Email or password"});
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(400).json({errors:"Invalid Email or Password"});
    }

    const token = captain.generateAuthToken();
    res.cookie("token",token,);

    res.status(200).json({captain,token});
}

module.exports.getCaptainProfile = async (req,res)=>{
    res.status(200).json(req.captain);
}

module.exports.logout = async (req,res)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await BlackListToken.create({token});
    res.clearCookie("token");
    res.status(200).json({message:"Logged out successfully"});
}