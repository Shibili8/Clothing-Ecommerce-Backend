import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, size, qty } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, size, qty }]
      });
    } else {
      const exist = cart.items.find(
        (i) => i.product.toString() === productId && i.size === size
      );

      if (exist) {
        exist.qty += qty;
      } else {
        cart.items.push({ product: productId, size, qty });
      }

      await cart.save();
    }

    res.json({ message: "Added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart) return res.json({ items: [] });

    // Format items to match frontend
    res.json({
      items: cart.items.map((item) => ({
        _id: item._id,
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        size: item.size,
        qty: item.qty
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const updateCartItem = async (req, res) => {
  try {
    const { productId, size, qty } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === productId && i.size === size
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.qty = qty;
    await cart.save();

    res.json({ message: "Quantity updated", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    res.status(500).json({ message: err.message });
  }
};
