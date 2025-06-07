const mongoose=require("mongoose");


function connectToDB(){
    mongoose.connect(process.env.ATLASDB_URL,)
    .then(()=>{
        console.log("Database connected")
    })
    .catch(err => console.log(err));
}

module.exports=connectToDB