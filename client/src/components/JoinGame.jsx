import { useContext } from 'react';
import { GameContext } from '../contexts/GameContext';

const JoinGame = () => {
    const {
        socket,
        username,
        setUsername,
        roomID,
        setRoomID,
        setHasJoinedGame,
    } = useContext(GameContext);

    const joinRoom = () => {
        if (roomID.trim()) {
            socket.emit('join-room', { roomID, username });
            setHasJoinedGame(true);
        }
    };

    return (
        <>                <h1 className="text-7xl font-bold text-center mb-6 text-green-600 animate-pulse">
        Tic-Tac-Toe
    </h1>
            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Choose a name..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-500 focus:scale-y-110 focus:scale-x-105 transition-all duration-400 ease-linear"
                />
                <input
                    type="text"
                    placeholder="Room ID"
                    value={roomID}
                    onChange={(e) => setRoomID(e.target.value)}
                    className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-500 focus:scale-y-110 focus:scale-x-105 transition-all duration-400 ease-linear"
                />
                <button
                    onClick={joinRoom}
                    className="w-full mt-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all duration-400 ease-linear hover:scale-y-110 hover:scale-x-105"
                >
                    Join/Create Room
                </button>
            </div>
        </>
    );
};

export default JoinGame;
