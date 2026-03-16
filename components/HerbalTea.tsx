import React from "react";

export default function HerbalTea({ onBack }: { onBack: () => void }) {
  const teas = [
    {
      name: "Ginger Tea",
      icon: "🫚",
      description:
        "Ginger helps reduce inflammation and may support joint comfort after exercise."
    },
    {
      name: "Turmeric Tea",
      icon: "🟡",
      description:
        "Turmeric contains curcumin which is known for supporting joint health and reducing stiffness."
    },
    {
      name: "Green Tea",
      icon: "🍃",
      description:
        "Rich in antioxidants that help the body fight inflammation and support recovery."
    },
    {
      name: "Cinnamon Tea",
      icon: "🟤",
      description:
        "Cinnamon may improve circulation and help reduce muscle soreness."
    }
  ];

  return (
    <div className="p-4">

      <button
        onClick={onBack}
        className="mb-4 text-emerald-600 font-semibold"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold text-center text-emerald-700 mb-6">
        Herbal Tea for Joint Support 🍵
      </h2>

      <div className="space-y-4">
        {teas.map((tea, index) => (
          <div
            key={index}
            className="bg-green-50 p-4 rounded-xl shadow-sm"
          >
            <div className="text-xl mb-1">
              {tea.icon} {tea.name}
            </div>

            <p className="text-sm text-gray-600">
              {tea.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}