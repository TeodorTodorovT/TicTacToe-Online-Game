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

    console.log(playerSymbol);

    useEffect(() => {
        socket.on('player-state', ({ symbol, turn }) => {
            setPlayerSymbol(symbol);
            setPlayerTurn(turn);
            setBoard(Array(9).fill(null))
            setWinner(null)
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
        <>
                        <h1 className="text-7xl font-bold text-center mb-6 text-green-600">
                    Tic-Tac-Toe
                </h1>
            {winner !== null ? (
                <>
                    
                    {winner === playerSymbol ? (
                        <div className="font-bold">You won!</div>
                    ) : (
                        <div className="font-bold">You Lost!</div>
                    )}
                    <button onClick={handleNewGame}>Play again?</button>
                </>
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
