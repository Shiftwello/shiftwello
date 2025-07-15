import express from "express";
import { listDepartments } from "../controllers/departmentController.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

// Ruta protegida para obtener todos los departamentos
router.get("/", protect, listDepartments);

export default router;