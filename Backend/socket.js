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
            console.log(data)
            const {userId,location}= data;
            // if(!location || !location.ltd || !location.lng){
            //     return socket.emit('error',{message:"incalid location data"});
            try {
                await captainModel.findByIdAndUpdate(userId, {location});
        
                console.log("Location updated successfully");
            } catch (error) {
                console.error("Error updating location:", error);
                socket.emit('error', { message: "Database error" });
            }
        })

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });

    
}

function sendMessageToSocketId(socketId, messageObject) {
    // console.log("Sending message to socket:", socketId, messageObject);
    if (io) {
        io.to(socketId).emit(messageObject.event,messageObject.data);
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
