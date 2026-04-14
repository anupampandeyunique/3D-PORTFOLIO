"use client";
import { useState, useRef } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<any>(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
  };

  const pause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      
      {/* Glass Card */}
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-10 shadow-xl text-center">
        
        <h1 className="text-3xl font-bold mb-6 tracking-wide">
          Stopwatch
        </h1>

        {/* Time Display */}
        <div className="text-5xl font-mono mb-8">
          {formatTime(time)}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={start}
            className="px-5 py-2 bg-green-500/20 hover:bg-green-500/40 rounded-xl transition"
          >
            Start
          </button>

          <button
            onClick={pause}
            className="px-5 py-2 bg-yellow-500/20 hover:bg-yellow-500/40 rounded-xl transition"
          >
            Pause
          </button>

          <button
            onClick={reset}
            className="px-5 py-2 bg-red-500/20 hover:bg-red-500/40 rounded-xl transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}