/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from 'react';
import { GameContext } from '../contexts/GameContext';

const TicTacToeBoard = () => {
    const { socket, roomID } = useContext(GameContext);

    const [board, setBoard] = useState(Array(9).fill(null));
    const [playerSymbol, setPlayerSymbol] = useState(undefined);
    const [playerTurn, setPlayerTurn] = useState(false);
    const [winner, setWinner] = useState(null);

    // Use ref to hold the latest value of playerSymbol
    const playerSymbolRef = useRef();

    // Update the ref whenever playerSymbol changes
    useEffect(() => {
        playerSymbolRef.current = playerSymbol;
    }, [playerSymbol]);

    useEffect(() => {
        socket.on('player-state', ({ symbol, turn }) => {
            setPlayerSymbol(symbol);
            setPlayerTurn(turn);
            setBoard(Array(9).fill(null));
            setWinner(null);
        });

        socket.on('player-move', ({ updatedBoard, result, nextTurn }) => {
            setBoard(updatedBoard);
            if (result !== null) {
                setWinner(result);
            }
            setPlayerTurn(nextTurn === playerSymbolRef.current);
        });

        return () => {
            socket.off('player-state');
            socket.off('player-move');
        };
    }, []);

    const handleCellClick = (index) => {
        const isMoveLegal = board[index] === null;

        if (playerTurn && isMoveLegal && winner === null) {
            socket.emit('player-move', { board, index, playerSymbol });
        }
    };

    const handleNewGame = () => {
        socket.emit('new-game', { roomID });
    };
    return (
        <div>
            {winner !== null ? (
                <div className='flex flex-col'>
                    {winner === playerSymbol ? (
                        <div className="font-bold text-3xl text-green-600 text-center">You won!</div>
                    ) : (
                        <div className="font-bold text-3xl text-red-600 text-center">You Lost!</div>
                    )}
                    <button onClick={handleNewGame} className='text-gray-100'>Play again?</button>
                </div>
            ) : null}
            <div className="grid grid-cols-3 disabled">
                {board.map((cell, index) => (
                    <div
                        key={index}
                        onClick={() => handleCellClick(index)}
                        className="w-24 h-24 bg-gray-200 border-2 border-gray-400 flex items-center justify-center text-6xl font-bold cursor-pointer"
                    >
                        {cell}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicTacToeBoard;
