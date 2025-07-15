import express from "express";
import {
  addShift,
  listShifts,
  getShift,
  updateShiftById,
  deleteShiftById
} from "../controllers/ShiftController.js";

import { protect } from "../middleware/protect.js";      // middleware que verifica token y añade req.user
import { checkRole } from "../middleware/checkRole.js";  // middleware que verifica rol

const router = express.Router();

// Rutas públicas protegidas (necesitan token)
router.get("/", protect, listShifts);    // Cualquiera autenticado puede listar (filtrado por backend)
router.get("/:id", protect, getShift);

// Solo managers y supervisores (roles 1, 2) pueden crear, modificar o eliminar turnos
router.post("/", protect, checkRole([1, 2]), addShift);
router.put("/:id", protect, checkRole([1, 2]), updateShiftById);
router.delete("/:id", protect, checkRole([1, 2]), deleteShiftById);

export default router;