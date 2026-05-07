import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ---------------- SAFETY ---------------- */

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());
app.use(express.json());

/* ---------------- ENV CHECK ---------------- */

if (
  !process.env.RAZORPAY_KEY_ID ||
  !process.env.RAZORPAY_KEY_SECRET ||
  !process.env.MONGO_URI
) {
  console.error("Missing ENV variables");
  process.exit(1);
}

/* ---------------- DB ---------------- */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("MongoDB Error ❌", err));

/* ---------------- RAZORPAY ---------------- */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID.trim(),
  key_secret: process.env.RAZORPAY_KEY_SECRET.trim(),
});

/* ---------------- USER MODEL ---------------- */

const userSchema = new mongoose.Schema({
  userId: String,
  isPremium: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

/* ---------------- HEALTH ---------------- */

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ---------------- GET USER ---------------- */

app.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });

    res.json({
      success: true,
      userId: req.params.userId,
      isPremium: user?.isPremium || false,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
});

/* ---------------- CREATE ORDER ---------------- */

app.post("/api/payment/create-order", async (req, res) => {
  try {

    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    console.log("Order Created:", order.id);

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (err) {
    console.error("Create Order Error ❌", err);

    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
});

/* ---------------- VERIFY PAYMENT (IMPORTANT) ---------------- */

app.post("/api/payment/verify-payment", async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    await User.findOneAndUpdate(
      { userId },
      { isPremium: true },
      { upsert: true }
    );

    res.json({
      success: true,
      message: "Payment verified & premium activated",
    });

  } catch (err) {
    console.error("Verify Error ❌", err);

    res.status(500).json({
      success: false,
      message: "Verification failed",
    });
  }
});

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});