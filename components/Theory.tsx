import React from 'react';

interface TheoryProps {
  onGetStarted: () => void;
}

const Theory: React.FC<TheoryProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col justify-between h-full px-6 py-10">

      {/* Top Section */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-emerald-900">
            Welcome to Knee-Ease
          </h2>
          <p className="text-sm text-slate-500">
            Gentle structure. Consistent recovery. Natural strength.
          </p>
        </div>

        <div className="space-y-4 mt-8">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
            <h4 className="font-semibold text-slate-700 text-sm">
              Spiral Support
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Stable wrapping that follows natural knee contours.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
            <h4 className="font-semibold text-slate-700 text-sm">
              Tactile Feedback
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Encourages safer, more aware movement.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
            <h4 className="font-semibold text-slate-700 text-sm">
              Fluid Mobility
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Maintains warmth and smooth joint motion.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="space-y-4 mt-10">
        <button
          onClick={onGetStarted}
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-semibold active:scale-95 transition"
        >
          Continue
        </button>

        <p className="text-[10px] text-center text-slate-400">
          Wellness support only. Not medical advice.
        </p>
      </div>

    </div>
  );
};

export default Theory;