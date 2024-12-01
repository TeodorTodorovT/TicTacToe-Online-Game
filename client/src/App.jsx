import { useState } from 'react';
import { io } from 'socket.io-client';
import ChatBox from './components/ChatBox';
import TicTacToeBoard from './components/TicTacToeBoard';
import JoinGame from './components/JoinGame';

const socket = io('http://localhost:3000');

function App() {
    const [username, setUsername] = useState('');
    const [roomID, setRoomID] = useState('');
    const [hasJoinedGame, setHasJoinedGame] = useState(false)



    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Tic-Tac-Toe
                </h1>
                {hasJoinedGame ? (
                    <>
                        <TicTacToeBoard socket={socket}/>
                        <ChatBox
                            username={username}
                            roomID={roomID}
                            socket={socket}
                        />
                    </>
                ) : (
                    <JoinGame roomID={roomID} socket={socket} username={username} setUsername={setUsername} setRoomID={setRoomID} setHasJoinedGame={setHasJoinedGame}/>
                )}
            </div>
        </div>
    );
}

export default App;
