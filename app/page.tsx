"use client";
import { useEffect, useState } from "react";
import Cell from "./componants/cell";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export default function Home() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [go, setGo] = useState("circle");
  const [winningMessage, setWinningMessage] = useState("");

  const resetGame = () => {
    setCells(["", "", "", "", "", "", "", "", ""]);
    setGo("circle");
    setWinningMessage("");
  };

  useEffect(() => {
    winningCombos.forEach((combo) => {
      const circleWin = combo.every((cell) => cells[cell] === "circle");
      const crossWin = combo.every((cell) => cells[cell] === "cross");

      if (circleWin) {
        setWinningMessage("Circle Wins!");
      } else if (crossWin) {
        setWinningMessage("Cross Wins!");
      }
    });
  }, [cells]);

  useEffect(() => {
    if (cells.every((cell) => cell !== "") && !winningMessage) {
      setWinningMessage("Draw!");
    }
  }, [cells, winningMessage]);

  return (
    <main className="container">
      <div className="game-board">
        {cells.map((cell, index) => (
          <Cell
            id={index}
            go={go}
            setGo={setGo}
            key={index}
            cells={cells}
            setCells={setCells}
            cell={cell}
            winningMessage={winningMessage}
          />
        ))}
      </div>
      <div>{winningMessage}</div>
      {!winningMessage && <div>{`its now ${go} turn!`}</div>}
      <button onClick={resetGame}>New Game</button>
    </main>
  );
}
