const { Server } = require("socket.io");
const userModel = require("./models/user.model")
const captainModel = require("./models/captain.model")

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);

        socket.on('join', async (data) => {
            const {userId, userType} = data;

            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socketId
                });
            } else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId, {
                    socketId: socketId
            });
          }
        })

        socket.on('update-location-captain', async(data)=>{
            const {userId, location} = data;

            if(!location, !location.ltd, !location.lng){
                return socket.emit('error', {message: 'Invalid location data'})
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
                
            });
        })

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    return io;
}

function sendMessageToSocketId(socketId, messageObject) {
    if (!io) {
        console.log("Socket.io is not initialized");
        return;
    }

    io.to(socketId).emit(messageObject.event, messageObject.data);
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};