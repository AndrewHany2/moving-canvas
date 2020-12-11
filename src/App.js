import React, { useEffect, useRef, useState } from "react";
import "./App.css";

let context;
export default function App() {
  const linkDownRef = useRef(null);
  const linkUpRef = useRef(null);
  const linkLeftRef = useRef(null);
  const linkRightRef = useRef(null);
  const canvasRef = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [linkRef, setLinkRef] = useState(linkDownRef);

  useEffect(() => {
    context = canvasRef.current.getContext("2d");
    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;
    document.addEventListener("keydown", handleKeyDown);
    function handleKeyDown(e) {
      if (e.key === "ArrowUp" || e.key === "w") {
        move("up");
      }
      if (e.key === "ArrowDown" || e.key === "s") {
        move("down");
      }
      if (e.key === "ArrowLeft" || e.key === "a") {
        move("left");
      }
      if (e.key === "ArrowRight" || e.key === "d") {
        move("right");
      }
    }
    return window.removeEventListener("keydown", handleKeyDown);
  }, [window.innerHeight,window.innerWidth]);

  useEffect(() => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.drawImage(linkRef.current, x, y);
  }, [x, y]);

  function move(direction) {
    switch (direction) {
      case "up":
        setY((y) => y - 20);
        setLinkRef(linkUpRef);
        break;
      case "down":
        setY((y) => y + 20);
        setLinkRef(linkDownRef);
        break;
      case "left":
        setX((x) => x - 20);
        setLinkRef(linkLeftRef);
        break;
      case "right":
        setX((x) => x + 20);
        setLinkRef(linkRightRef);
        break;
      default:
        console.log("press a key");
        break;
    }
  }

  return (
    <div className="app">
      <canvas ref={canvasRef} />

      <div className="arrows">
        <button onClick={() => move("up")}>Up</button>
        <button onClick={() => move("left")}>Left</button>
        <button onClick={() => move("down")}>Down</button>
        <button onClick={() => move("right")}>Right</button>
      </div>

      <div className="images">
        <img
          ref={linkDownRef}
          src="https://i.imgur.com/JYUB0m3.png"
          alt="Down"
        />
        <img
          ref={linkRightRef}
          src="https://i.imgur.com/GEXD7bk.gif"
          alt="Right"
        />
        <img ref={linkUpRef} src="https://i.imgur.com/XSA2Oom.gif" alt="Up" />
        <img
          ref={linkLeftRef}
          src="https://i.imgur.com/4LGAZ8t.gif"
          alt="Left"
        />
      </div>
    </div>
  );
}
