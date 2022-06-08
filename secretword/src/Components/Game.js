import "./Game.css";
import { useState, useRef } from "react";

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
  const [Letter, SetLetter] = useState("");
  const LetterinputRef = useRef(null);

  const HandleSubmit = (e) => {
    e.preventDefault();

    VerifyLetter(Letter);
    SetLetter("");
    LetterinputRef.current.focus();
  };

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
        {Letters.map((Letters, i) =>
          GuessedLetters.includes(Letters) ? (
            <span key={i} className="letter">
              {Letters}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={HandleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => SetLetter(e.target.value)}
            value={Letter}
            ref={LetterinputRef}
          />
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLetterContainer">
        <p>Letras já utilizadas</p>
        {WrongLetters.map((Letters, (i) => <span key={i}>{Letters}, </span>))}
      </div>
    </div>
  );
};

export default Game;
