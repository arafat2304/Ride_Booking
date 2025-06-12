const userModel = require("../module/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const BlackListToken=require("../module/blaklistToken")
const captainModel = require('../module/captain');


module.exports.authUser = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    

    if (!token) {
        return res.status(401).json({ message: 'token is not exist Unauthorized' });
    }


    const isBlacklisted = await BlackListToken.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded);
        const user = await userModel.findById(decoded._id)
        console.log("user", user);
        req.user = user;

        return next();

    } catch (err) {
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired. Please login again.' });
    }
    return res.status(401).json({ message: 'Invalid token.' });
}

}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[ 1 ];
    


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await BlackListToken.findOne({ token: token });



    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const captain = await captainModel.findById(decoded._id)
        req.captain = captain;

        return next()
    } catch (err) {
        console.log(err);

        res.status(401).json({ message: 'Unauthorized' });
    }
}