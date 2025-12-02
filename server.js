import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

// TRUST PROXY MUST COME FIRST (Render requirement)
app.set("trust proxy", 1);

// DB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS — FINAL WORKING CONFIG
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://clothing-ecommerce-frontend.onrender.com"  // <-- UPDATE THIS
    ],
    credentials: true,
  })
);

// Optional: Avoid long hung requests on Render
app.use((req, res, next) => {
  res.setTimeout(45000, () => {
    console.log("Request timed out");
    res.status(504).json({ message: "Server timeout" });
  });
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
