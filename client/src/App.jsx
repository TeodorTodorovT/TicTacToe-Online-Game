import { useContext } from 'react';
import ChatBox from './components/ChatBox';
import TicTacToeBoard from './components/TicTacToeBoard';
import JoinGame from './components/JoinGame';
import  {GameContext}  from './contexts/GameContext';

function App() {
    const { hasJoinedGame } = useContext(GameContext);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Tic-Tac-Toe
                </h1>
                {hasJoinedGame ? (
                    <>
                        <TicTacToeBoard />
                        <ChatBox />
                    </>
                ) : (
                    <JoinGame />
                )}
            </div>
        </div>
    );
}

export default App;
