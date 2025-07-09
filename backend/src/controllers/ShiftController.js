import {
  createShift,
  getAllShifts,
  getShiftById,
  updateShift,
  deleteShift
} from "../models/Shift.js";

export const addShift = async (req, res) => {
  try {
    const { employee_id, start_time, end_time, shift_type, notes } = req.body;
    const shiftId = await createShift({ employee_id, start_time, end_time, shift_type, notes });
    res.status(201).json({ message: "Shift created", shiftId });
  } catch (err) {
    console.error("❌ Error creating shift:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listShifts = async (req, res) => {
  try {
    const shifts = await getAllShifts();

    if (!Array.isArray(shifts)) {
      return res.json([]);  // Evita que frontend falle si no es array
    }

    res.json(shifts);
  } catch (err) {
    console.error("❌ Error listing shifts:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getShift = async (req, res) => {
  const { id } = req.params;
  try {
    const shift = await getShiftById(id);
    if (!shift) {
      return res.status(404).json({ message: "Shift not found" });
    }
    res.json(shift);
  } catch (err) {
    console.error("❌ Error fetching shift:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateShiftById = async (req, res) => {
  const { id } = req.params;
  const { employee_id, start_time, end_time, shift_type, notes } = req.body;
  try {
    const updatedRows = await updateShift(id, { employee_id, start_time, end_time, shift_type, notes });
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Shift not found" });
    }
    res.json({ message: "Shift updated" });
  } catch (err) {
    console.error("❌ Error updating shift:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteShiftById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await deleteShift(id);
    if (deletedRows === 0) {
      return res.status(404).json({ message: "Shift not found" });
    }
    res.json({ message: "Shift deleted" });
  } catch (err) {
    console.error("❌ Error deleting shift:", err);
    res.status(500).json({ message: "Server error" });
  }
};