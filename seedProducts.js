import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Classic White T-Shirt",
    description: "Soft cotton tee perfect for everyday wear.",
    price: 499,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
  },
  {
    name: "Blue Denim Jeans",
    description: "Slim fit, comfortable stretch denim.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1514996937319-344454492b37",
    category: "Men",
    sizes: ["30", "32", "34", "36"],
    stock: 30,
  },
  // ➜ add at least 20 products total with different categories & sizes
];

const seed = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
