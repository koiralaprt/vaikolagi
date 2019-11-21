import React, { useState } from "react";
import Box from "./box";

import "./style.scss";
// boxArray to iterate to give 9 boxes ui
const boxArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
// initial box value object with null values
const initBoxValues = {
  "1": null,
  "2": null,
  "3": null,
  "4": null,
  "5": null,
  "6": null,
  "7": null,
  "8": null,
  "9": null
};
// all possible winner combinations
const winnerArray = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 5, 7],
  [3, 6, 9],
  [4, 5, 6],
  [7, 8, 9]
];

export default function Container() {
  const [valueObject, setValueObject] = useState(initBoxValues); // initialize valueobject with initial null box values, and setter method to change it
  const [turn, setTurn] = useState("X"); // turn initialised to X's and setter method to change turn
  const [winner, setWinner] = useState(null); //winner initialised to null and its setter method
  // upon box click this function is called , by passing this function to the box component its called upon click
  const handleBoxClick = (position, value) => {
    //   handle only if value is empty/null and no winner otherwise do nothing
    if (!value && !winner) {
      const newValueObject = { ...valueObject, [position]: turn };

      setValueObject(newValueObject);
      checkWinner(newValueObject, turn);
      setTurn(turn === "X" ? "O" : "X");
    }
  };
  // winner checking logic
  const checkWinner = (valobj, trn) => {
    let winstringArray = [];
    for (let [key, value] of Object.entries(valobj)) {
      if (trn === value) winstringArray.push(key);
    }
    for (let i = 0; i < winnerArray.length; i++) {
      const check = winnerArray[i];
      console.log(check, winstringArray);

      if (
        winstringArray.includes(String(check[0])) &&
        winstringArray.includes(String(check[1])) &&
        winstringArray.includes(String(check[2]))
      ) {
        setWinner(trn);
        return;
      }
    }
  };
  console.log(valueObject);
  return (
    <div className="game-container">
      {!winner && (
        <div className="text">
          IT IS{" "}
          <span
            style={{ fontSize: "2em", color: turn === "X" ? "red" : "green" }}
          >
            {turn}
          </span>
          's TURN{" "}
        </div>
      )}
      <br />
      <br />
      <br />
      <div className="game">
        {/* iterating over the box array using .map function to give 9 boxes with position and value from boxvalue object for each */}
        {boxArray.map((box, idx) => (
          <Box
            onBoxClick={handleBoxClick}
            key={idx}
            position={box}
            value={valueObject[box]}
          />
        ))}
      </div>
      <br />
      <br />
      <br />
      {/* button click sets everything to beginning of time values */}
      <button
        onClick={() => {
          setWinner(null);
          setTurn("X");
          setValueObject(initBoxValues);
        }}
      >
        RESTART GAME
      </button>
      <br />
      <br />
      <br />
      {winner && (
        <React.Fragment>
          <div
            style={{ color: winner === "X" ? "red" : "green", fontSize: "2em" }}
          >
            Winner: {winner}
          </div>
          <div class="pyro">
            <div class="before" />
            <div class="after" />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
