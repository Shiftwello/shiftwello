import express from "express";
import {
  addEmployee,
  listEmployees,
  getEmployeeById,
  updateEmployee,
} from "../controllers/EmployeeController.js";

import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Listar empleados (opcional filtro por departamento: /api/employees?department_id=2)
router.get("/", verifyToken, listEmployees);

// Crear empleado (solo admins y managers, por ejemplo roles 1 y 2)
router.post("/", verifyToken, authorizeRoles(1, 2), addEmployee);

// Obtener empleado por ID
router.get("/:id", verifyToken, getEmployeeById);

// Actualizar empleado (solo admins y managers)
router.put("/:id", verifyToken, authorizeRoles(1, 2), updateEmployee);

export default router;