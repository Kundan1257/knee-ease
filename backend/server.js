import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

/* ---------------- ENV DEBUG (SAFE) ---------------- */

console.log("RAZORPAY KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY SECRET EXISTS:", !!process.env.RAZORPAY_KEY_SECRET);

/* ---------------- DB ---------------- */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error ❌", err));

/* ---------------- RAZORPAY INSTANCE (ONLY ONCE) ---------------- */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ---------------- PAYMENT ROUTE (ONLY ONE) ---------------- */

app.post("/payment/create-order", async (req, res) => {
  try {
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
    console.error("❌ CREATE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Order creation failed"
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

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});