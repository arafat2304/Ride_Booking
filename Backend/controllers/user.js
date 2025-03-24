const userModel=require("../module/user");
const userServices=require("../services/user");
const {validationResult}=require("express-validator");
const BlacklistToken = require("../module/blaklistToken.js")

module.exports.registerUser=async (req,res)=>{

    if(!validationResult(req).isEmpty()){
        return res.status(400).json({errors:validationResult(req).array()})
    }
    const {fullName,email,password}=req.body;
    const isUserAlreadyExist=await userModel.findOne({email});
    if(isUserAlreadyExist){
        return res.status(400).json({errors:"User already exist"});
    }

    const hashedPassword=await userModel.hashPassword(password);

    const user=await userServices.createUser({firstName:fullName.firstName,lastName:fullName.lastName,email,password:hashedPassword});
    const token=user.generateAuthToken();

    res.status(201).json({user,token});
}

module.exports.loginUser=async (req,res)=>{
if(!validationResult(req).isEmpty()){
    return res.status(400).json({errors:validationResult(req).array()})
}

    const {email,password}=req.body;
    const user=await userModel.findOne({email}).select("+password");

    if(!user){
        return res.status(404).json({errors:"User Not Found"});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(404).json({errors:"Invalid Email or Password"});
    }

    const token=user.generateAuthToken();
    res.cookie("token",token);

    res.status(200).json({user,token});
}

module.exports.getProfile=async (req,res)=>{
    res.status(200).json(req.user);
}    

module.exports.logout=async (req,res)=>{
    res.clearCookie("token");

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await BlacklistToken.create({token});
    res.status(200).json({message:"Logged out successfully"});
}
    
