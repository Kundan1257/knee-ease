import React from "react";

const Disclaimer = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Medical Disclaimer</h1>

      <p className="mb-4">
        Knee-Ease provides general wellness information related to knee care,
        exercise, and joint comfort. The content provided in this app is for
        informational purposes only.
      </p>

      <p className="mb-4">
        It is not intended to replace professional medical advice, diagnosis,
        or treatment from a qualified healthcare provider.
      </p>

      <p className="mb-4">
        Always seek the advice of a medical professional if you experience
        severe or persistent knee pain, injury, swelling, or difficulty moving.
      </p>

      <p>
        By using Knee-Ease, you acknowledge that you understand this disclaimer.
      </p>
    </div>
  );
};

export default Disclaimer;