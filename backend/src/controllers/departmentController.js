// src/controllers/departmentController.js
import { getAllDepartments } from "../models/Department.js";

export const listDepartments = async (req, res) => {
  try {
    const departments = await getAllDepartments();
    res.json(departments);
  } catch (err) {
    console.error("❌ Error listing departments:", err);
    res.status(500).json({ message: "Server error" });
  }
};