import pool from "./db.js";

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("Conexión exitosa a MySQL:", rows[0].result);
  } catch (error) {
    console.error("Error conectando a MySQL:", error.message);
  }
}

testConnection();
