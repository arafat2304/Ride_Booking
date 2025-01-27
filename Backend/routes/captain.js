const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const captainController = require("../controllers/captain");
const auth = require("../midlewear/auth.midlewear");

router.post("/register",[
    body("fullName.firstName").isLength({min:3}).withMessage("First name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body("vehical.color").isLength({min:3}).withMessage("Color must be at least 3 characters long"),
    body("vehical.plate").isLength({min:3}).withMessage("Plate number must be at least 3 characters long"),
    body("vehical.capicity").isLength({min:1}).withMessage("Capicity must be at least 1"),
    body("vehical.vehicalType").isIn(["car","motorcycle","auto"]).withMessage("Invalid vehicle type"),
],captainController.registerCaptain);

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
],captainController.loginCaptain);

router.get("/profile",auth.authCaptain,captainController.getCaptainProfile);

router.get("/logout",auth.authCaptain,captainController.logout);

module.exports=router;