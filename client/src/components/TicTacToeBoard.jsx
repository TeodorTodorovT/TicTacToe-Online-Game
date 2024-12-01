import { useEffect, useState } from 'react';

const TicTacToeBoard = ({ socket }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [playerSymbol, setPlayerSymbol] = useState(undefined);
    const [playerTurn, setPlayerTurn] = useState(false);

    useEffect(() => {
        socket.on('player-state', ({ playerSymbol, playerTurn }) => {
            setPlayerSymbol(playerSymbol);
            setPlayerTurn(playerTurn);

            
        });

        return () => {
            socket.off('player-state');
        };
    }, []);

    const handleCellClick = (index) => {
        setBoard(oldBoard => oldBoard.map((item, i) => (i === index ? playerSymbol : item)))
        console.log(board);
        
    };
    return (
        <div className="grid grid-cols-3 gap-2 w-48">
            {board.map((cell, index) => (
                <div
                    key={index}
                    onClick={() => handleCellClick(index)}
                    className="w-16 h-16 bg-gray-200 border-2 border-gray-400 flex items-center justify-center text-2xl font-bold cursor-pointer"
                >
                    {cell}
                </div>
            ))}
        </div>
    );
};

export default TicTacToeBoard;
