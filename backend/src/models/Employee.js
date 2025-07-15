import db from "../config/db.js";

export const createEmployee = async ({ full_name, username, password, email, role_id, department_id }) => {
  const [result] = await db.query(
    "INSERT INTO employees (full_name, username, password, email, role_id, department_id) VALUES (?, ?, ?, ?, ?, ?)",
    [full_name, username, password, email, role_id, department_id]
  );
  return result.insertId;
};

export const getAllEmployees = async (departmentId) => {
  let query = `
    SELECT e.id, e.full_name, e.username, e.email, e.role_id, e.active, e.created_at, r.hierarchy_level, d.name AS department_name
    FROM employees e
    JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON e.department_id = d.id
  `;
  const params = [];

  if (departmentId) {
    query += " WHERE e.department_id = ?";
    params.push(departmentId);
  }

  const [rows] = await db.query(query, params);
  return rows;
};

export const getEmployeeByIdDB = async (id) => {
  const [rows] = await db.query(`
    SELECT e.id, e.full_name, e.username, e.email, e.role_id, e.active, e.created_at, r.hierarchy_level, d.name AS department_name
    FROM employees e
    JOIN roles r ON e.role_id = r.id
    LEFT JOIN departments d ON e.department_id = d.id
    WHERE e.id = ?
  `, [id]);
  return rows[0];
};

export const updateEmployeeDB = async (id, { full_name, username, email, password, role_id, department_id, active }) => {
  let query = "UPDATE employees SET full_name = ?, username = ?, email = ?, role_id = ?, active = ?, department_id = ?";
  const params = [full_name, username, email, role_id, active, department_id];

  if (password) {
    query += ", password = ?";
    params.push(password);
  }
  query += " WHERE id = ?";
  params.push(id);

  const [result] = await db.query(query, params);
  return result.affectedRows;
};