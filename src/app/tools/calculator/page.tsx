"use client";
import { useState, useEffect, useCallback } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState("");
  const [newNum, setNewNum] = useState(false);

  const press = useCallback((val: string) => {
    if (val === "C") {
      setDisplay("0"); setPrev(null); setOp(""); setNewNum(false); return;
    }
    if (val === "=") {
      setPrev(null);
      setOp("");
      setNewNum(true);
      setDisplay(d => {
        setPrev(p => {
          setOp(o => {
            if (p !== null && o) {
              let res = 0;
              if (o === "+") res = p + parseFloat(d);
              if (o === "-") res = p - parseFloat(d);
              if (o === "×") res = p * parseFloat(d);
              if (o === "÷") res = parseFloat(d) !== 0 ? p / parseFloat(d) : 0;
              setDisplay(String(res));
            }
            return "";
          });
          return null;
        });
        return d;
      });
      return;
    }
    if (["+", "-", "×", "÷"].includes(val)) {
      setDisplay(d => { setPrev(parseFloat(d)); return d; });
      setOp(val);
      setNewNum(true);
      return;
    }
    if (val === ".") {
      setNewNum(false);
      setDisplay(d => {
        if (newNum) return "0.";
        return d.includes(".") ? d : d + ".";
      });
      return;
    }
    if (newNum) {
      setDisplay(val);
      setNewNum(false);
    } else {
      setDisplay(d => d === "0" ? val : d + val);
    }
  }, [newNum]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") press(e.key);
      else if (e.key === "+") press("+");
      else if (e.key === "-") press("-");
      else if (e.key === "*") press("×");
      else if (e.key === "/") { e.preventDefault(); press("÷"); }
      else if (e.key === "Enter" || e.key === "=") press("=");
      else if (e.key === "Escape") press("C");
      else if (e.key === ".") press(".");
      else if (e.key === "Backspace") {
        setDisplay(d => d.length > 1 ? d.slice(0, -1) : "0");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [press]);

  const btnStyle = (btn: string) => {
    if (btn === "C") return "bg-red-600 hover:bg-red-500";
    if (btn === "=") return "bg-white text-black hover:bg-gray-200";
    if (["+", "-", "×", "÷"].includes(btn)) return "bg-orange-500 hover:bg-orange-400";
    return "bg-white/10 hover:bg-white/20";
  };

  const buttons = ["C","÷","×","-","7","8","9","+","4","5","6","=","1","2","3","0","."];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <a href="/tools" className="absolute top-6 left-6 text-gray-400 hover:text-white">← Back</a>
      <h1 className="text-4xl font-bold mb-6">🧮 Calculator</h1>
      <p className="text-gray-500 text-sm mb-4">Keyboard supported ⌨️</p>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 w-80">
        <div className="text-right text-4xl font-mono mb-2 p-3 bg-black/50 rounded-xl min-h-16">
          {display}
        </div>
        {op && <div className="text-right text-orange-400 text-sm pr-2 mb-2">{prev} {op}</div>}
        <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"8px"}}>
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => press(btn)}
              style={btn === "0" ? {gridColumn:"span 2"} : btn === "=" ? {gridRow:"span 2"} : {}}
              className={`p-4 rounded-xl text-xl font-bold transition ${btnStyle(btn)}`}
            >
              {btn}
            </button>
          ))}
          <div/>
        </div>
      </div>
    </main>
  );
}