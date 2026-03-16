import React, { useState, useEffect } from "react";

const relaxationSteps = [
  {
    icon: "💧",
    title: "Stay Hydrated",
    text: "Drinking enough water helps keep joints lubricated and supports recovery."
  },
  {
    icon: "🧘",
    title: "Gentle Stretching",
    text: "Light stretching helps release tension around the knees and improves flexibility."
  },
  {
    icon: "😴",
    title: "Proper Rest",
    text: "Rest allows muscles and joints to recover after physical activity."
  },
  {
    icon: "🦵",
    title: "Legs Up Support",
    text: "Before sleep, lie on the floor and raise your legs against a wall for about 10 minutes. This helps reduce knee pressure and improves circulation."
  },
  {
    icon: "🚶",
    title: "Gentle Walk",
    text: "After resting, take a slow gentle walk for 10 minutes to activate blood flow."
  }
];

const Relaxation: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(600);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (running && time > 0) {
      timer = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    if (time === 0) {
      setRunning(false);
      setTime(600);
      alert("Relaxation completed 🧘");
    }

    return () => clearTimeout(timer);
  }, [running, time]);

  const startRelaxation = () => {
    setTime(600);
    setRunning(true);
  };

  const stopRelaxation = () => {
    setRunning(false);
    setTime(600);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px" }}>
        Relaxation & Recovery
      </h2>

      {relaxationSteps.map((step, index) => (
        <div
          key={index}
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "15px",
            marginBottom: "18px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
          }}
        >
          <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>
            {step.icon} {step.title}
          </h3>

          <p style={{ fontSize: "14px", color: "#444" }}>
            {step.text}
          </p>
        </div>
      ))}

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={startRelaxation}
          style={{
            padding: "10px 18px",
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Start Relaxation
        </button>

        <button
          onClick={stopRelaxation}
          style={{
            padding: "10px 18px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Stop
        </button>
      </div>

      {running && (
        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
            color: "#065f46"
          }}
        >
          {Math.floor(time / 60)}:{("0" + (time % 60)).slice(-2)}
        </div>
      )}
    </div>
  );
};

export default Relaxation;