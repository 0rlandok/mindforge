import { useState, useEffect } from "react";

export default function MindForge() {
  const [screen, setScreen] = useState("dashboard");

  const renderScreen = () => {
    switch (screen) {
      case "flow":
        return <ModoFlow />;
      case "diario":
        return <Diario />;
      case "retos":
        return <Retos />;
      default:
        return <Dashboard setScreen={setScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white p-4 font-sans transition-all duration-500">
      {renderScreen()}
    </div>
  );
}

function Dashboard({ setScreen }) {
  const opciones = [
    { label: "🧘 Calma", target: "flow" },
    { label: "🔥 Enfoque", target: "flow" },
    { label: "⚡ Energía", target: "flow" },
    { label: "🎯 Claridad", target: "flow" },
  ];

  return (
    <div className="flex flex-col items-center gap-6 text-center animate-fade-in">
      <h1 className="text-3xl font-bold">MindForge 🧠</h1>
      <p className="text-gray-400">¿Qué deseas forjar hoy?</p>
      <div className="flex flex-col gap-2">
        {opciones.map((op, i) => (
          <button key={i} onClick={() => setScreen(op.target)}>{op.label}</button>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <button onClick={() => setScreen("diario")}>📓 Diario Mental</button>
        <button onClick={() => setScreen("retos")}>🧩 Retos Mentales</button>
      </div>
    </div>
  );
}

function ModoFlow() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [audio] = useState(typeof Audio !== "undefined" ? new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_5936be7e48.mp3?filename=zen-meditation-6027.mp3") : null);

  const toggleTimer = () => {
    setRunning(!running);
    if (!running && audio) audio.play();
    else if (audio) audio.pause();
  };

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-4 animate-fade-in">
      <h2 className="text-2xl font-semibold">Modo Flow ⏱️</h2>
      <div className="text-6xl font-mono">{minutes}:{seconds}</div>
      <button onClick={toggleTimer}>{running ? "Pausar" : "Iniciar"}</button>
    </div>
  );
}

function Diario() {
  const frase = "Forja tu mente con cada pensamiento que escribes.";
  const [texto, setTexto] = useState(() => {
    return localStorage.getItem("diario") || "";
  });

  const guardar = () => {
    localStorage.setItem("diario", texto);
    alert("Guardado mentalmente 🧠");
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <h2 className="text-2xl font-semibold">📓 Diario Mental</h2>
      <p className="italic text-gray-400">{frase}</p>
      <textarea
        className="bg-gray-800 text-white p-3 rounded resize-none min-h-[150px]"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Reflexiona, libera, agradece, planea..."
      />
      <button onClick={guardar}>Guardar</button>
    </div>
  );
}

function Retos() {
  const desafios = [
    "Haz una sola cosa por 10 minutos sin distracción",
    "Respira profundamente durante 1 minuto",
    "Escribe una gratitud en tu diario"
  ];
  const [completados, setCompletados] = useState(() => {
    const guardados = localStorage.getItem("retos");
    return guardados ? JSON.parse(guardados) : [];
  });

  const toggleReto = (index) => {
    const actualizados = completados.includes(index)
      ? completados.filter((i) => i !== index)
      : [...completados, index];
    setCompletados(actualizados);
    localStorage.setItem("retos", JSON.stringify(actualizados));
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <h2 className="text-2xl font-semibold">🧩 Retos Mentales del Día</h2>
      {desafios.map((reto, i) => (
        <label key={i} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completados.includes(i)}
            onChange={() => toggleReto(i)}
          />
          <span>{reto}</span>
        </label>
      ))}
    </div>
  );
}
