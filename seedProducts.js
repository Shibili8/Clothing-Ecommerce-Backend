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
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655690/Black_Hoodie_itqydh.webp",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 40,
  },

  // 4
  {
    name: "Men’s Formal Shirt",
    description: "Premium cotton shirt ideal for office use.",
    price: 899,
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655691/Men_s_Formal_Shirt_gg5zoa.webp",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
  },

  // 5
  {
    name: "Grey Track Pants",
    description: "Comfortable joggers for gym and casual wear.",
    price: 699,
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655695/Grey_Track_Pants_z5x7dp.webp",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 35,
  },

  // 6
  {
    name: "Floral Summer Dress",
    description: "Beautiful lightweight floral dress.",
    price: 1199,
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655691/Floral_Summer_Dress_ijfuyk.webp",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 20,
  },

  // 7
  {
    name: "Women’s Casual Top",
    description: "Breathable fabric top perfect for outings.",
    price: 549,
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655695/Women_s_Casual_Top_i0llkh.webp",
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
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655695/Women_s_Denim_Jacket_ustptj.webp",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 15,
  },

  // 10
  {
    name: "Women’s Palazzo Pants",
    description: "Soft rayon palazzo pants for everyday comfort.",
    price: 799,
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655697/Women_s_Palazzo_Pants_wfrsjw.jpg",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 35,
  },

  // 11
  {
    name: "Kids Cartoon T-Shirt",
    description: "Cute cotton tee with cartoon print.",
    price: 299,
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655690/Kids_Cartoon_T-Shirt_y0ksas.jpg",
    category: "Kids",
    sizes: ["2-3Y", "4-5Y", "6-7Y"],
    stock: 60,
  },

  // 12
  {
    name: "Kids Denim Shorts",
    description: "Comfortable shorts for active kids.",
    price: 399,
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655696/Kids_Denim_Shorts_qidnyh.jpg",
    category: "Kids",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    stock: 40,
  },

  // 13
  {
    name: "Kids Winter Jacket",
    description: "Warm puffer jacket for cold weather.",
    price: 1299,
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655691/Kids_Winter_Jacket_sz7khl.webp",
    category: "Kids",
    sizes: ["4-5Y", "6-7Y", "8-9Y"],
    stock: 25,
  },

  // 14
  {
    name: "Men’s Sports Shorts",
    description: "Quick-dry shorts ideal for sports.",
    price: 499,
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655692/Men_s_Sports_Shorts_hsvesh.webp",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 50,
  },

  // 15
  {
    name: "Women’s Kurti",
    description: "Traditional kurti with modern design.",
    price: 999,
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655695/Women_s_Kurti_evznqu.jpg",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 30,
  },

  // 16
  {
    name: "Unisex Cotton Socks (Pack of 3)",
    description: "Soft, breathable cotton socks.",
    price: 199,
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655696/Unisex_Cotton_Socks_Pack_of_3_svajba.jpg",
    category: "Men",
    sizes: ["Free"],
    stock: 100,
  },

  // 17
  {
    name: "Women’s Gym Tank Top",
    description: "Moisture-wicking tank for fitness workouts.",
    price: 699,
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655694/Women_s_Gym_Tank_Top_taw2gc.webp",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 25,
  },

  // 18
  {
    name: "Men’s Leather Belt",
    description: "Premium leather belt with alloy buckle.",
    price: 799,
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655692/Men_s_Leather_Belt_he5h7s.jpg",
    category: "Men",
    sizes: ["32", "34", "36", "38"],
    stock: 40,
  },

  // 19
  {
    name: "Baby Onesie",
    description: "Soft cotton onesie for infants.",
    price: 349,
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655690/Baby_Onesie_xfwjgg.webp",
    category: "Kids",
    sizes: ["0-6M", "6-12M", "12-18M"],
    stock: 30,
  },

  // 20
  {
    name: "Women’s Long Skirt",
    description: "Elegant long skirt made of chiffon fabric.",
    price: 1099,
    image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655696/Women_s_Long_Skirt_eyuhld.webp",
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
