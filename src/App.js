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
      { color: currColor, correct: true },
      { color: randomColor(), correct: false },
      { color: randomColor(), correct: false },
    ];

    const final = shuffle(temp);
    console.log(final);
    setAnswers(final);
  };
  const makeLevel = () => {
    const temp = randomColor();
    console.log("The new random color is: " + temp);
    setColor(temp);
    makeOptions(temp);
  };

  const resultHandler = (boolean) => {
    if (boolean) {
      console.log("Correct!");
      setResult(true);
      makeLevel();
    } else {
      console.log("Incorrect.");
      setResult(false);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Guess the Color!</h1>
      <div className="boxContainer">
        <div className="theBox" style={{ background: color }}></div>
      </div>
      <div>
        {answers.map(
          (
            button,
            index // index needs to be second. But why?
          ) => (
            <button
              key={`button-${index}`}
              className="answers"
              onClick={() => resultHandler(button.correct)}
            >
              {button.color}
            </button>
          )
        )}
      </div>
      <div>
        {result === null ? (
          <h3>Select an option.</h3>
        ) : result ? (
          <h3 style={{ color: "green" }}>Correct!</h3>
        ) : (
          <h3 style={{ color: "red" }}>Incorrect.</h3>
        )}
      </div>
    </div>
  );
}

export default App;
