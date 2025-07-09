import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

async function createManager() {
  try {
    console.log("Iniciando creación del manager...");
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    console.log("Conexión a DB exitosa");

    const password = "kokoplo1"; // Cambia por la que quieras
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hasheada");

    const sql = `
      INSERT INTO employees (full_name, username, password, email, role_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = ["Admin Manager", "adminmanager", hashedPassword, "admin@shiftwello.com", 1];

    const [result] = await connection.execute(sql, values);
    console.log("Manager creado con ID:", result.insertId);

    await connection.end();
  } catch (err) {
    console.error("Error al crear manager:", err);
  }
}

createManager();