import { useContext } from 'react';
import ChatBox from './components/ChatBox';
import TicTacToeBoard from './components/TicTacToeBoard';
import JoinGame from './components/JoinGame';
import  {GameContext}  from './contexts/GameContext';

function App() {
    const { hasJoinedGame } = useContext(GameContext);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="bg-gray-700 shadow-lg rounded-lg w-full max-w-md p-6">

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
