const socketIo = require("socket.io");
const userModel = require("./module/user.js");
const captainModel = require("./module/captain");
let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on("join", async (data)=>{
            const {userId, userType} = data;
    
            if (userType === "user") {
                 await userModel.findByIdAndUpdate(userId, {socketId: socket.id});
            }else if(userType === "captain"){
                await captainModel.findByIdAndUpdate(userId, {socketId: socket.id});
             }
    
        })

        socket.on('update-location-captain',async(data)=>{
            const {userId,location}= data;

            if(!location || !location.ltd || !location.lng){
                return socket.emit('error',{message:"incalid location data"});
            }
            await captainModel.findByIdAndUpdate(userId,{
                location:{
                    ltd:location.ltd,
                    lng:location.lng,
            }});
        })

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    
}

function sendMessageToSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit("message", message);
    }
    else {
        console.log("Socket.io not initialized!");
    }
}

// Function to retrieve io instance
// function getIo() {
//     if (!io) {
//         throw new Error("Socket.io not initialized!");
//     }
//     return io;
// }

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};
