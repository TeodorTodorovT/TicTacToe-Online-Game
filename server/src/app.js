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

            const nextTurn = playerSymbol === 'X' ? 'O' : 'X';

            io.to(roomID).emit('player-move', {
                updatedBoard,
                result,
                nextTurn,
            });
        });


        socket.on('new-game', ({ roomID }) => {
            const room = io.sockets.adapter.rooms.get(roomID);
        
            if (room) {
                const players = Array.from(room); // Get all socket IDs in the room
        
                // Toggle symbols and turns
                const player1 = players[0]; // Assume the first player is already 'X'
                const player2 = players[1]; // Assume the second player is already 'O'
        
                const player1NewSymbol = 'O';
                const player2NewSymbol = 'X';
                const player1Turn = false;
                const player2Turn = true;
        
                // Notify both players with updated symbols and turns
                io.to(player1).emit('player-state', { symbol: player1NewSymbol, turn: player1Turn });
                io.to(player2).emit('player-state', { symbol: player2NewSymbol, turn: player2Turn });
        
                console.log(`Started new game in room ${roomID}.`);
            } else {
                console.log(`Room ${roomID} does not exist or is empty.`);
            }
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
    console.log('Server running on http://localhost:3000');
});
