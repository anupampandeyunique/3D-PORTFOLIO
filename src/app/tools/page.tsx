export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8 pt-28">
      <h1 className="text-4xl font-bold text-center mb-10 mt-10">🛠️ Tools & Mini Apps</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          { title: "⏱️ Stopwatch", href: "/tools/stopwatch" },
          { title: "🔢 Counter", href: "/tools/counter" },
          { title: "🔤 Palindrome Checker", href: "/tools/palindrome" },
          { title: "🧮 Calculator", href: "/tools/calculator" },
          { title: "🌤️ Weather", href: "/tools/weather" },
          { title: "🔐 Login / Register", href: "/tools/auth" },
        ].map((tool) => (
          <a
            key={tool.href}
            href={tool.href}
            className="border border-white/20 rounded-xl p-6 hover:bg-white/10 transition text-center text-xl font-semibold"
          >
            {tool.title}
          </a>
        ))}
      </div>
    </main>
  );
}