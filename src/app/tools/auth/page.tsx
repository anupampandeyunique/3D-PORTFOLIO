"use client";
import { useState } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const submit = () => {
    if (!form.email || !form.password) { setError("Please fill all fields!"); return; }
    if (!isLogin && !form.name) { setError("Please enter your name!"); return; }
    if (!form.email.includes("@")) { setError("Invalid email!"); return; }
    if (form.password.length < 6) { setError("Password must be 6+ characters!"); return; }
    setSubmitted(true);
  };

  if (submitted) return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <div className="text-6xl">🎉</div>
      <h2 className="text-3xl font-bold">{isLogin ? "Welcome Back!" : "Account Created!"}</h2>
      <p className="text-gray-400">{form.email}</p>
      <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", password: "" }); }}
        className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition">
        Go Back
      </button>
      <a href="/tools" className="text-gray-500 hover:text-white">← Back to Tools</a>
    </main>
  );

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <a href="/tools" className="absolute top-6 left-6 text-gray-400 hover:text-white">← Back</a>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-96 shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-2">
          {isLogin ? "🔐 Login" : "📝 Register"}
        </h1>
        <p className="text-gray-400 text-center text-sm mb-8">
          {isLogin ? "Welcome back!" : "Create your account"}
        </p>

        <div className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
              <input
                name="name" value={form.name} onChange={handle}
                placeholder="Anupam Pandey"
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-white/50"
              />
            </div>
          )}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email</label>
            <input
              name="email" value={form.email} onChange={handle} type="email"
              placeholder="you@example.com"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-white/50"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Password</label>
            <input
              name="password" value={form.password} onChange={handle} type="password"
              placeholder="••••••••"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-white/50"
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button onClick={submit}
            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition mt-2">
            {isLogin ? "Login →" : "Create Account →"}
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => { setIsLogin(!isLogin); setError(""); }}
            className="text-white font-bold ml-1 hover:underline">
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </main>
  );
}