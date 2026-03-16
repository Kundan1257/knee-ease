import React from "react";
import { AppTab } from "../types";

interface NavigationProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const tabs = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "exercises", label: "Exercises", icon: "🏃" },
  { id: "diet", label: "Diet", icon: "🥗" },
  
  { id: "chat", label: "Help", icon: "💬" }
];

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {

  const tabStyle = (tab: AppTab) =>
    `flex flex-col items-center justify-center flex-1 py-2 transition-all duration-200 ${
      activeTab === tab
        ? "text-emerald-600 scale-105"
        : "text-slate-400 hover:text-emerald-500"
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-xl border-t border-emerald-100 shadow-lg">
      <div className="flex items-center">

        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as AppTab)}
            className={tabStyle(tab.id as AppTab)}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-[11px] font-medium">{tab.label}</span>
          </button>
        ))}

      </div>
    </nav>
  );
};

export default Navigation;