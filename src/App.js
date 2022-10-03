import "./App.css";
import { useState, useEffect } from "react";
import { render } from "@testing-library/react";

function App() {
  const [color, setColor] = useState("#000000");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  useEffect(() => {
    makeLevel();
  }, []);

  const randomColor = () => {
    //generates a new (random) hex value
    const characterArr = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];

    let temp = "#";

    for (let i = 0; i < 6; i++) {
      temp = temp + characterArr[Math.floor(Math.random() * 16)];
    }
    //console.log("The new random color: " + temp);
    return temp;
  };

  const makeOptions = (currColor) => {
    let temp = [
      <button
        className="answers"
        onClick={() => {
          resultHandler(true);
        }}
        key={currColor}
      >
        {currColor}
      </button>,
      <button
        onClick={() => {
          resultHandler(false);
        }}
        className="answers"
        key={"0"}
      >
        {randomColor()}
      </button>,
      <button
        onClick={() => {
          resultHandler(false);
        }}
        className="answers"
        key={"1"}
      >
        {randomColor()}
      </button>,
    ];
    shuffle(temp);
    console.log(temp);
    setAnswers(temp);
  };
  const makeLevel = () => {
    const temp = randomColor();
    console.log("The new random color is: " + temp);
    setColor(temp);
    makeOptions(temp);
  };

  const resultHandler = (boolean) => {
    if (boolean) {
      console.log("You got it!");
      setResult(true);
      makeLevel();
    } else {
      console.log("Not quite...");
      setResult(false);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Guess the Color!</h1>
      <div className="boxContainer">
        <div className="theBox" style={{ background: color }}></div>
      </div>
      <div>{answers}</div>
      <div>
        {result === null ? (
          <h3>See result here.</h3>
        ) : result ? (
          <h3 style={{ color: "green" }}>Correct!</h3>
        ) : (
          <h3 style={{ color: "red" }}>Nope.</h3>
        )}
      </div>
    </div>
  );
}

export default App;
