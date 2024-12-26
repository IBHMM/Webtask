import React, { useState, useEffect } from "react";
import "./index.css";
import { message } from "antd";
import "antd/dist/reset.css";
import { data } from "./assets/data";
import Header from "./components/Header";
import Rules from "./components/Rules";
import AlphabetContainer from "./components/AlphabetContainer";
import Buttons from "./components/Buttons";


function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  const [hint, setHint] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [dataPool, setDataPool] = useState([...data]);
  const [inputValues, setInputValues] = useState([]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0 && gameStarted) {
      endGame();
    }
  }, [timer, gameStarted]);

  // Add a keyboard event listener for letter inputs
  useEffect(() => {
    const handleKeyPress = (event) => {
      const letter = event.key.toLowerCase(); // Convert to lowercase to match our letters
      if (gameStarted && /^[a-z]$/.test(letter)) {
        handleLetterClick(letter);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress); // Cleanup event listener
    };
  }, [gameStarted, currentWord, inputValues]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setDataPool([...data]);
    setTimer(30);
    chooseRandomWord();
  };

  const chooseRandomWord = () => {
    if (dataPool.length > 0) {
      const randomIndex = Math.floor(Math.random() * dataPool.length);
      const wordObj = dataPool[randomIndex];
      setCurrentWord(wordObj.word);
      setHint(wordObj.hint);
      setInputValues(new Array(wordObj.word.length).fill(""));
      setDataPool(dataPool.filter((_, index) => index !== randomIndex));
    } else {
      endGame();
    }
  };

  const endGame = () => {
    message.info(`Game Over! Your score is ${score}.`); 
    setGameStarted(false);
    setCurrentWord("");
    setHint("");
    setInputValues([]);
    setTimer(0);
  };

  const handleLetterClick = (letter) => {
    if (currentWord.includes(letter)) {
      const updatedInputs = [...inputValues];
      currentWord.split("").forEach((char, index) => {
        if (char === letter) {
          updatedInputs[index] = letter;
        }
      });
      setInputValues(updatedInputs);
      if (!updatedInputs.includes("")) {
        setScore(score + 1);
        chooseRandomWord();
      }
    }
  };

  return (
    <div className="main-container">
      <div className="container">
        <Header />
        <div className="game-beginning">
          <div className={`time ${gameStarted && "start_timer"}`}>Time: {timer}</div>
          <div className="score">Score: {score}</div>
          <button className={`start-btn`} onClick={startGame} disabled={gameStarted}>
            Start
          </button>
        </div>
        <div className="main-game">
          <Rules />
          <div className="game-part">
            {!gameStarted ? (
              <span className="blankarea"></span>
            ) : (
              <div className="inputs">
                {inputValues.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    className="user-input-game-time"
                    value={value}
                    readOnly
                  />
                ))}
              </div>
            )}
            <AlphabetContainer onLetterClick={handleLetterClick} gameStarted={gameStarted} />
          </div>
          <Buttons hint={hint} onNextWord={chooseRandomWord} gameStarted={gameStarted} />
        </div>
      </div>
    </div>
  );
}

export default App;
