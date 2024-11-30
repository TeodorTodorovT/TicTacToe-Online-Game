import { useState} from 'react';
import { io } from 'socket.io-client';
import ChatBox from './components/ChatBox';

const socket = io('http://localhost:3000');

function App() {
    const [username, setUsername] = useState('');
    const [hasChosenName, setHasChosenName] = useState(false);
    const [roomID, setRoomID] = useState('');
    const [hasChosenRoomID, setHasChosenRoomID] = useState(false);





    const joinRoom = () => {
        if (roomID.trim()) {
            socket.emit('join-room', {roomID, username});
            setHasChosenRoomID(true);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Tic-Tac-Toe
                </h1>
                {hasChosenName && hasChosenRoomID ? (
                    <ChatBox username={username} roomID={roomID} socket={socket}/>
                ) : (
                    <>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Choose a name..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={() => setHasChosenName(true)}
                                className="w-full mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                            >
                                Set Name
                            </button>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Room ID"
                                value={roomID}
                                onChange={(e) => setRoomID(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={joinRoom}
                                className="w-full mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                            >
                                Join/Create Room
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
