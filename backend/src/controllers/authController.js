import bcrypt from "bcryptjs";
import db from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM employees WHERE username = ?", [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
        role_id: user.role_id
      }
    });
  } catch (err) {
    console.error("❌ Error in login:", err);
    res.status(500).json({ message: "Server error" });
  }
};