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

export const getEmployeeByIdDB = async (id) => {
  const [rows] = await db.query("SELECT id, full_name, username, email, role_id, active, created_at FROM employees WHERE id = ?", [id]);
  return rows[0]; // devuelve un solo objeto o undefined si no existe
};

export const updateEmployeeDB = async (id, { full_name, username, email, password, role_id, active }) => {
  // Construimos query y parámetros dinámicamente para no actualizar password si no se envía
  let query = "UPDATE employees SET full_name = ?, username = ?, email = ?, role_id = ?, active = ?";
  const params = [full_name, username, email, role_id, active];

  if (password) {
    query += ", password = ?";
    params.push(password);
  }
  query += " WHERE id = ?";
  params.push(id);

  const [result] = await db.query(query, params);
  return result.affectedRows;
};