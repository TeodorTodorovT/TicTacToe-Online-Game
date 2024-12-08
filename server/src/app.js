const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Allow React app's origin
        methods: ['GET', 'POST'],
    },
});

const winningCombos = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Top-left to bottom-right diagonal
    [2, 4, 6], // Top-right to bottom-left diagonal
];

const isWinner = (board) => {
    for (const combination of winningCombos) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // Returns 'X' or 'O' as the winner
        }
    }
    return null; // No winner
};

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join a room based on a unique identifier (e.g., roomId)
    socket.on('join-room', ({ roomID, username }) => {
        socket.join(roomID);

        const room = io.sockets.adapter.rooms.get(roomID) || new Set();
        const roomSize = room.size;

        let symbol = roomSize === 1 ? 'X' : 'O';
        let turn = roomSize === 1;

        socket.emit('player-state', { symbol, turn });
        console.log(`User ${username} joined room ${roomID}`);

        socket.on('player-move', ({ board, index, playerSymbol }) => {
            const isMoveLegal = board[index] === null;

            if (!isMoveLegal) {
                console.log(`Illegal move attempted by ${socket.id}`);
                return; // Ignore illegal moves
            }

            const updatedBoard = [...board];
            updatedBoard[index] = playerSymbol;
            const result = isWinner(updatedBoard);
            console.log(symbol);

            const nextTurn = playerSymbol === 'X' ? 'O' : 'X';

            io.to(roomID).emit('player-move', {
                updatedBoard,
                result,
                nextTurn,
            });
        });
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

server.listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://192.168.1.3:3000');
});
