import "./Game.css";

const Game = ({
  VerifyLetter,
  Guesses,
  GuessedLetters,
  Letters,
  Score,
  WrongLetters,
  PicketCategory,
  PicketWord,
} = {}) => {
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação:{Score}</span>
      </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra <span>{PicketCategory}</span>
      </h3>
      <p>Você ainda tem {Guesses} tentativas</p>
      <div className="wordContainer">
        {Letters.map((Letters, index) =>
          GuessedLetters.includes(Letters) ? (
            <span key={index} className="letter">
              {Letters}
            </span>
          ) : (
            <span key={index} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form>
          <input type="text" name="letter" maxLength="1" required />
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLetterContainer">
        <p>Letras já utilizadas</p>
        {WrongLetters.map(Letters, (index) => (
          <span key={index}>{Letters}, </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
