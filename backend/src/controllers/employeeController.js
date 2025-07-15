import bcrypt from "bcryptjs";
import { createEmployee, getAllEmployees, getEmployeeByIdDB, updateEmployeeDB } from "../models/Employee.js";
import jwt from "jsonwebtoken";  // Importación corregida

export const addEmployee = async (req, res) => {
  try {
    const { full_name, username, password, email, role_id, department_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const employeeId = await createEmployee({
      full_name,
      username,
      password: hashedPassword,
      email,
      role_id,
      department_id
    });
    res.status(201).json({ message: "Employee created", employeeId });
  } catch (err) {
    console.error("❌ Error creating employee:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listEmployees = async (req, res) => {
  try {
    const { department_id } = req.query;
    const employees = await getAllEmployees(department_id);
    res.json(employees);
  } catch (err) {
    console.error("❌ Error listing employees:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await getEmployeeByIdDB(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    console.error("❌ Error fetching employee:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { full_name, username, email, password, role_id, department_id, active } = req.body;
  try {
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    await updateEmployeeDB(id, { full_name, username, email, password: hashedPassword, role_id, department_id, active });
    res.json({ message: "Employee updated" });
  } catch (err) {
    console.error("❌ Error updating employee:", err);
    res.status(500).json({ message: "Server error" });
  }
};