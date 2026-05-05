import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(
  cors({
    origin: "*", // safe for testing; later restrict to frontend domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());
app.use(express.json());

/* ---------------- ENV CHECK ---------------- */
app.get("/user/:userId", (req, res) => {
  res.json({
    userId: req.params.userId,
    isPremium: false
  });
});
const PORT = process.env.PORT || 8080;

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing");
}

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay keys missing");
}

/* ---------------- MONGO DB ---------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Error ❌", err.message));

/* ---------------- RAZORPAY ---------------- */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
console.log("RAZORPAY_KEY_ID =", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_SECRET_EXISTS =", !!process.env.RAZORPAY_KEY_SECRET);
/* ---------------- USER MODEL ---------------- */

const userSchema = new mongoose.Schema({
  userId: String,
  isPremium: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

/* ---------------- ROUTES ---------------- */

// Health check
app.get("/", (req, res) => {
  res.send("Knee-Ease backend live 🚀");
});

// Get user
app.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });

    res.json({
      userId: req.params.userId,
      isPremium: user?.isPremium || false,
    });
  } catch (err) {
    console.error("User fetch error:", err);
    res.status(500).json({
      userId: req.params.userId,
      isPremium: false,
    });
  }
});

// Create Razorpay order
app.post("/payment/create-order", async (req, res) => {
  try {
    const { amount = 499 } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    });

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
});

// Verify payment
app.post("/payment/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
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
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: "Premium unlocked",
    });
  } catch (err) {
    console.error("Verify payment error:", err);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on", PORT);
});