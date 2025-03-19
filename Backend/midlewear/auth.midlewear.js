const userModel = require("../module/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const BlackListToken=require("../module/blaklistToken")
const captainModel = require('../module/captain');


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ errors: 'Unauthorized' });
    }

    let isBlacklisted = await BlackListToken.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ errors: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ errors: 'User not found' });
        }

        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ errors: 'Unauthorized' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
console.log(token)
    if (!token) {
        return res.status(401).json({ errors: 'token' });
    }

    let isBlacklisted = await BlackListToken.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ errors: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        console.log(decoded._id)
        // if (!captain) {
        //     return res.status(404).json({ errors: 'Captain not found' });
        // }

        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({ errors: 'Unauthorized' });
    }
}