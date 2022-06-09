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

const guessesQtd = 3;
function App() {
  const [gameStage, setGameStage] = useState(Stages[0].name);
  const [words] = useState(wordsList);

  const [picketWord, setPicketWord] = useState("");
  const [picketCategory, setPicketCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQtd);
  const [score, setScore] = useState(0);

  const picketWordAndPicketCategory = useCallback(() => {
    // picket a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  // start secret word game
  const startGame = useCallback(() => {
    // clear all letter
    clearLetterStates();
    //Picket word and picket PicketCategory
    const { word, category } = picketWordAndPicketCategory();

    // create an array of letter

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // fill states
    setPicketWord(word);
    setPicketCategory(category);
    setLetters(wordLetters);

    setGameStage(Stages[1].name);
  }, [picketWordAndPicketCategory]);

  // process the letter input

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been utillized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuessedLetters) => actualGuessedLetters - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };
  // check if guesses ended
  useEffect(() => {
    if (guesses <= 0) {
      // reset all States

      clearLetterStates();

      setGameStage(Stages[2].name);
    }
  }, [guesses]);

  // check win conditions
  useEffect(() => {
    const uniqueLetter = [...new Set(letters)];

    // win conditions
    if (guessedLetters.length === uniqueLetter.length) {
      // add Score

      setScore((actualScore) => (actualScore += 100));

      // restart game witch new word
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  // restart the game
  const retry = () => {
    setScore(0);
    setGuesses(guessesQtd);
    setGameStage(Stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          picketWord={picketWord}
          picketCategory={picketCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          score={score}
          guesses={guesses}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
