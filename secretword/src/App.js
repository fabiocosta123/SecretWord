// CSS

import "./App.css";

// Components
import StartScreen from "./Components/StartScreen";
import Game from "./Components/Game";
import GameOver from "./Components/GameOver";

// data
import { wordsList } from "./Data/word";

// React
import { useCallback, useEffect, useState } from "react";

const Stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const GuessesQtd = 3;
function App() {
  const [GameStage, SetGameStage] = useState(Stages[0].name);
  const [words] = useState(wordsList);

  const [PicketWord, SetPicketWord] = useState("");
  const [PicketCategory, SetPicketCategory] = useState("");
  const [Letters, SetLetters] = useState([]);
  const [GuessedLetters, SetGuessedLetters] = useState([]);
  const [WrongLetters, SetWrongLetters] = useState([]);
  const [Guesses, SetGuesses] = useState(GuessesQtd);
  const [Score, SetScore] = useState(0);

  const PicketWordAndPicketCategory = useCallback(() => {
    // picket a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category);

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    console.log(word);

    return { word, category };
  }, [words]);

  // start secret word game
  const StartGame = useCallback(() => {
    // clear all letter
    ClearLetterStates();
    //Picket word and picket PicketCategory
    const { word, category } = PicketWordAndPicketCategory();

    // create an array of letter

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word, category);
    console.log(wordLetters);

    // fill states
    SetPicketWord(word);
    SetPicketCategory(category);
    SetLetters(wordLetters);

    SetGameStage(Stages[1].name);
  }, [PicketWordAndPicketCategory]);

  // process the letter input

  const VerifyLetter = (Letter) => {
    const NormalizedLetter = Letter.toLowerCase();

    // check if letter has already been utillized
    if (
      GuessedLetters.includes(NormalizedLetter) ||
      WrongLetters.includes(NormalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a guess
    if (Letters.includes(NormalizedLetter)) {
      SetGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        NormalizedLetter,
      ]);
    } else {
      SetWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        NormalizedLetter,
      ]);
      SetGuesses((actualGuessedLetters) => actualGuessedLetters - 1);
    }
  };

  const ClearLetterStates = () => {
    SetGuessedLetters([]);
    SetWrongLetters([]);
  };
  // check if guesses ended
  useEffect(() => {
    if (Guesses <= 0) {
      // reset all States

      ClearLetterStates();

      SetGameStage(Stages[2].name);
    }
  }, [Guesses]);

  // check win conditions
  useEffect(() => {
    const UniqueLetter = [...new Set(Letters)];

    // win conditions
    if (GuessedLetters.length === UniqueLetter.length) {
      // add Score
      SetScore((actualScore) => {
        actualScore += 100;
      });

      // restart game witch new word
      StartGame();
    }
  }, [GuessedLetters, Letters, StartGame]);

  // restart the game
  const Retry = () => {
    SetScore(0);
    SetGuesses(GuessesQtd);
    SetGameStage(Stages[0].name);
  };

  return (
    <div className="App">
      {GameStage === "start" && <StartScreen StartGame={StartGame} />}
      {GameStage === "game" && (
        <Game
          VerifyLetter={VerifyLetter}
          PicketWord={PicketWord}
          PicketCategory={PicketCategory}
          Letters={Letters}
          GuessedLetters={GuessedLetters}
          WrongLetters={WrongLetters}
          Score={Score}
          Guesses={Guesses}
        />
      )}
      {GameStage === "end" && <GameOver Retry={Retry} Score={Score} />}
    </div>
  );
}

export default App;
