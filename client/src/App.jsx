import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
    const [username, setUsername] = useState('');
    const [hasChosenName, setHasChosenName] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [hasChosenRoomId, setHasChosenRoomId] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen for private messages
        socket.on('private-message', ({ message, username }) => {
            setMessages((prev) => [...prev, `${username}: ${message}`]);
        });

        return () => {
            socket.off('private-message');
        };
    }, []);

    const joinRoom = () => {
        if (roomId.trim()) {
            socket.emit('join-room', roomId);
            setHasChosenRoomId(true);
        }
    };

    const sendMessage = () => {
        if (message.trim() && username && roomId) {
            socket.emit('private-message', { roomId, message, username });
            setMessage(''); // Clear the input
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Tic-Tac-Toe
                </h1>
                {hasChosenName && hasChosenRoomId ? (
                    <>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={sendMessage}
                                className="w-full mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                            >
                                Send Message
                            </button>
                        </div>

                        <div className="bg-gray-100 border border-gray-300 rounded-md p-4 h-48 overflow-y-auto">
                            <h2 className="text-lg font-bold mb-2 text-gray-700">
                                Messages:
                            </h2>
                            {messages.length > 0 ? (
                                messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className="mb-2 text-gray-800"
                                    >
                                        {msg}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">
                                    No messages yet...
                                </p>
                            )}
                        </div>
                    </>
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
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
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
