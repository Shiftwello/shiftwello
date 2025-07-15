import db from "../config/db.js";

export const createShift = async ({ employee_id, start_time, end_time, shift_type, notes }) => {
  const [result] = await db.query(
    "INSERT INTO shifts (employee_id, start_time, end_time, shift_type, notes) VALUES (?, ?, ?, ?, ?)",
    [employee_id, start_time, end_time, shift_type, notes]
  );
  return result.insertId;
};

export const getAllShifts = async () => {
  const [rows] = await db.query("SELECT * FROM shifts ORDER BY start_time ASC");
  return rows;
};

export const getShiftsByEmployeeId = async (employeeId) => {
  const [rows] = await db.query(
    "SELECT * FROM shifts WHERE employee_id = ? ORDER BY start_time ASC",
    [employeeId]
  );
  return rows;
};

// Nueva función para obtener turnos según departamento
export const getShiftsByDepartmentId = async (departmentId) => {
  const [rows] = await db.query(`
    SELECT s.*, e.full_name, e.role_id, e.department_id
    FROM shifts s
    JOIN employees e ON s.employee_id = e.id
    WHERE e.department_id = ?
    ORDER BY s.start_time ASC
  `, [departmentId]);
  return rows;
};

export const getShiftById = async (id) => {
  const [rows] = await db.query("SELECT * FROM shifts WHERE id = ?", [id]);
  return rows[0];
};

export const updateShift = async (id, { employee_id, start_time, end_time, shift_type, notes }) => {
  const [result] = await db.query(
    "UPDATE shifts SET employee_id = ?, start_time = ?, end_time = ?, shift_type = ?, notes = ? WHERE id = ?",
    [employee_id, start_time, end_time, shift_type, notes, id]
  );
  return result.affectedRows;
};

export const deleteShift = async (id) => {
  const [result] = await db.query("DELETE FROM shifts WHERE id = ?", [id]);
  return result.affectedRows;
};