import React from "react";

const dietItems = [
  {
    name: "Hydration",
    icon: "💧",
    color: "from-blue-100 to-blue-50",
    description: "Drink enough water to keep joints lubricated and reduce stiffness."
  },
  {
    name: "Banana",
    icon: "🍌",
    color: "from-yellow-100 to-yellow-50",
    description: "High potassium helps muscle recovery and supports knee stability."
  },
  {
    name: "Green Vegetables",
    icon: "🥬",
    color: "from-green-100 to-green-50",
    description: "Spinach, kale, and broccoli provide calcium and anti-inflammatory nutrients."
  },
  {
    name: "Healthy Smoothie",
    icon: "🥤",
    color: "from-pink-100 to-pink-50",
    description: "Fruit and yogurt smoothies support recovery and energy."
  },
  {
    name: "Nuts & Seeds",
    icon: "🥜",
    color: "from-orange-100 to-orange-50",
    description: "Healthy fats and magnesium help reduce inflammation."
  },
  {
    name: "Protein Foods",
    icon: "🥚",
    color: "from-purple-100 to-purple-50",
    description: "Eggs, beans, and lentils support muscle strength around the knee."
  },
  {
    name: "Herbal Tea",
    icon: "🍵",
    color: "from-green-100 to-green-50",
    description: "Herbal teas like ginger, turmeric and chamomile may help reduce inflammation and support knee comfort."
  }
];

export default function Diet({
  onOpenTea,
  onOpenDinner
}: {
  onOpenTea: () => void;
  onOpenDinner: () => void;
}) {
return (
  
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      
      <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
        Knee Friendly Diet
      </h1>

      <p className="text-center text-gray-500 mb-8">
        Simple nutrition habits to support stronger and healthier knees
      </p>

      <div className="flex justify-center mb-6">
        <button
          onClick={onOpenTea}
          className="bg-emerald-500 text-white px-4 py-2 rounded-xl shadow hover:bg-emerald-600 transition"
        >
          View Herbal Teas 🍵
        </button>
      </div>

<div style={{ marginTop: "10px" }}>
  <button
    onClick={onOpenDinner}
    style={{
      padding: "8px 16px",
      background: "#10b981",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer"
    }}
  >
    View Dinner Ideas 🍲
  </button>
</div>
  



      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

        {dietItems.map((item, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300`}
          >
            <div className="text-3xl mb-3">
              {item.icon}
            </div>

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