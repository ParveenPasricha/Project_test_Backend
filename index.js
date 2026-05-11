const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const productRoutes = require("./Routes/AdminRoute/ProductRoute");

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://project-test-navy-three.vercel.app/",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

/* ================= ROUTES ================= */
app.use("/api/products", productRoutes);

/* ================= ROOT ================= */
app.get("/", (req, res) => {
  res.send("Welcome Node Project");
});

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Connection Error:", err);
  });

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server + Socket.IO running on port ${PORT}`);
});