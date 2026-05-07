import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ---------------- SAFETY DEBUG (CRASH TRACE) ---------------- */

console.log("🔥 SERVER FILE STARTED");

process.on("uncaughtException", (err) => {
  console.error("💥 UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("💥 UNHANDLED REJECTION:", err);
});

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

/* ---------------- ENV DEBUG ---------------- */

console.log("RAZORPAY KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY SECRET EXISTS:", !!process.env.RAZORPAY_KEY_SECRET);

/* ---------------- DB ---------------- */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error ❌", err));

/* ---------------- RAZORPAY INSTANCE ---------------- */

const razorpay = new Razorpay({
  key_id: String(process.env.RAZORPAY_KEY_ID).trim(),
  key_secret: String(process.env.RAZORPAY_KEY_SECRET).trim(),
});

/* ---------------- PAYMENT ROUTE ---------------- */

app.post("/api/payment/create-order", async (req, res) => {
  try {
    console.log("✅ Razorpay instance created");
    console.log("🔥 Payment request received:", req.body);

    const amount = req.body?.amount;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount"
      });
    }

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    return res.json({
      success: true,
      order
    });

  } catch (error) {

  console.log("❌ FULL ERROR START ❌");

  console.log("message:", error?.message);

  console.log("description:", error?.description);

  console.log("error object:", error);

  console.log("❌ FULL ERROR END ❌");

  return res.status(500).json({
    success: false,
    message: error?.message || "Order creation failed"
  });
}
});

/* ---------------- USER MODEL ---------------- */

const userSchema = new mongoose.Schema({
  userId: String,
  isPremium: { type: Boolean, default: false }
});

const User = mongoose.model("User", userSchema);

/* ---------------- ROUTES ---------------- */

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.get("/user/:userId", async (req, res) => {
  const user = await User.findOne({ userId: req.params.userId });

  res.json({
    userId: req.params.userId,
    isPremium: user?.isPremium || false
  });
});

/* ---------------- SERVER START ---------------- */

const PORT = process.env.PORT || 8080;
console.log("✅ About to start server");
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
