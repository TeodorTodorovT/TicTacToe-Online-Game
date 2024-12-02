/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const TicTacToeBoard = ({ socket }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [playerSymbol, setPlayerSymbol] = useState(undefined);
    const [playerTurn, setPlayerTurn] = useState(false);
    const [winner, setWinner] = useState(null);

    // console.log(`Board: ${board}`);
    // console.log(`Player symbol: ${playerSymbol}`);
    // console.log(`Is it players turn: ${playerTurn}`);
    // console.log(`Did player win: ${winner}`);

    useEffect(() => {
        socket.on('player-state', ({ symbol, turn }) => {
            setPlayerSymbol(symbol);
            setPlayerTurn(turn);
        });

        socket.on('player-move', ({ updatedBoard, result, nextTurn }) => {
            console.log(nextTurn);
            console.log(playerSymbol);

            setBoard(updatedBoard);
            if (result !== null) {
                setWinner(result);
            }
            if (nextTurn === playerSymbol) {
                setPlayerTurn(true);
            } else {
                setPlayerTurn(false);
            }
        });

        return () => {
            socket.off('player-state');
            socket.off('player-move');
        };
    }, []);

    const handleCellClick = (index) => {
        const isMoveLegal = board[index] === null;

        if (playerTurn && isMoveLegal) {
            socket.emit('player-move', { board, index });
        }
    };
    return (
        <>
            {winner !== null ? (
                winner === playerSymbol ? (
                    <div className="font-bold">You won</div>
                ) : (
                    <div className="font-bold">You Lost</div>
                )
            ) : null}
            <div className="grid grid-cols-3 gap-2 w-48 disabled">
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
        </>
    );
};

export default TicTacToeBoard;
