import bcrypt from "bcryptjs";
import { createEmployee, getAllEmployees } from "../models/Employee.js";

export const addEmployee = async (req, res) => {
  try {
    const { full_name, username, password, email, role_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const employeeId = await createEmployee({
      full_name,
      username,
      password: hashedPassword,
      email,
      role_id
    });
    res.status(201).json({ message: "Employee created", employeeId });
  } catch (err) {
    console.error("❌ Error creating employee:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listEmployees = async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.json(employees);
  } catch (err) {
    console.error("❌ Error listing employees:", err);
    res.status(500).json({ message: "Server error" });
  }
};