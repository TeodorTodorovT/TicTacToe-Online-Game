const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow your React app's origin
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    // Join a room based on a unique identifier (e.g., roomId)
    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });
  
    // Handle private messages
    socket.on('private-message', ({ roomId, message, username }) => {
      // Emit the message to only the room
      io.to(roomId).emit('private-message', { message, username });
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
