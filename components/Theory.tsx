
import React from 'react';

interface TheoryProps {
  onGetStarted: () => void;
}

const Theory: React.FC<TheoryProps> = ({ onGetStarted }) => {
  return (
    <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Simple Header */}
      <section className="text-center space-y-4 pt-6">
        <div className="w-20 h-20 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner border border-emerald-100/50">
          <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.183.315l-1.42 1.066C3.153 16.818 3 17.391 3 18v2a1 1 0 001 1h16a1 1 0 001-1v-2c0-.609-.153-1.182-.443-1.572l-1.129-1.5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11l-3 3-3-3m3 3V3" />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-emerald-950 tracking-tight">Knee-Lace Theory</h2>
          <p className="text-emerald-800/60 font-medium text-sm max-w-[260px] mx-auto leading-relaxed">
            Discover the natural principles of gentle support and rhythmic recovery.
          </p>
        </div>
      </section>

      {/* Simple List of Benefits */}
      <div className="space-y-8 px-2">
        <div className="flex gap-6 items-start group">
          <div className="flex-shrink-0 w-12 h-12 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm transition-transform group-hover:scale-110">
            01
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-700 text-sm">Spiral Wrap Support</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">The unique lace wrapping provides stability by following the natural contours of your knee, offering firm yet flexible tension.</p>
          </div>
        </div>

        <div className="flex gap-6 items-start group">
          <div className="flex-shrink-0 w-12 h-12 rounded-3xl bg-teal-50 text-teal-500 flex items-center justify-center font-black text-sm transition-transform group-hover:scale-110">
            02
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-700 text-sm">Tactile Feedback</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">The texture of the mesh stimulates skin receptors to help your brain stay aware of your knee position, encouraging safer movement.</p>
          </div>
        </div>

        <div className="flex gap-6 items-start group">
          <div className="flex-shrink-0 w-12 h-12 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm transition-transform group-hover:scale-110">
            03
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-700 text-sm">Natural Fluid Flow</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">By maintaining optimal warmth and gentle pressure, the lace keeps the joint mobile and the internal fluids circulating smoothly.</p>
          </div>
        </div>
      </div>

      {/* Simplified Action Box */}
      <div className="bg-white p-8 rounded-[3.5rem] border border-emerald-50 shadow-sm space-y-6 text-center">
        <div className="space-y-2">
          <h4 className="font-bold text-emerald-950 text-lg">Foundation Protocol</h4>
          <p className="text-slate-400 text-xs font-medium leading-relaxed">
            Recovery is most effective when consistent. Use the lace during your daily activities to build lasting strength.
          </p>
        </div>
        <button 
          onClick={onGetStarted}
          className="w-full py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black rounded-3xl transition-all uppercase tracking-widest text-[10px] active:scale-95 shadow-xl shadow-emerald-200"
        >
          Enter Dashboard
        </button>
      </div>

      {/* Medical Disclaimer Section */}
      <div className="px-4 py-6 bg-emerald-50/30 rounded-3xl border border-emerald-100/50">
        <p className="text-[10px] text-emerald-900/50 font-medium leading-relaxed text-center uppercase tracking-wider mb-2">
          Medical Disclaimer
        </p>
        <p className="text-[9px] text-slate-500 leading-relaxed text-center">
          Knee-Ease is a wellness companion app and does not provide medical advice. No medical claims are made. This app and the wearable lace are not intended to diagnose, treat, or cure any medical condition. Always consult with a qualified healthcare professional before starting any new exercise routine or using therapeutic devices.
        </p>
      </div>

      <p className="text-center text-[10px] text-emerald-800/20 font-bold uppercase tracking-widest pb-4">
        Simplicity in Healing
      </p>
    </div>
  );
};

export default Theory;
