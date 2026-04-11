import KneeBraceGuide from "./KneeBraceGuide";
import { useState } from "react";
import Home from "./components/Home";
import Exercises from "./components/Exercises";
import Diet from "./components/Diet";
import Help from "./components/Help";
import HerbalTea from "./components/HerbalTea";
import Relaxation from "./components/Relaxation";
import AIChat from "./components/AIChat";
import Dinner from "./components/Dinner";
import Contact from "./components/Contact";
import Disclaimer from "./components/Disclaimer";

type AppTab =
  | "home"
  | "exercise"
  | "diet"
  | "help"
  | "ai"
  | "relaxation"
  | "contact"
  | "disclaimer";

export default function App() {
  const [tab, setTab] = useState<AppTab>("home");
  const [showTea, setShowTea] = useState(false);
  const [showDinner, setShowDinner] = useState(false);

  const renderTab = () => {
    if (showTea) {
      return <HerbalTea onBack={() => setShowTea(false)} />;
    }

    if (showDinner) {
      return <Dinner />;
    }

    switch (tab) {
      case "home":
        return (
          <Home
            onOpenAI={() => setTab("ai")}
            onExplorePremium={() => alert("Premium coming soon")}
          />
        );

      case "exercise":
        return <Exercises onOpenRelaxation={() => setTab("relaxation")} />;

      case "relaxation":
        return <Relaxation />;

      case "diet":
        return (
          <Diet
            onOpenTea={() => setShowTea(true)}
            onOpenDinner={() => setShowDinner(true)}
          />
        );

      case "help":
        return <Help />;

      case "ai":
        return <AIChat />;

      case "contact":
        return <Contact />;

      case "disclaimer":
        return <Disclaimer />;

      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-white shadow-lg flex flex-col">

        <header className="bg-emerald-500 text-white text-center p-4 text-xl font-bold">
          Knee-Ease
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          {renderTab()}
        </main>

        <nav className="border-t bg-white flex justify-around p-3 gap-3">
          <button
            onClick={() => {
              setTab("home");
              setShowTea(false);
              setShowDinner(false);
            }}
          >
            Home
          </button>

          <button
            onClick={() => {
              setTab("exercise");
              setShowTea(false);
              setShowDinner(false);
            }}
          >
            Exercise
          </button>

          <button
            onClick={() => {
              setTab("diet");
              setShowTea(false);
              setShowDinner(false);
            }}
          >
            Diet
          </button>

          <button
            onClick={() => {
              setTab("help");
              setShowTea(false);
              setShowDinner(false);
            }}
          >
            Help
          </button>
        </nav>

        <footer className="text-center text-sm text-gray-500 p-4 border-t">
          <p>© 2026 Knee-Ease</p>

          <div className="space-x-4 mt-2">
            <button onClick={() => setTab("contact")}>Contact</button>
            <button onClick={() => setTab("disclaimer")}>Disclaimer</button>
          </div>
        </footer>

      </div>
    </div>
  );
}
