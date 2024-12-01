/* eslint-disable react/prop-types */

const JoinGame = ({roomID, socket, username, setHasChosenRoomID, setUsername, setRoomID, setHasJoinedGame}) => {


    const joinRoom = () => {
        if (roomID.trim()) {
            socket.emit('join-room', { roomID, username });
            setHasJoinedGame(true);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Choose a name..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
    );
};

export default JoinGame;
