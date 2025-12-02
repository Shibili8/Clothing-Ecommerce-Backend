import express from "express";
import { forgotPassword, resetPassword } from "../controllers/authController.js";
import { registerUser, loginUser, logoutUser, getProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getProfile);
router.get("/test", (req, res) => {
  res.send("Auth API working");
});
// Forgot + Reset Password (correct order)
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
