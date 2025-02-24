const dotenv=require("dotenv")
dotenv.config()
const express=require("express");
const app=express();
const cors=require("cors");
const connectToDB=require("./DB/db");
const userRoute=require("./routes/user");
const captainRoute=require("./routes/captain");
const cookieParser=require("cookie-parser");
const mapRoute=require("./routes/map.routes");
const rideRoute=require("./routes/ride.routes");

connectToDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Hello World")
});


app.use("/users",userRoute);
app.use("/captains",captainRoute);
app.use("/maps",mapRoute);
app.use("/rides",rideRoute)

module.exports=app;