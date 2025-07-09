import express from "express";
import { addEmployee, listEmployees, getEmployeeById, updateEmployee } from "../controllers/EmployeeController.js";
import { protect } from "../middleware/protect.js";
import { checkRole } from "../middleware/checkRole.js";

const router = express.Router();

// Crear empleado: solo managers (1) y supervisores (2)
router.post("/", protect, checkRole([1, 2]), addEmployee);

// Listar empleados: cualquier usuario autenticado
router.get("/", protect, listEmployees);

// Ver empleado por id: cualquier usuario autenticado
router.get("/:id", protect, getEmployeeById);

// Actualizar empleado: solo managers y supervisores
router.put("/:id", protect, checkRole([1, 2]), updateEmployee);

export default router;