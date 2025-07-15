import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import shiftRoutes from "./routes/shiftRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js"; // <-- Importa rutas departamentos

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
  // credentials: true, // si usas cookies o autenticación con credenciales
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  console.log("👉 GET / recibido");
  res.send("Shiftwello API running 🚀");
});

app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/shifts", shiftRoutes);
app.use("/api/departments", departmentRoutes); // <-- Monta rutas departamentos

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});