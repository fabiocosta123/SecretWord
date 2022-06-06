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

  // start secret word game
  const StartGame = () => {
    SetGameStage(Stages[1].name);
  };

  // process the letter input

  const VerifyLetter = () => {
    SetGameStage(Stages[2].name);
  };

  // end the game
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
