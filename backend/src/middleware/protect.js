import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar usuario en DB por id para verificar que exista y esté activo
      const [rows] = await db.query("SELECT id, full_name, username, email, role_id FROM employees WHERE id = ? AND active = 1", [decoded.id]);

      if (rows.length === 0) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      req.user = rows[0];
      return next();
    } catch (err) {
      console.error("❌ Token verification failed:", err);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};