const socketIO = require('socket.io');
const userModel = require('./models/User.model')
const captainModel = require('./models/Captain.model')


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
            const user = await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            if (user) {
            socket.join(`user_${userId}`);
            console.log(`User ${userId} joined room`);
            }
        } else if (role === 'captain') {
            const captain = await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            if (captain) {
            socket.join(`captain_${userId}`);
            console.log(`Captain ${userId} joined room`);
            }
        }
    })


    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, event, message) {
  if (io) {
    io.to(socketId).emit(event, message);
  } else {
    console.error('Socket.io not initialized.');
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };