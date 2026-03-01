import React from 'react';
import { AppTab } from '../types';

interface NavigationProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {

  const tabStyle = (tab: AppTab) =>
    `flex flex-col items-center justify-center flex-1 transition-all duration-300 ${
      activeTab === tab
        ? 'text-emerald-600'
        : 'text-slate-400'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 safe-bottom z-30">
      <div className="flex h-16">

        <button onClick={() => onTabChange('theory')} className={tabStyle('theory')}>
          <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M12 6v13m0-13C10.8 5.5 9.2 5 7.5 5S4.2 5.5 3 6.3v13C4.2 18.5 5.8 18 7.5 18s3.3.5 4.5 1.3m0-13C13.2 5.5 14.8 5 16.5 5c1.7 0 3.3.5 4.5 1.3v13C19.8 18.5 18.2 18 16.5 18c-1.7 0-3.3.5-4.5 1.3"
            />
          </svg>
          <span className="text-[11px] font-medium">Info</span>
        </button>

        <button onClick={() => onTabChange('home')} className={tabStyle('home')}>
          <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M3 12l2-2 7-7 7 7 2 2v8a1 1 0 01-1 1h-4m-6 0H6a1 1 0 01-1-1v-8"
            />
          </svg>
          <span className="text-[11px] font-medium">Home</span>
        </button>

        <button onClick={() => onTabChange('exercises')} className={tabStyle('exercises')}>
          <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M10 9l5 3-5 3V9z"
            />
          </svg>
          <span className="text-[11px] font-medium">Flow</span>
        </button>

        <button onClick={() => onTabChange('chat')} className={tabStyle('chat')}>
          <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
            />
          </svg>
          <span className="text-[11px] font-medium">Help</span>
        </button>

      </div>
    </nav>
  );
};

export default Navigation;