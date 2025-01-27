const express= require("express");
const router=express.Router();
const {body}=require("express-validator");
const userControler=require("../controllers/user");
const authMiddlewear=require("../midlewear/auth.midlewear");


router.post("/register",[
    body("email").isEmail().withMessage("Email is not valid"),
    body("fullName.firstName").isLength({min:3}).withMessage("First name must be at least 3 characters long"),
   body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long")
],userControler.registerUser);

router.post("/login",[
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long")
],userControler.loginUser);

router.get("/getProfile",authMiddlewear.authUser,userControler.getProfile);

router.get("/logout",authMiddlewear.authUser,userControler.logout);

module.exports=router;
