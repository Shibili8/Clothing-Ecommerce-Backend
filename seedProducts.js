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

  // 3
  {
    name: "Black Hoodie",
    description: "Cozy fleece hoodie perfect for winter.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1602297922815-00947d39f57c",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 40,
  },

  // 4
  {
    name: "Men’s Formal Shirt",
    description: "Premium cotton shirt ideal for office use.",
    price: 899,
    image: "https://images.unsplash.com/photo-1598033129183-c84ff2f403d3",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
  },

  // 5
  {
    name: "Grey Track Pants",
    description: "Comfortable joggers for gym and casual wear.",
    price: 699,
    image: "https://images.unsplash.com/photo-1598188306155-c4bc1b9d17ac",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 35,
  },

  // 6
  {
    name: "Floral Summer Dress",
    description: "Beautiful lightweight floral dress.",
    price: 1199,
    image: "https://images.unsplash.com/photo-1520975918318-3b1a252cd99b",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 20,
  },

  // 7
  {
    name: "Women’s Casual Top",
    description: "Breathable fabric top perfect for outings.",
    price: 549,
    image: "https://images.unsplash.com/photo-1520974735194-3f81c6a5f3bb",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 45,
  },

  // 8
  {
    name: "Black Leggings",
    description: "Stretchable, comfortable leggings for daily wear.",
    price: 499,
    image: "https://images.unsplash.com/photo-1524250502761-1ac6f2e0c2f3",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
  },

  // 9
  {
    name: "Women’s Denim Jacket",
    description: "Stylish denim jacket for a trendy look.",
    price: 1599,
    image: "https://images.unsplash.com/photo-1531925470851-1b5896aa0ce0",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 15,
  },

  // 10
  {
    name: "Women’s Palazzo Pants",
    description: "Soft rayon palazzo pants for everyday comfort.",
    price: 799,
    image: "https://images.unsplash.com/photo-1602810312768-f97c67c9cbd6",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 35,
  },

  // 11
  {
    name: "Kids Cartoon T-Shirt",
    description: "Cute cotton tee with cartoon print.",
    price: 299,
    image: "https://images.unsplash.com/photo-1503341309080-c9183c0ab641",
    category: "Kids",
    sizes: ["2-3Y", "4-5Y", "6-7Y"],
    stock: 60,
  },

  // 12
  {
    name: "Kids Denim Shorts",
    description: "Comfortable shorts for active kids.",
    price: 399,
    image: "https://images.unsplash.com/photo-1530018607912-eff2daa1acda",
    category: "Kids",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    stock: 40,
  },

  // 13
  {
    name: "Kids Winter Jacket",
    description: "Warm puffer jacket for cold weather.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1602810312645-2043614d63fa",
    category: "Kids",
    sizes: ["4-5Y", "6-7Y", "8-9Y"],
    stock: 25,
  },

  // 14
  {
    name: "Men’s Sports Shorts",
    description: "Quick-dry shorts ideal for sports.",
    price: 499,
    image: "https://images.unsplash.com/photo-1599055877397-3028e05aba5e",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 50,
  },

  // 15
  {
    name: "Women’s Kurti",
    description: "Traditional kurti with modern design.",
    price: 999,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 30,
  },

  // 16
  {
    name: "Unisex Cotton Socks (Pack of 3)",
    description: "Soft, breathable cotton socks.",
    price: 199,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a2a5",
    category: "Men",
    sizes: ["Free"],
    stock: 100,
  },

  // 17
  {
    name: "Women’s Gym Tank Top",
    description: "Moisture-wicking tank for fitness workouts.",
    price: 699,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 25,
  },

  // 18
  {
    name: "Men’s Leather Belt",
    description: "Premium leather belt with alloy buckle.",
    price: 799,
    image: "https://images.unsplash.com/photo-1589737995688-97d43e95b0d9",
    category: "Men",
    sizes: ["32", "34", "36", "38"],
    stock: 40,
  },

  // 19
  {
    name: "Baby Onesie",
    description: "Soft cotton onesie for infants.",
    price: 349,
    image: "https://images.unsplash.com/photo-1495121605193-b116b5b09e17",
    category: "Kids",
    sizes: ["0-6M", "6-12M", "12-18M"],
    stock: 30,
  },

  // 20
  {
    name: "Women’s Long Skirt",
    description: "Elegant long skirt made of chiffon fabric.",
    price: 1099,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f74",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 20,
  }
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
