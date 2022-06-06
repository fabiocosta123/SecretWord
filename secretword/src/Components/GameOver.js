import "./GameOver.css";

const GameOver = ({ Retry }) => {
  return (
    <div>
      <h1>GameOver</h1>
      <button onClick={Retry}>Novo jogo</button>
    </div>
  );
};

export default GameOver;
