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
  { name: "Classic White T-Shirt", description: "Soft cotton tee perfect for everyday wear.", price: 499, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", category: "Men", sizes: ["S", "M", "L", "XL"], stock: 50, }, 
  { name: "Blue Denim Jeans", description: "Slim fit, comfortable stretch denim.", price: 1499, image: "https://images.unsplash.com/photo-1514996937319-344454492b37", category: "Men", sizes: ["30", "32", "34", "36"], stock: 30, },
  { name: "Black Hoodie", description: "Cozy fleece hoodie perfect for winter.", price: 1299, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764657113/Black_uyfpdk.jpg", category: "Men", sizes: ["M", "L", "XL"], stock: 40, },
  { name: "Men’s Formal Shirt", description: "Premium cotton shirt ideal for office use.", price: 899, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655691/Men_s_Formal_Shirt_gg5zoa.webp", category: "Men", sizes: ["S", "M", "L", "XL"], stock: 25, },
  { name: "Grey Track Pants", description: "Comfortable joggers for gym and casual wear.", price: 699, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655695/Grey_Track_Pants_z5x7dp.webp", category: "Men", sizes: ["M", "L", "XL"], stock: 35, },
  { name: "Floral Summer Dress", description: "Beautiful lightweight floral dress.", price: 1199, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655691/Floral_Summer_Dress_ijfuyk.webp", category: "Women", sizes: ["S", "M", "L"], stock: 20, },
  { name: "Women’s Casual Top", description: "Breathable fabric top perfect for outings.", price: 549, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655695/Women_s_Casual_Top_i0llkh.webp", category: "Women", sizes: ["S", "M", "L"], stock: 45, },
  { name: "Black Leggings", description: "Stretchable, comfortable leggings for daily wear.", price: 499, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655689/Black_Leggings_lx09uo.webp", category: "Women", sizes: ["S", "M", "L", "XL"], stock: 50, },
  { name: "Women’s Denim Jacket", description: "Stylish denim jacket for a trendy look.", price: 1599, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655695/Women_s_Denim_Jacket_ustptj.webp", category: "Women", sizes: ["S", "M", "L"], stock: 15, },
  { name: "Women’s Palazzo Pants", description: "Soft rayon palazzo pants for everyday comfort.", price: 799, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655697/Women_s_Palazzo_Pants_wfrsjw.jpg", category: "Women", sizes: ["S", "M", "L", "XL"], stock: 35, },
  { name: "Kids Cartoon T-Shirt", description: "Cute cotton tee with cartoon print.", price: 299, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655690/Kids_Cartoon_T-Shirt_y0ksas.jpg", category: "Kids", sizes: ["2-3Y", "4-5Y", "6-7Y"], stock: 60, },
  { name: "Kids Denim Shorts", description: "Comfortable shorts for active kids.", price: 399, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655696/Kids_Denim_Shorts_qidnyh.jpg", category: "Kids", sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"], stock: 40, },
  { name: "Kids Winter Jacket", description: "Warm puffer jacket for cold weather.", price: 1299, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655691/Kids_Winter_Jacket_sz7khl.webp", category: "Kids", sizes: ["4-5Y", "6-7Y", "8-9Y"], stock: 25, },{ name: "Men’s Sports Shorts", description: "Quick-dry shorts ideal for sports.", price: 499, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655692/Men_s_Sports_Shorts_hsvesh.webp", category: "Men", sizes: ["M", "L", "XL"], stock: 50, },
  { name: "Women’s Kurti", description: "Traditional kurti with modern design.", price: 999, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655695/Women_s_Kurti_evznqu.jpg", category: "Women", sizes: ["S", "M", "L", "XL"], stock: 30, },
  { name: "Unisex Cotton Socks (Pack of 3)", description: "Soft, breathable cotton socks.", price: 199, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655696/Unisex_Cotton_Socks_Pack_of_3_svajba.jpg", category: "Men", sizes: ["Free"], stock: 100, }, 
  { name: "Women’s Gym Tank Top", description: "Moisture-wicking tank for fitness workouts.", price: 699, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655694/Women_s_Gym_Tank_Top_taw2gc.webp", category: "Women", sizes: ["S", "M", "L"], stock: 25, }, 
  { name: "Men’s Leather Belt", description: "Premium leather belt with alloy buckle.", price: 799, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655692/Men_s_Leather_Belt_he5h7s.jpg", category: "Men", sizes: ["32", "34", "36", "38"], stock: 40, },
  { name: "Baby Onesie", description: "Soft cotton onesie for infants.", price: 349, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655690/Baby_Onesie_xfwjgg.webp", category: "Kids", sizes: ["0-6M", "6-12M", "12-18M"], stock: 30, },
  { name: "Women’s Long Skirt", description: "Elegant long skirt made of chiffon fabric.", price: 1099, image: "https://res.cloudinary.com/da4a06plx/image/upload/v1764655696/Women_s_Long_Skirt_eyuhld.webp", category: "Women", sizes: ["S", "M", "L"], stock: 20, }
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
