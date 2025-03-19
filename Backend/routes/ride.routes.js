const express = require('express');
const router = express.Router();
const {body,query} = require("express-validator");
const rideControllers = require("../controllers/ride.controller");
const auth = require("../midlewear/auth.midlewear");

router.post("/create",
    body('pickup').isString().isLength({min:3}).withMessage("Invalid pickup address"),
    body('destination').isString().isLength({min:3}).withMessage("Invalid destination address"),
    body('vehicalType').isString().isIn(["auto","car","motorcycle"]).withMessage("Invalid vehical type"),
    auth.authUser,
    rideControllers.createRide
)

router.get("/getFare",auth.authUser,
    query('pickup').isString().isLength({min:3}).withMessage("Invalid pickup address"),
    query('destination').isString().isLength({min:3}).withMessage("Invalid destination address"),
    rideControllers.getFare
)

router.post("/confirm",auth.authCaptain,
    body('rideId').isMongoId().withMessage("Invalid ride id"),
    rideControllers.confirmRide
)

module.exports = router;