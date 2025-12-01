import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction,                     // true only on Render HTTPS
    sameSite: isProduction ? "none" : "lax",  // none only on https
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
