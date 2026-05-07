import React from "react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://thriving-rebirth-production.up.railway.app";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PremiumPage = () => {

  const handlePayment = async () => {
    try {

      console.log("Payment click started");
      console.log("KEY CHECK:", import.meta.env.VITE_RAZORPAY_KEY_ID);

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      // 1. CREATE ORDER
      const response = await fetch(
        `${API_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 499,
          }),
        }
      );

      const data = await response.json();

      console.log("ORDER RESPONSE:", data);

      if (!data.success) {
        alert(data.message || "Order creation failed");
        return;
      }

      // 2. RAZORPAY OPTIONS
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,

        name: "Knee-Ease",
        description: "Premium Upgrade",

        // 3. PAYMENT HANDLER (SECURE VERIFY)
        handler: async function (response: any) {
          try {

            console.log("PAYMENT SUCCESS:", response);

            const verifyRes = await fetch(
              `${API_URL}/api/payment/verify-payment`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  userId: localStorage.getItem("userId"),
                }),
              }
            );

            const verifyData = await verifyRes.json();

            console.log("VERIFY RESPONSE:", verifyData);

            if (verifyData.success) {
              alert("🎉 Premium Activated Successfully");
              window.location.href = "/";
            } else {
              alert("Payment verification failed");
            }

          } catch (err) {
            console.error("VERIFY ERROR:", err);
            alert("Verification error");
          }
        },

        theme: {
          color: "#10b981",
        },
      };

      console.log("OPENING RAZORPAY");

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("PAYMENT ERROR:", error);
      alert("Payment failed");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Premium Access</h1>

      <p className="text-gray-600">
        Unlock full knee support, exercises,
        diet plans, and AI guidance.
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