const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow React app's origin
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    // Join a room based on a unique identifier (e.g., roomId)
    socket.on('join-room', ({roomID, username}) => {
      socket.join(roomID);

      const roomSize = io.sockets.adapter.rooms.get(roomID)?.size || 0;
      let playerSymbol = 'X';
      let playerTurn = true;

      if(roomSize > 1){
        playerSymbol = 'O';
        playerTurn = false;
      }

      
      socket.emit('player-state', {playerSymbol, playerTurn})
      console.log(`User ${username} joined room ${roomID}`);
    });
  
    // Handle private messages
    socket.on('private-message', ({ roomID, message, username }) => {
      // Emit the message to only the room
      console.log(`${username} said ${message} in ${roomID}`);
      
      io.to(roomID).emit('private-message', { message, username });
    });

  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
