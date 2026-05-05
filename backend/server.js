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

/* ---------------- ENV CHECK ---------------- */

console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("SECRET EXISTS:", !!process.env.RAZORPAY_KEY_SECRET);

/* ---------------- DB ---------------- */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ---------------- RAZORPAY ---------------- */

app.post("/payment/create-order", async (req, res) => {
  try {
    const Razorpay = require("razorpay");
console.log("KEY:", process.env.RAZORPAY_KEY_ID);
console.log("SECRET LENGTH:", process.env.RAZORPAY_KEY_SECRET?.length);
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: 499 * 100,
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    });

    res.json({ success: true, order });

  } catch (err) {
    console.log("Create order error:", err);
    res.status(500).json({ success: false });
  }
});

/* ---------------- MODEL ---------------- */

const userSchema = new mongoose.Schema({
  userId: String,
  isPremium: { type: Boolean, default: false }
});

const User = mongoose.model("User", userSchema);

/* ---------------- ROUTES ---------------- */
console.log("RAZORPAY KEY CHECK:", {
  key: process.env.RAZORPAY_KEY_ID,
  secretExists: !!process.env.RAZORPAY_KEY_SECRET
});
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/user/:userId", async (req, res) => {
  const user = await User.findOne({ userId: req.params.userId });

  res.json({
    userId: req.params.userId,
    isPremium: user?.isPremium || false
  });
});

app.post("/payment/create-order", async (req, res) => {
  try {
    const { amount = 499 } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "rcpt_" + Date.now()
    });

    res.json({ success: true, order });

  } catch (err) {
    console.log("Create order error:", err);

    res.status(500).json({
      success: false,
      message: "Order creation failed"
    });
  }
});

app.post("/payment/create-order", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const amount = req.body?.amount;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});