import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:3000');

const ChatBox = ({username, roomID, socket}) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    console.log(messages);
    



    useEffect(() => {
        // Listen for private messages
        socket.on('private-message', ({message, username }) => {
            setMessages((prev) => [...prev, `${username}: ${message}`]);
        });

        return () => {
            socket.off('private-message');
        };
    }, []);


    const sendMessage = () => {
        if (message.trim() && username && roomID) {
            
            socket.emit('private-message', {roomID, message, username});
            setMessage(''); // Clear the input
        }
    };

   
    return (
        <>
            <div className="bg-gray-100 border border-gray-300 rounded-md p-4 h-48 overflow-y-auto">
                <h2 className="text-lg font-bold mb-2 text-gray-700">
                    Messages:
                </h2>
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} className="mb-2 text-gray-800">
                            {msg}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No messages yet...</p>
                )}
            </div>
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
        </>
    );
};

export default ChatBox;
