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

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
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

app.post("/payment/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false });
    }

    await User.findOneAndUpdate(
      { userId },
      { isPremium: true },
      { upsert: true }
    );

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

/* ---------------- START ---------------- */

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});