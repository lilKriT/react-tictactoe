const Square = (props) => {
  const { isWinner } = props;
  return (
    <button
      className={"square" + (true ? " winner" : "")}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Square;
