import React, { useState } from 'react';
import './Board.css';

const BOARD_SIZE = 20;

interface BoardState {
  squares: number[];
  player1Score: number;
  player2Score: number;
  isPlayer1Turn: boolean;
  gameOver: boolean;
}

const Board: React.FC = () => {
  const [state, setState] = useState<BoardState>({
    squares: Array(BOARD_SIZE * BOARD_SIZE).fill(0),
    player1Score: 0,
    player2Score: 0,
    isPlayer1Turn: true,
    gameOver: false,
  });

  // Helper function to check a line in any direction
  const checkLine = (squares: number[], startIndex: number, dx: number, dy: number): boolean => {
    const player = squares[startIndex];
    if (player === 0) return false;

    let count = 1;
    const row = Math.floor(startIndex / BOARD_SIZE);
    const col = startIndex % BOARD_SIZE;

    // Check forward
    let r = row + dy;
    let c = col + dx;
    while (
      r >= 0 && r < BOARD_SIZE && 
      c >= 0 && c < BOARD_SIZE && 
      squares[r * BOARD_SIZE + c] === player
    ) {
      count++;
      r += dy;
      c += dx;
    }

    // Check backward
    r = row - dy;
    c = col - dx;
    while (
      r >= 0 && r < BOARD_SIZE && 
      c >= 0 && c < BOARD_SIZE && 
      squares[r * BOARD_SIZE + c] === player
    ) {
      count++;
      r -= dy;
      c -= dx;
    }

    return count >= 5;
  };

  const checkWin = (squares: number[], index: number): boolean => {
    // Check horizontal
    if (checkLine(squares, index, 1, 0)) return true;
    
    // Check vertical
    if (checkLine(squares, index, 0, 1)) return true;
    
    // Check diagonal \
    if (checkLine(squares, index, 1, 1)) return true;
    
    // Check diagonal /
    if (checkLine(squares, index, 1, -1)) return true;

    return false;
  };

  const handleClick = (index: number) => {
    if (state.gameOver || state.squares[index] !== 0) return;

    const newSquares = [...state.squares];
    const currentPlayer = state.isPlayer1Turn ? 1 : 2;
    newSquares[index] = currentPlayer;

    const hasWon = checkWin(newSquares, index);
    
    if (hasWon) {
      setState(prevState => ({
        squares: newSquares,
        player1Score: state.isPlayer1Turn ? prevState.player1Score + 1 : prevState.player1Score,
        player2Score: !state.isPlayer1Turn ? prevState.player2Score + 1 : prevState.player2Score,
        isPlayer1Turn: prevState.isPlayer1Turn,
        gameOver: true
      }));

      setTimeout(() => {
        setState(prevState => ({
          squares: Array(BOARD_SIZE * BOARD_SIZE).fill(0),
          player1Score: prevState.player1Score,
          player2Score: prevState.player2Score,
          isPlayer1Turn: true,
          gameOver: false
        }));
      }, 1500);
    } else {
      setState(prevState => ({
        squares: newSquares,
        player1Score: prevState.player1Score,
        player2Score: prevState.player2Score,
        isPlayer1Turn: !prevState.isPlayer1Turn,
        gameOver: false
      }));
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>
        <span>
          <div 
            className="player-indicator black" 
            style={{ 
              display: 'inline-block',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              marginRight: '8px',
              verticalAlign: 'middle'
            }}
          />
          Black: {state.player1Score}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          <div 
            className="player-indicator white" 
            style={{ 
              display: 'inline-block',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              marginRight: '8px',
              verticalAlign: 'middle'
            }}
          />
          White: {state.player2Score}
        </span>
      </h2>
      {state.gameOver && (
        <h3 style={{ textAlign: 'center', color: '#4CAF50' }}>
          {state.isPlayer1Turn ? 'Black' : 'White'} wins!
        </h3>
      )}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        Current turn: 
        <div 
          className={`player-indicator ${state.isPlayer1Turn ? 'black' : 'white'}`}
          style={{ 
            display: 'inline-block',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            marginLeft: '8px',
            verticalAlign: 'middle'
          }}
        />
      </div>
      <div className="board">
        {Array(BOARD_SIZE).fill(null).map((_, row) => (
          Array(BOARD_SIZE).fill(null).map((_, col) => {
            const index = row * BOARD_SIZE + col;
            return (
              <div
                key={index}
                className={`intersection ${
                  state.squares[index] === 1 ? 'black' :
                  state.squares[index] === 2 ? 'white' : ''
                }`}
                style={{
                  top: row * 40,
                  left: col * 40,
                }}
                onClick={() => handleClick(index)}
              />
            );
          })
        ))}
      </div>
    </div>
  );
};

export default Board; 