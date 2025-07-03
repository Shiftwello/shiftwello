import express from "express";
import { addEmployee, listEmployees } from "../controllers/EmployeeController.js";
import { protect } from "../middleware/protect.js";
import { checkRole } from "../middleware/checkRole.js";

const router = express.Router();

router.post("/", protect, checkRole([1,2]), addEmployee); // solo managers o supervisors
router.get("/", protect, listEmployees); // todos pueden ver

export default router;