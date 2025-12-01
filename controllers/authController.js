import crypto from "crypto";
import User from "../models/User.js";
import nodemailer from "nodemailer";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import sendResetEmail from "../utils/sendResetEmail.js"; // new unified email sender


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    
    if (exists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    
    generateToken(res, user._id);

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logoutUser = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out" });
};

export const getProfile = (req, res) => {
  res.json(req.user);
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // Create raw token (NOT JWT anymore)
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save();

    // Link sent to frontend
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // Send email using SendGrid
    await sendResetEmail(user.email, resetLink);

    res.json({ message: "Password reset link sent to your email." });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hash token to compare with DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() } // Check expiry
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

