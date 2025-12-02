import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import { sendOrderEmail } from "../utils/sendEmail.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    for (const item of cart.items) {
      if (item.product.stock < item.qty) {
        return res.status(400).json({
          message: `Not enough stock for ${item.product.name}`,
        });
      }
    }

    for (const item of cart.items) {
      item.product.stock -= item.qty;
      await item.product.save();
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      size: item.size,
      qty: item.qty,
      price: item.product.price,
    }));

    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice,
    });

    cart.items = [];
    await cart.save();

    sendOrderEmail(order, req.user).catch(err =>
      console.log("Email error:", err)
    );

    res.status(201).json(order);
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

