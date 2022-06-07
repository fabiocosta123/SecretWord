// CSS

import "./App.css";

// Components
import StartScreen from "./Components/StartScreen";
import Game from "./Components/Game";
import GameOver from "./Components/GameOver";

// data
import { wordsList } from "./Data/word";

// React
import { useState, useEffect, useCallback } from "react";

const Stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];
function App() {
  const [GameStage, SetGameStage] = useState(Stages[0].name);
  const [words] = useState(wordsList);

  const [PicketWord, SetPicketWord] = useState("");
  const [PicketCategory, SetPicketCategory] = useState("");
  const [Letters, SetLetters] = useState([]);

  const PicketWordAndPicketCategory = () => {
    // picket a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category);

    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    console.log(word);

    return { word, category };
  };

  // start secret word game
  const StartGame = () => {
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
    SetLetters(Letters);

    SetGameStage(Stages[1].name);
  };

  // process the letter input

  const VerifyLetter = () => {
    SetGameStage(Stages[2].name);
  };

  // restart the game
  const Retry = () => {
    SetGameStage(Stages[0].name);
  };

  return (
    <div className="App">
      {GameStage === "start" && <StartScreen StartGame={StartGame} />}
      {GameStage === "game" && <Game VerifyLetter={VerifyLetter} />}
      {GameStage === "end" && <GameOver Retry={Retry} />}
    </div>
  );
}

export default App;
