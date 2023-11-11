import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [color, setColor] = useState("#000000");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

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
    // eslint-disable-next-line
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
      setCorrect(correct + 1);
      console.log("Correct!");
      console.log("Num correct: " + correct);
      setResult(true);
      makeLevel();
    } else {
      setIncorrect(incorrect + 1);
      console.log("Incorrect.");
      console.log("Num incorrect: " + incorrect);
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
      <h3>{`Correct: ${correct} | Incorrect: ${incorrect}`}</h3>
      <section>
        <article>
          <header>
            <h2>How do you determine this?</h2>
            <div className="explanation">
              <p class="lecture">
                It is pretty straight forward. Each pair of characters represent
                a number ranging between 0 and 255 in hexadecimal format (HEX). You
                may be familiar with RGB. RGB is essentially a way to tell the
                computer what color you want to see. For example, #34AD3F. The first pair, 34, is in HEX.
                This converted to base 10 (numbers we count with) is 52. The second pair is AD in HEX
                which equates to 173 in base 10. The third pair is 3F in HEX
                which equates to 63 in base 10. <br /> <br />
                We now have our three values: 52 173 63 . Remember the RGB
                mentioned earlier and how each pair is a value between 0 and
                255? Well, the position of the pair in the HEX value is
                respective to the order of the RGB acronym. This means that we
                have a value of 52 for R, a value of 173 for G, and a value of
                63 for B. We now know how much Red, Green, and Blue (RGB) our
                color contains. Based on this, we can get an idea of what the
                color will be when you mix the three. <br />
                <br />I hope this helped! 👌
              </p>
            </div>
          </header>
        </article>
      </section>
    </div>
  );
}

export default App;
