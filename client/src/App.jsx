import { useContext } from 'react';
import ChatBox from './components/ChatBox';
import TicTacToeBoard from './components/TicTacToeBoard';
import JoinGame from './components/JoinGame';
import { GameContext } from './contexts/GameContext';

function App() {
    const { hasJoinedGame, username, roomID } = useContext(GameContext);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <h1 className="text-7xl font-bold text-center mb-6 text-green-600">
                Tic-Tac-Toe
            </h1>
            <div className="bg-gray-700 shadow-lg rounded-lg w-full max-w-fit p-6 flex gap-4 flex-col">
                {hasJoinedGame ? (
                    <>
                        <div className="flex gap-2 text-gray-100">
                            <p>
                                Name: <span className='font-bold text-lg'>{username}</span>
                            </p>
                            <p>
                                Room: <span className='font-bold text-lg'>{roomID}</span>
                            </p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-3">
                        <TicTacToeBoard />
                        <ChatBox />
                        </div>
                    </>
                ) : (
                    <JoinGame />
                )}
            </div>
        </div>
    );
}

export default App;
