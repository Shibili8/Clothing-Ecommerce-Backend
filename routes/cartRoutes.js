import express from "express";
import { addToCart, getCart, updateCartItem, removeCartItem } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);         // <----- MUST HAVE protect
router.get("/", protect, getCart);
router.put("/update", protect, updateCartItem);
router.delete("/remove", protect, removeCartItem);

export default router;
