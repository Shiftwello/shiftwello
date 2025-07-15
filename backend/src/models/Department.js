// src/models/Department.js
import db from "../config/db.js";

export const getAllDepartments = async () => {
  const [rows] = await db.query("SELECT id, name FROM departments ORDER BY name ASC");
  return rows;
};