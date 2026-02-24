
import React from 'react';

interface HomeProps {
  isWearing: boolean;
  onToggleWear: () => void;
}

const Home: React.FC<HomeProps> = ({ isWearing, onToggleWear }) => {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      {/* Device Card */}
      <div className={`p-8 rounded-[3rem] transition-all duration-1000 transform ${isWearing ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-2xl shadow-emerald-100 scale-[1.02]' : 'bg-white border border-emerald-100/50 shadow-sm'}`}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Knee-Lace</h2>
            <p className={`text-xs font-medium tracking-wide ${isWearing ? 'text-emerald-50' : 'text-slate-400'}`}>
              Soft-Touch Therapeutic Device
            </p>
          </div>
          <button 
            onClick={onToggleWear}
            className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-90 ${isWearing ? 'bg-white/20 backdrop-blur-md text-white border border-white/30' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-100/50'}`}
          >
            {isWearing ? 'In Sync' : 'Connect'}
          </button>
        </div>
        
        {isWearing && (
          <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-2">
            <div className="bg-white/10 p-4 rounded-3xl border border-white/10">
              <p className="text-[9px] opacity-70 uppercase font-black tracking-widest mb-1">Stability</p>
              <p className="text-lg font-bold">Optimal</p>
            </div>
            <div className="bg-white/10 p-4 rounded-3xl border border-white/10">
              <p className="text-[9px] opacity-70 uppercase font-black tracking-widest mb-1">Time</p>
              <p className="text-lg font-bold">54m</p>
            </div>
          </div>
        )}
      </div>

      {/* Progress Section */}
      <div className="space-y-5">
        <h3 className="font-bold text-emerald-900/40 text-sm uppercase tracking-widest ml-1">Daily Wellness</h3>
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-[2.5rem] border border-emerald-50 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">Support Hours</p>
                <p className="text-[11px] text-slate-400">Target: 8 hours</p>
              </div>
            </div>
            <p className="text-lg font-black text-emerald-600">62%</p>
          </div>

          <div className="bg-white p-5 rounded-[2.5rem] border border-emerald-50 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">Movement Flow</p>
                <p className="text-[11px] text-slate-400">2 routines remaining</p>
              </div>
            </div>
            <p className="text-lg font-black text-teal-600">33%</p>
          </div>
        </div>
      </div>

      {/* Insight Card */}
      <div className="bg-gradient-to-r from-emerald-50/50 to-white p-6 rounded-[2.5rem] border border-emerald-100/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10 flex items-start space-x-4">
          <div className="mt-1 text-emerald-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path></svg>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-emerald-800/40 mb-1">Healing Insight</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Consistency is your strongest ally. Even 10 minutes of light movement while wearing the lace speeds up cellular recovery.
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Footer Disclaimer */}
      <div className="pt-4 pb-8 text-center px-4">
        <p className="text-[9px] text-emerald-800/30 font-medium leading-relaxed uppercase tracking-wider">
          Knee-Ease provides no medical claims or advice.
        </p>
      </div>
    </div>
  );
};

export default Home;
