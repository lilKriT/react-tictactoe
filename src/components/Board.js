import Square from "./Square";

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} key={i} />;
  };

  let [rows, cols] = [3, 3];
  //   Array(rows)
  //     .fill("")
  //     .map((row, rowIndex) =>
  //       Array(cols)
  //         .fill("")
  //         .map((col, colIndex) => console.log(rowIndex * cols + colIndex))
  //     );

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
