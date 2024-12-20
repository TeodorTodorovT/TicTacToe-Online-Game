import { createContext, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export const GameContext = createContext();

const GameProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [roomID, setRoomID] = useState('');
    const [hasJoinedGame, setHasJoinedGame] = useState(false);
    const [symbol, setSymbol] = useState('');
 
    return (
        <GameContext.Provider
            value={{
                username,
                setUsername,
                roomID,
                setRoomID,
                hasJoinedGame,
                setHasJoinedGame,
                socket,
                symbol,
                setSymbol
            }}
        >
            {children}
        </GameContext.Provider>
    );
};


export default GameProvider;