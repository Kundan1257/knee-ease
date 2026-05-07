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

      console.log("Payment started");

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      const res = await fetch(
        `${API_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 499 }),
        }
      );

      const data = await res.json();

      console.log("ORDER:", data);

      if (!data.success) {
        alert("Order failed");
        return;
      }

      const options = {
        key: data.key,

        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,

        name: "Knee-Ease",
        description: "Premium Access",

        handler: async function (response: any) {
          try {

            const verify = await fetch(
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

            const result = await verify.json();

            console.log("VERIFY:", result);

            if (result.success) {
              alert("Premium Activated 🎉");
            } else {
              alert("Verification failed");
            }

          } catch (err) {
            console.error(err);
          }
        },

        theme: {
          color: "#10b981",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return (
    <div className="p-6">
      <h1>Premium Access</h1>

      <button onClick={handlePayment}>
        Unlock Premium
      </button>
    </div>
  );
};

export default PremiumPage;