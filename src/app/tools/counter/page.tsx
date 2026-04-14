"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-10">
      <a href="/tools" className="absolute top-6 left-6 text-gray-400 hover:text-white transition">← Back</a>
      
      <h1 className="text-5xl font-bold tracking-tight">🔢 Counter</h1>

      <div className="relative flex items-center justify-center w-64 h-64 rounded-full border-4 border-white/20 shadow-[0_0_80px_rgba(255,255,255,0.1)]">
        <span className="text-7xl font-mono font-bold">{count}</span>
      </div>

      <div className="flex gap-6">
        <button
          onClick={() => setCount(count - 1)}
          className="w-16 h-16 rounded-full bg-red-600/80 hover:bg-red-500 text-3xl font-bold transition shadow-lg"
        >−</button>
        <button
          onClick={() => setCount(0)}
          className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-sm font-semibold transition shadow-lg"
        >Reset</button>
        <button
          onClick={() => setCount(count + 1)}
          className="w-16 h-16 rounded-full bg-green-600/80 hover:bg-green-500 text-3xl font-bold transition shadow-lg"
        >+</button>
      </div>

      <p className="text-gray-500 text-sm">Click + or − to change the count</p>
    </main>
  );
}