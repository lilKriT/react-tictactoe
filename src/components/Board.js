import Square from "./Square";

const Board = ({ squares, onClick, winnerSquares }) => {
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        key={i}
        isWinner={winnerSquares.includes(i)}
      />
    );
  };

  let [rows, cols] = [3, 3];

  return (
    <div>
      {Array(rows)
        .fill("")
        .map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {Array(cols)
              .fill("")
              .map((col, colIndex) => renderSquare(rowIndex * cols + colIndex))}
          </div>
        ))}
    </div>
  );
};

export default Board;
