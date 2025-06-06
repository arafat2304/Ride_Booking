const mongoose = require('mongoose');
const { dropSearchIndex } = require('./blaklistToken');

const rideSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Captain",
    },
    pickup:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    fare:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:["pending","accepted","ongoing","completed","cancelled"],
        default:"pending",
    },
    duration:{
        type:String,
    }, // in seconds
    distance:{
        type:String,
    }, // in meters
    paymentId:{
        type:String,
    },
    orderId:{
        type:String,
    },
    signature:{
        type:String,
    },
    otp:{
        type:String,
        select:false,
        required:true,
    },
})

const rideModel = mongoose.model("ride",rideSchema);

module.exports = rideModel;