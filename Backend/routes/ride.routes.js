const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const rideControllers = require("../controllers/ride.controller");
const auth = require("../midlewear/auth.midlewear");

router.post("/create",
    body('pickup').isString().isLength({min:3}).withMessage("Invalid pickup address"),
    body('destination').isString().isLength({min:3}).withMessage("Invalid destination address"),
    body('vehicalType').isString().isIn(["auto","car","motorcycle"]).withMessage("Invalid vehical type"),
    auth.authUser,
    rideControllers.createRide
)

module.exports = router;