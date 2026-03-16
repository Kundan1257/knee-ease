import React from "react";

const Contact = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

      <p className="mb-4">
        Have questions, feedback, or need help with Knee-Ease? We’d love to hear from you.
      </p>

      <div className="bg-white shadow rounded-xl p-4 space-y-3">
        <p>
          <strong>Email:</strong> support@knee-ease.app
        </p>

        <p>
          <strong>Response Time:</strong> Usually within 24–48 hours
        </p>

        <p>
          For bug reports, feature suggestions, or general support, please include
          a short description of the issue so we can help you faster.
        </p>
      </div>
    </div>
  );
};

export default Contact;