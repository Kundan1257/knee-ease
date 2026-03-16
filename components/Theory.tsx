import React from 'react';

interface TheoryProps {
  onGetStarted: () => void;
}

const Theory: React.FC<TheoryProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col justify-between h-full px-5 py-8 bg-[#F4F9F4]">

      {/* Header / Welcome */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-emerald-800">
            Welcome to Knee-Ease
          </h2>
          <p className="text-sm text-slate-600">
            Gentle structure. Consistent recovery. Natural strength.
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-4 mt-6">
          {[
            {
              title: 'Spiral Support',
              desc: 'Stable wrapping that follows natural knee contours.'
            },
            {
              title: 'Tactile Feedback',
              desc: 'Encourages safer, more aware movement.'
            },
            {
              title: 'Fluid Mobility',
              desc: 'Maintains warmth and smooth joint motion.'
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl shadow-md border border-emerald-100 hover:scale-[1.01] transition"
            >
              <h4 className="font-semibold text-emerald-700 text-base">{feature.title}</h4>
              <p className="text-sm text-slate-500 mt-1">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="mt-8 space-y-3">
        <button
          onClick={onGetStarted}
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-semibold shadow-lg hover:bg-emerald-700 active:scale-95 transition"
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