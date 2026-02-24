
import React from 'react';
import { AppTab } from '../types';

interface NavigationProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/60 backdrop-blur-2xl border-t border-emerald-100/30 px-6 safe-bottom z-30">
      <div className="flex justify-between items-center h-20">
        <button 
          onClick={() => onTabChange('theory')}
          className={`flex flex-col items-center flex-1 space-y-2 transition-all duration-500 ${activeTab === 'theory' ? 'text-emerald-600 scale-105' : 'text-slate-300 hover:text-slate-400'}`}
        >
          <svg className={`w-6 h-6 transition-all ${activeTab === 'theory' ? 'stroke-[2.5px]' : 'stroke-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Info</span>
        </button>

        <button 
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center flex-1 space-y-2 transition-all duration-500 ${activeTab === 'home' ? 'text-emerald-600 scale-105' : 'text-slate-300 hover:text-slate-400'}`}
        >
          <svg className={`w-6 h-6 transition-all ${activeTab === 'home' ? 'stroke-[2.5px]' : 'stroke-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Sync</span>
        </button>

        <button 
          onClick={() => onTabChange('exercises')}
          className={`flex flex-col items-center flex-1 space-y-2 transition-all duration-500 ${activeTab === 'exercises' ? 'text-emerald-600 scale-105' : 'text-slate-300 hover:text-slate-400'}`}
        >
          <svg className={`w-6 h-6 transition-all ${activeTab === 'exercises' ? 'stroke-[2.5px]' : 'stroke-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Flow</span>
        </button>

        <button 
          onClick={() => onTabChange('chat')}
          className={`flex flex-col items-center flex-1 space-y-2 transition-all duration-500 ${activeTab === 'chat' ? 'text-emerald-600 scale-105' : 'text-slate-300 hover:text-slate-400'}`}
        >
          <svg className={`w-6 h-6 transition-all ${activeTab === 'chat' ? 'stroke-[2.5px]' : 'stroke-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Help</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
