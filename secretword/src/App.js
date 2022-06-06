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
  console.log(words);

  return (
    <div className="App">
      {GameStage === "start" && <StartScreen />}
      {GameStage === "game" && <Game />}
      {GameStage === "end" && <GameOver />}
    </div>
  );
}

export default App;
