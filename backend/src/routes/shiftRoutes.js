import express from "express";
import {
  addShift,
  listShifts,
  getShift,
  updateShiftById,
  deleteShiftById
} from "../controllers/ShiftController.js";

import { protect } from "../middleware/protect.js";
import { checkRole } from "../middleware/checkRole.js";

const router = express.Router();

// Solo usuarios autenticados pueden ver la lista y detalles
router.get("/", protect, listShifts);
router.get("/:id", protect, getShift);

// Solo managers (rol_id 1) y supervisors (rol_id 2) pueden crear, editar y eliminar turnos
router.post("/", protect, checkRole([1, 2]), addShift);
router.put("/:id", protect, checkRole([1, 2]), updateShiftById);
router.delete("/:id", protect, checkRole([1, 2]), deleteShiftById);

export default router;