
import React, { useState } from 'react';
import { AppTab } from './types';
import Home from './components/Home';
import Exercises from './components/Exercises';
import AIChat from './components/AIChat';
import Theory from './components/Theory';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('theory');
  const [isWearing, setIsWearing] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'theory':
        return <Theory onGetStarted={() => setActiveTab('home')} />;
      case 'home':
        return <Home isWearing={isWearing} onToggleWear={() => setIsWearing(!isWearing)} />;
      case 'exercises':
        return <Exercises />;
      case 'chat':
        return <AIChat />;
      default:
        return <Theory onGetStarted={() => setActiveTab('home')} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F9F4] max-w-md mx-auto relative shadow-2xl overflow-hidden border-x border-emerald-100/30">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-emerald-100/50 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-emerald-400 to-teal-300 rounded-xl shadow-inner"></div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Knee-Ease</h1>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-50/50 px-3 py-1.5 rounded-full border border-emerald-100/50">
            <span className={`w-2 h-2 rounded-full ${isWearing ? 'bg-emerald-400 animate-pulse' : 'bg-slate-300'}`}></span>
            <span className="text-[10px] font-bold text-emerald-800/60 uppercase tracking-widest">{isWearing ? 'Synced' : 'Ready'}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-28">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default App;
