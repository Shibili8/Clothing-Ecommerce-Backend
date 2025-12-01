import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // 30 sec
      socketTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });

    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB Initial Connection Error:", err.message);

    // 🔁 Retry after 5 sec (avoids Render cold start crash)
    setTimeout(connectDB, 5000);
  }
};

// 🔄 Auto-retry on connection loss
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected — retrying...");
  isConnected = false;
  connectDB();
});

// ❗ Log low-level errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err.message);
});

export default connectDB;
