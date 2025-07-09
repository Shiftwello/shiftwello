import db from "../config/db.js";

export const createShift = async ({ employee_id, start_time, end_time, shift_type, notes }) => {
  const [result] = await db.query(
    `INSERT INTO shifts (employee_id, start_time, end_time, shift_type, notes) 
     VALUES (?, ?, ?, ?, ?)`,
    [employee_id, start_time, end_time, shift_type, notes]
  );
  return result.insertId;
};

export const getAllShifts = async () => {
  const [rows] = await db.query(
    `SELECT s.id, s.employee_id, e.full_name, s.start_time, s.end_time, s.shift_type, s.notes
     FROM shifts s
     LEFT JOIN employees e ON s.employee_id = e.id`
  );
  return rows;
};

export const getShiftById = async (id) => {
  const [rows] = await db.query("SELECT * FROM shifts WHERE id = ?", [id]);
  return rows[0];
};

export const updateShift = async (id, { employee_id, start_time, end_time, shift_type, notes }) => {
  const [result] = await db.query(
    `UPDATE shifts SET employee_id = ?, start_time = ?, end_time = ?, shift_type = ?, notes = ?
     WHERE id = ?`,
    [employee_id, start_time, end_time, shift_type, notes, id]
  );
  return result.affectedRows;
};

export const deleteShift = async (id) => {
  const [result] = await db.query("DELETE FROM shifts WHERE id = ?", [id]);
  return result.affectedRows;
};