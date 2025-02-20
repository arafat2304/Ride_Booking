const express = require('express');
const router = express.Router();
const authMiddlewear=require("../midlewear/auth.midlewear");
const mapController=require("../controllers/map.controller");
const {query}=require("express-validator");

router.get("/get-coordinates",
    query('address').isString().isLength({min:3}),authMiddlewear.authUser,mapController.getCordinates);

module.exports=router;