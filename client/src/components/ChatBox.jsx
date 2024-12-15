import { useContext, useEffect, useRef, useState } from 'react';
import { GameContext } from '../contexts/GameContext';

const ChatBox = () => {
    const { username, roomID, socket } = useContext(GameContext);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messageEndRef = useRef(null); // Ref to the bottom of the messages container

    useEffect(() => {
        // Listen for private messages
        socket.on('private-message', ({ message, username }) => {
            setMessages((prev) => [...prev, { message, username }]);
        });

        return () => {
            socket.off('private-message');
        };
    }, []);

    useEffect(() => {
        // Scroll to the bottom whenever messages change
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const sendMessage = (e) => {
        if (e.key === 'Enter' || e._reactName === 'onClick') {
            if (message.trim() && username && roomID) {
                socket.emit('private-message', { roomID, message, username });
                setMessage(''); // Clear the input
            }
        }
    };

    return (
        <div className="flex flex-col">
            <div className="bg-gray-100 border border-b-0 border-gray-300 rounded-md p-4 h-48 overflow-y-auto max-w-80">
                <h2 className="text-lg font-bold mb-2 text-gray-700">
                    Messages:
                </h2>
                {messages.length > 0 ? (
                    messages.map((line, index) => (
                        <div key={index} className="mb-2 text-gray-800">
                            <p>
                                <span className="font-bold">{line.username}</span>: {line.message}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No messages yet...</p>
                )}
                {/* Add a div to mark the end of the messages */}
                <div ref={messageEndRef}></div>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={sendMessage}
                    className="w-full p-2 border border-t-0 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={sendMessage}
                    className="w-full mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                >
                    Send Message
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
