import pool from "../config/db.js";


// Obtener usuario por email
export const getUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  return rows[0];
};

// Crear usuario nuevo
export const createUser = async (nombre, email, password, rol = "vendedor") => {
  const [result] = await pool.query(
    "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
    [nombre, email, password, rol]
  );
  return result.insertId;
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  const [rows] = await pool.query("SELECT id, nombre, email, rol, creado_en FROM usuarios WHERE id = ?", [id]);
  return rows[0];
};
