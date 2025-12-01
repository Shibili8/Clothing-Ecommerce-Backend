import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, size, qty } = req.body;

    if (!productId || !size || !qty) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Convert to ObjectId (IMPORTANT)
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Ensure user exists
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });

    // If no cart, create new one
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    // Check if item with same product+size already exists
    const existingItem = cart.items.find(
      (i) =>
        i.product.toString() === productId &&
        i.size === size
    );

    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.items.push({
        product: productObjectId, // <-- FIX
        size,
        qty,
      });
    }

    await cart.save();

    return res.json({ message: "Item added", cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) return res.json({ items: [] });

    res.json({
      items: cart.items.map((item) => ({
        _id: item._id,
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        size: item.size,
        qty: item.qty,
      })),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const updateCartItem = async (req, res) => {
  try {
    const { productId, size, qty } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === productId && i.size === size
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.qty = qty;
    await cart.save();

    res.json({ message: "Quantity updated", cart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const removeCartItem = async (req, res) => {
  try {
    const { productId, size } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => !(i.product.toString() === productId && i.size === size)
    );

    await cart.save();

    res.json({ message: "Item removed", cart });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
