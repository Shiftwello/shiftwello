import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role_id: user.role_id,
      // Agregamos hierarchy_level aquí
      hierarchy_level: user.hierarchy_level
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};