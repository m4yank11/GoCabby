const socketIO = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on('join', async(data) => {
        const { userId, role } = data;
        if (role === 'user') {
            await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            socket.join(`user_${userId}`);
            console.log(`User ${userId} joined room`);
        } else if (role === 'captain') {
            await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            // ✨ CHANGE 1: Add every online captain to a single, shared room
            socket.join('available_captains_room'); 
            console.log(`Captain ${userId} joined the 'available_captains_room'`);
        }
    });

    socket.on('disconnect', async () => {
      console.log(`Client disconnected: ${socket.id}`);
      // ✨ CHANGE 2: Add logic to clear the socketId from the DB on disconnect.
      // This prevents issues in other parts of your app that might rely on the socketId.
      await captainModel.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
    });
  });
}

// This function is still useful for user-specific messages
function sendMessageToSocketId(socketId, event, message) {
  if (io) {
    io.to(socketId).emit(event, message);
  }
}

// ✨ CHANGE 3: Create a new function to broadcast to the captains' room
function broadcastToCaptains(event, data) {
    if (io) {
        io.to('available_captains_room').emit(event, data);
    }
}

module.exports = { 
  initializeSocket, 
  sendMessageToSocketId, 
  broadcastToCaptains // Export the new function
};