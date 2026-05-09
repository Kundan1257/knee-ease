import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());
app.use(express.json());

/* ---------------- DB ---------------- */

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI missing");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Error ❌", err));

/* ---------------- HEALTH ---------------- */

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ---------------- START ---------------- */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});