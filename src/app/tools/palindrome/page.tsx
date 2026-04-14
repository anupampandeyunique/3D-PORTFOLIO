"use client";
import { useState } from "react";

export default function Palindrome() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<null | boolean>(null);

  const check = () => {
    const clean = input.toLowerCase().replace(/[^a-z0-9]/g, "");
    setResult(clean === clean.split("").reverse().join(""));
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8">
      <a href="/tools" className="absolute top-6 left-6 text-gray-400 hover:text-white">← Back</a>
      <h1 className="text-4xl font-bold">🔤 Palindrome Checker</h1>
      <p className="text-gray-400">e.g. racecar, madam, level</p>

      <input
        value={input}
        onChange={e => { setInput(e.target.value); setResult(null); }}
        onKeyDown={e => e.key === "Enter" && check()}
        placeholder="Type a word or sentence..."
        className="w-80 p-4 rounded-xl bg-white/10 border border-white/20 text-white text-xl outline-none focus:border-white/50 text-center"
      />

      <button
        onClick={check}
        className="px-10 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition text-lg"
      >
        Check
      </button>

      {result !== null && (
        <div className={`text-5xl font-bold animate-pulse ${result ? "text-green-400" : "text-red-400"}`}>
          {result ? "✅ Palindrome!" : "❌ Not a Palindrome"}
        </div>
      )}
    </main>
  );
}