import React from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://thriving-rebirth.up.railway.app";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PremiumPage = () => {
  const handlePayment = async () => {
  console.log("Payment click started");
  console.log("API_URL:", API_URL);
  console.log("Razorpay loaded:", !!window.Razorpay);

  try {
    const userId = localStorage.getItem("userId");

if (!userId) {
  alert("Please log in first.");
  return;
}

    const orderRes = await fetch(`${API_URL}/payment/create-order`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: localStorage.getItem("userId"),
  }),
});

    const order = await orderRes.json();

    if (!order?.id) {
      alert("Unable to start secure checkout.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Knee-Care",
      description: "One-time Premium Access",
      order_id: order.id,

      handler: async function (response: any) {
        try {
          const verifyRes = await fetch(`${API_URL}/payment/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();

          console.log("VERIFY RESPONSE:", verifyData);

          if (verifyData?.success === true) {
            alert("Premium unlocked successfully.");
            window.location.href = "/";
          } else {
            alert("Payment verification failed.");
          }
        } catch (err) {
          console.error("Verify error:", err);
          alert("Verification error");
        }
      },

      theme: {
        color: "#10b981",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Payment error:", error);
    alert("Something went wrong while starting payment.");
  }
};
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Premium Access</h1>

      <p className="text-gray-600">
        Unlock full knee support, exercises, diet plans, and AI guidance.
      </p>

      <button
        onClick={handlePayment}
        className="w-full bg-emerald-500 text-white py-2 rounded"
      >
        Unlock Premium Access
      </button>
    </div>
  );
};

export default PremiumPage;