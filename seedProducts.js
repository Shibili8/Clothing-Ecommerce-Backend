import mongoose from "mongoose";
import Product from "./models/Product.js";

// 🚨 DO NOT import connectDB here — it loads before dotenv
// Instead connect manually using MONGO_URI

const MONGO_URI = `mongodb+srv://Shibili8:Shibi%4099@eightcluster.u23shrc.mongodb.net/clothing_ecommerce_app`;

if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is missing from .env");
  process.exit(1);
}

const products = [
  // ... your same product array ...
];

const seed = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected.");

    await Product.deleteMany();
    console.log("Old products removed.");

    await Product.insertMany(products);
    console.log("✅ Products seeded successfully!");

    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seed();
