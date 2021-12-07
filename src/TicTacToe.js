import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const emptyBoard = Array(9).fill("");

  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winner, setWinner] = useState(null);

  const handCellClick = (index) =>{

    if (winner) {

      return null;
    }

    if (board[index] !== "") {
      return null;
    }

  setBoard(board.map((cells, cellsIndex) => cellsIndex === index ? currentPlayer : cells));
   
   setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  const checkWinner = () => {


    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

      possibleWaysToWin.forEach(cells => {
        if(cells.every((cells) => cells === "O")) setWinner("O");
        if(cells.every((cells) => cells === "X")) setWinner("X");
      });
  };

  const checkDraw = () => {
    if (board.every((cell) => cell !== "")&& winner === null) {setWinner("E");
  }
  }

  checkDraw();

  useEffect(checkWinner, [board]);

  const resetGame = () => {
    setCurrentPlayer("O");
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
    <main>
      <h1 className="title">Jogo da Velha</h1>

      <div className={`board ${winner ? "game-over" : ""}`}>
        {board.map((cells, index) => (
          <div key={index} 
            className={`cell ${cells}`}
            onClick={() => handCellClick(index)}
          >
            {cells}
          </div>
        ))}
      </div>
      
      {winner &&
        <footer>
          {winner === "E" ? 
            <h2 className="winner-message">
              <span className={winner}>Empatou!</span>
            </h2>
          :
            <h2 className="winner-message">
              <span className={winner}>{winner}</span> venceu!
            </h2>
          }
          <button onClick={resetGame}>Recomeçar Jogo</button>
        </footer>
      }
    </main>
  );
}

export default TicTacToe;
