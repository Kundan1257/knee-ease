
import React from 'react';
import { Exercise } from '../types';

const EXERCISES: Exercise[] = [
  {
    id: '1',
    title: 'Seated Leg Extensions',
    description: 'Slowly straighten your knee while seated, hold for 5 seconds, then lower.',
    duration: '5 mins',
    reps: '3 sets of 10',
    intensity: 'Low',
    icon: 'M13 5l7 7-7 7M5 5l7 7-7 7'
  },
  {
    id: '2',
    title: 'Straight Leg Raises',
    description: 'Lie flat on your back and lift your leg 12 inches, keeping it straight.',
    duration: '8 mins',
    reps: '2 sets of 15',
    intensity: 'Medium',
    icon: 'M5 10l7-7m0 0l7 7m-7-7v18'
  },
  {
    id: '3',
    title: 'Ankle Pumps',
    description: 'Flex your foot up and down to improve circulation while wearing the lace.',
    duration: '3 mins',
    reps: 'Ongoing',
    intensity: 'Low',
    icon: 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4'
  }
];

const Exercises: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-800">Movement Flow</h2>
        <p className="text-slate-400 text-sm font-medium">Gentle sequences to nourish your joints.</p>
      </div>

      <div className="space-y-5">
        {EXERCISES.map((ex) => (
          <div key={ex.id} className="bg-white rounded-[2.5rem] p-6 border border-emerald-50 shadow-sm flex items-start space-x-5 group hover:border-emerald-100 transition-all">
            <div className={`flex-shrink-0 w-14 h-14 rounded-3xl flex items-center justify-center transition-colors ${
              ex.intensity === 'Low' ? 'bg-emerald-50 text-emerald-500' : 'bg-teal-50 text-teal-500'
            }`}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={ex.icon} />
              </svg>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-slate-700">{ex.title}</h3>
                <span className={`px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                  ex.intensity === 'Low' ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'
                }`}>
                  {ex.intensity}
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed mb-5 font-medium">{ex.description}</p>
              
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-4 text-[9px] font-black text-slate-300 uppercase tracking-tighter">
                  <span className="flex items-center">
                    <svg className="w-3.5 h-3.5 mr-1 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {ex.duration}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-3.5 h-3.5 mr-1 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    {ex.reps}
                  </span>
                </div>
                <button className="text-emerald-700 text-[10px] font-black tracking-widest uppercase hover:text-emerald-900 transition-colors">
                  Begin
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
