import "./GameOver.css";

const GameOver = ({ Retry, Score }) => {
  return (
    <div>
      <h1>Fim de Jogo !</h1>
      <h2>
        A sua pontuação foi de: <span>{Score}</span>
      </h2>
      <button onClick={Retry}>Novo jogo</button>
    </div>
  );
};

export default GameOver;
