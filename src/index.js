import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import "./index.css";

// Todo clean this up
const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  // States
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  // Clicking on the squares
  const handleClick = (i) => {
    const historyTemp = history.slice(0, stepNumber + 1);
    const currentTemp = historyTemp[historyTemp.length - 1];
    const squaresTemp = currentTemp.squares.slice();

    if (calculateWinner(squaresTemp) || squaresTemp[i]) {
      return;
    }

    squaresTemp[i] = xIsNext ? "X" : "O";

    setHistory(
      historyTemp.concat([
        {
          squares: squaresTemp,
        },
      ])
    );

    setStepNumber(historyTemp.length);
    setXIsNext(historyTemp.length % 2 === 0);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const historyTemp = history;
  const current = historyTemp[stepNumber];
  const winner = calculateWinner(current);

  const moves = historyTemp.map((step, move) => {
    const desc = move ? "Go to move " + move : "Go to game start";

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] == squares[b] && squares[b] == squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
