import React from "react";

const teaItems = [
  {
    name: "Ginger Tea",
    icon: "🫚",
    color: "from-orange-100 to-orange-50",
    description: "Helps reduce inflammation and supports joint comfort."
  },
  {
    name: "Turmeric Tea",
    icon: "🟡",
    color: "from-yellow-100 to-yellow-50",
    description: "Curcumin helps reduce swelling and supports knee health."
  },
  {
    name: "Green Tea",
    icon: "🍵",
    color: "from-green-100 to-green-50",
    description: "Antioxidants help protect joints and cartilage."
  },
  {
    name: "Chamomile Tea",
    icon: "🌼",
    color: "from-amber-100 to-amber-50",
    description: "May relax muscles and reduce body stress."
  },
  {
    name: "Peppermint Tea",
    icon: "🌿",
    color: "from-emerald-100 to-emerald-50",
    description: "Cooling herb that may help reduce swelling."
  }
];

export default function Tea() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">

      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Knee Friendly Herbal Teas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

        {teaItems.map((item, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 shadow-md hover:shadow-xl transition`}
          >
            <div className="text-3xl mb-3">{item.icon}</div>

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {item.name}
            </h2>

            <p className="text-gray-600 text-sm">
              {item.description}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}