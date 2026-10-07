import { useState, useEffect } from "react";
 
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
 
export default function Timer({ initialSeconds = 60 }) {
  const [duration, setDuration] = useState(initialSeconds);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
 
  useEffect(() => {
    if (!isRunning) return;
 
    const id = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
 
    return () => clearInterval(id); 
  }, [isRunning]);
 
  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsRunning(false);
      setSecondsLeft(0);
    }
  }, [secondsLeft]);
 
  const adjustMinutes = (delta) => {
    if (isRunning) return; 
    const next = Math.max(60, duration + delta * 60); 
    setDuration(next);
    setSecondsLeft(next);
  };
 
  const handleStart = () => {
    if (secondsLeft === 0) setSecondsLeft(duration);
    setIsRunning(true);
  };
 
  const handlePause = () => setIsRunning(false);
 
  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(duration);
  };
 
  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h2>Rest Timer</h2>
 
      <div style={{ fontSize: "3rem", fontWeight: "bold" }}>
        {formatTime(secondsLeft)}
      </div>
 
      <div style={{ margin: "0.5rem 0" }}>
        <button onClick={() => adjustMinutes(-1)} disabled={isRunning}>
          -1 min
        </button>{" "}
        <button onClick={() => adjustMinutes(1)} disabled={isRunning}>
          +1 min
        </button>
      </div>
 
      <div>
        {isRunning ? (
          <button onClick={handlePause}>Pause</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}{" "}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
 