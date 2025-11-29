import Carts from "../models/Cart.js";

export const getCart = async (req, res) => {
  const userId = req.user._id;
  const cart = await Carts.findOne({ user: userId }).populate("items.product");
  res.json(cart || { user: userId, items: [] });
};

export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, size, qty } = req.body;
    console.log("Reached")
  if (!productId || !size || !qty) {
    return res.status(400).json({ message: "Missing fields" });
  }
  

  let cart = await Carts.findOne({ user: userId });
  if (!cart) cart = new Cart({ user: userId, items: [] });

  const existingIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId && item.size === size
  );

  if (existingIndex > -1) {
    cart.items[existingIndex].qty += qty;
  } else {
    cart.items.push({ product: productId, size, qty });
  }

  await cart.save();
  res.json(cart);
};

export const updateCartItem = async (req, res) => {
  const userId = req.user._id;
  const { productId, size, qty } = req.body;

  let cart = await Carts.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(
    (i) => i.product.toString() === productId && i.size === size
  );
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.qty = qty;
  if (item.qty <= 0) {
    cart.items = cart.items.filter(
      (i) => !(i.product.toString() === productId && i.size === size)
    );
  }

  await cart.save();
  res.json(cart);
};

export const removeFromCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, size } = req.body;

  let cart = await Carts.findOne({ user: userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (i) => !(i.product.toString() === productId && i.size === size)
  );

  await cart.save();
  res.json(cart);
};
