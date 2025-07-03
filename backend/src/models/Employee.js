import db from "../config/db.js";

export const createEmployee = async ({ full_name, username, password, email, role_id }) => {
  const [result] = await db.query(
    "INSERT INTO employees (full_name, username, password, email, role_id) VALUES (?, ?, ?, ?, ?)",
    [full_name, username, password, email, role_id]
  );
  return result.insertId;
};

export const getAllEmployees = async () => {
  const [rows] = await db.query("SELECT id, full_name, username, email, role_id, active, created_at FROM employees");
  return rows;
};