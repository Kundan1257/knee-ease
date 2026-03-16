 import React, { useState, useEffect } from "react";
import { exercisesData } from "../data/exercisesData";

type Props = {
  onOpenRelaxation: () => void;
};

const Exercises: React.FC<Props> = ({ onOpenRelaxation }) => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(30);

useEffect(() => {
  let timer: any;

  if (running && time > 0) {
    timer = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  }

  if (time === 0) {
    setRunning(false);
    setTime(30);
    alert("Exercise completed 💪");
  }

  return () => clearTimeout(timer);
}, [running, time]);

const startExercise = () => {
  setTime(30);
  setRunning(true);
};

const stopExercise = () => {
  setRunning(false);
  setTime(30);
};

  const markCompleted = () => {
    alert("Great job! Exercise completed 💪");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px" }}>
        Knee Exercises
      </h2>

      {Object.values(exercisesData).map((exercise, index) => (
        <div
          key={index}
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "15px",
            marginBottom: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          <div
  dangerouslySetInnerHTML={{ __html: exercise.image }}
  style={{
    width: "120px",
    height: "120px",
    marginBottom: "10px"
  }}
></div>
  
  
    
   
    
  

            
           

          <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
            {exercise.title}
          </h3>

          <p style={{ color: "#555", marginBottom: "15px" }}>
            {exercise.description}
          </p>

          <button
            onClick={startExercise}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: "#10b981",
              color: "white",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Start Exercise
          </button>

<button
  onClick={stopExercise}
  style={{
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
  }}
>
  Stop
</button>
          <button
            onClick={markCompleted}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "1px solid #10b981",
              background: "white",
              color: "#065f46",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Mark Completed
          </button>

          <button
            onClick={onOpenRelaxation}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: "#6366f1",
              color: "white",
              cursor: "pointer",
            }}
          >
            Relaxation 🧘
          </button>
        </div>
      ))}

      {running && (
        <div
          style={{
            marginTop: "25px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              background: `conic-gradient(#10b981 ${(time / 30) * 360}deg, #e5e7eb 0deg)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#065f46",
              boxShadow: "0 8px 18px rgba(0,0,0,0.1)",
            }}
          >
            {time}s
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercises;