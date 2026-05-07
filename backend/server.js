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

/* ---------------- ENV SAFETY CHECK ---------------- */

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI missing");
  process.exit(1);
}

/* ---------------- DB ---------------- */

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("MongoDB Error ❌", err));

/* ---------------- RAZORPAY ---------------- */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ---------------- USER MODEL ---------------- */

const User = mongoose.model("User", {
  userId: String,
  isPremium: { type: Boolean, default: false }
});

/* ---------------- HEALTH ---------------- */

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ---------------- CREATE ORDER ---------------- */

app.post("/api/payment/create-order", async (req, res) => {
  try {

    const amount = Number(req.body.amount);

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount"
      });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    });

    return res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency
      },
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/* ---------------- VERIFY PAYMENT ---------------- */

app.post("/api/payment/create-order", async (req, res) => {

  try {

    console.log("CREATE ORDER HIT");
    console.log("BODY:", req.body);

    const amount = Number(req.body.amount);

    console.log("AMOUNT:", amount);

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    });

    console.log("ORDER SUCCESS:", order);

    return res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency
      },
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (err) {

    console.error("CREATE ORDER FULL ERROR:");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

/* ---------------- START ---------------- */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});