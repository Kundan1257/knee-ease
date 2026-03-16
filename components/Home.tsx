import React from "react";

interface HomeProps {
  onOpenAI: () => void;
  onExplorePremium: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenAI, onExplorePremium }) => {
  return (
    <div className="flex flex-col px-5 py-6 space-y-8 bg-[#F4F9F6] min-h-screen">

<div
  style={{
    background: "#f0fdf9",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "20px",
    boxShadow: "0 6px 14px rgba(0,0,0,0.06)"
  }}
>
  <h2 style={{ color: "#065f46", marginBottom: "10px" }}>
    Knee-Ease – Natural Knee Protection 🦵
  </h2>

  <p style={{ color: "#374151", marginBottom: "10px", lineHeight: "1.5" }}>
    Your knees support every step you take — whether you are walking, running,
    playing sports, or exercising. Without proper care, knees can become weak,
    painful, or injured over time.
  </p>

  <p style={{ color: "#374151", marginBottom: "10px", lineHeight: "1.5" }}>
    Knee-Ease helps you protect and strengthen your knees through simple
    exercises, healthy habits, and relaxation techniques. This app is designed
    for runners, sports players, fitness beginners, and anyone who wants to
    maintain strong and healthy knees.
  </p>

  <p style={{ color: "#374151", lineHeight: "1.5" }}>
    Take a few minutes each day to improve flexibility, build strength, and
    support your knee joints. Small daily actions can prevent bigger knee
    problems in the future.
  </p>
</div>
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-emerald-800">
          Knee-Lace Practice
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed">
          A structured daily wrapping method designed to support movement
          awareness, activity balance, and consistency in everyday life.
        </p>
      </div>


      {/* Activity Cards */}

      <div className="space-y-4">

        <div className="p-4 bg-white rounded-xl shadow-sm border border-emerald-100">
          <h3 className="font-semibold text-slate-800">Running</h3>
          <p className="text-sm text-slate-500">
            Helps maintain knee alignment during running sessions.
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow-sm border border-emerald-100">
          <h3 className="font-semibold text-slate-800">Playing</h3>
          <p className="text-sm text-slate-500">
            Supports dynamic knee movement for sports and outdoor play.
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow-sm border border-emerald-100">
          <h3 className="font-semibold text-slate-800">Daily Activity</h3>
          <p className="text-sm text-slate-500">
            Encourages balanced support during walking and everyday movement.
          </p>
        </div>

      </div>


      {/* Buttons */}

      <div className="flex space-x-4 pt-4">

        <button
          onClick={onOpenAI}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
        >
          Open AI Chat
        </button>

        <button
          onClick={onExplorePremium}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg"
        >
          Explore Premium
        </button>

      </div>

    </div>
  );
};

export default Home;