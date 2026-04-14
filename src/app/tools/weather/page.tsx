"use client";
import { useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export default function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true); setError(""); setData(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) { setError("City not found!"); setLoading(false); return; }
      const json = await res.json();
      setData(json);
    } catch {
      setError("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8">
      <a href="/tools" className="absolute top-6 left-6 text-gray-400 hover:text-white">← Back</a>
      <h1 className="text-4xl font-bold">🌤️ Weather</h1>

      <div className="flex gap-3">
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          onKeyDown={e => e.key === "Enter" && fetchWeather()}
          placeholder="Enter city name..."
          className="w-64 p-4 rounded-xl bg-white/10 border border-white/20 text-white outline-none focus:border-white/50"
        />
        <button
          onClick={fetchWeather}
          className="px-6 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-400 text-xl animate-pulse">Fetching weather...</p>}
      {error && <p className="text-red-400 text-xl">{error}</p>}

      {data && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-80 text-center">
          <h2 className="text-3xl font-bold mb-1">{data.name}, {data.sys.country}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            className="mx-auto w-20"
            alt="weather"
          />
          <p className="text-6xl font-bold">{Math.round(data.main.temp)}°C</p>
          <p className="text-gray-400 capitalize mt-2">{data.weather[0].description}</p>
          <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-gray-400">Humidity</p>
              <p className="text-xl font-bold">{data.main.humidity}%</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-gray-400">Wind</p>
              <p className="text-xl font-bold">{data.wind.speed} m/s</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-gray-400">Feels Like</p>
              <p className="text-xl font-bold">{Math.round(data.main.feels_like)}°C</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-gray-400">Pressure</p>
              <p className="text-xl font-bold">{data.main.pressure} hPa</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}