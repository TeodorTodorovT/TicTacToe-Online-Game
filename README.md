# Online Tic Tac Toe Game

An interactive online Tic Tac Toe game built using **React**, **Express**, and **Socket.io**. This project allows two players to connect and play Tic Tac Toe in real-time.

## Game Preview

Check out the game in action:

https://github.com/user-attachments/assets/92aca1ed-874a-4418-97b0-d21d0e5e2d93



## Features

- **Real-Time Multiplayer:** Play against another player online with instant updates using Socket.io.
- **Interactive UI:** A clean and simple React-based interface.
- **Cross-Platform Compatibility:** Accessible on both desktop and mobile devices.
- **Backend-Powered Logic:** Game state and logic managed through an Express server.

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **Tailwind CSS**: For styling the game board and components.

### Backend
- **Express**: To handle server-side logic and API endpoints.
- **Socket.io**: For real-time communication between players.

## Installation

### Prerequisites
- Node.js and npm installed on your machine.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/TeodorTodorovT/TicTacToe-Online-Game.git
   cd TicTacToe-Online-Game
   ```

2. Install dependencies for both the client and server:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Start the backend server:
   ```bash
   cd server
   npm start
   ```
   Alternatively, for development mode with live-reload:
   ```bash
   npm run dev
   ```

4. Start the frontend development server:
   ```bash
   cd ../client
   npm run dev
   ```
   The development server runs on `http://localhost:5173/`.

   To build and preview the frontend for production:
   ```bash
   npm run build
   npm run preview
   ```
   The preview server runs on `http://localhost:4173/`.

5. Open your browser and navigate to the appropriate address to start playing.


## Usage

1. Open the game in your browser.
2. Enter your name and a room ID to join a game.
3. Share the room ID with a friend to play together in real-time.

## Contribution

Contributions are welcome! Please open an issue or create a pull request if you have suggestions or improvements.

---

Enjoy playing Tic Tac Toe online!

