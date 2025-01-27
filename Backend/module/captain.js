const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const captainSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[3,"First name must be at least 3 characters long"],
        },
        lastName:{
            type:String,
            minlength:[3,"Last name must be at least 3 characters long"],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        localStorage:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Invalid email"],
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive",
    },
    vehical:{
        color:{
            type:String,
            required:true,
            minlength:[3,"Color must be at least 3 characters long"],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,"Plate number must be at least 3 characters long"],
        },
        capicity:{
            type:Number,
            required:true,
            minlength:[1,"Capicity must be at least 1"],
        },
        vehicalType:{
            type:String,
            required:true,
            enum:["car","motorcycle","auto"],
        }
    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
});

captainSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"1d"});
}

captainSchema.methods.comparePassword = async function(password){   
    return await bcrypt.compare(password,this.password);
}   
captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;