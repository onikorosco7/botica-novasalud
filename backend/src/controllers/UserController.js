import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByEmail, createUser, getUserById } from "../models/UserModel.js";
import dotenv from "dotenv";
import pool from "../config/db.js";

dotenv.config();


// REGISTRO DE USUARIO
export const registerUser = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Validaciones simples
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    // Validar si el usuario ya existe
    const userExists = await getUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: "Este email ya está registrado." });
    }

    // Hashear contraseña
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Crear usuario en DB
    const userId = await createUser(nombre, email, hashedPassword, rol);

    res.json({
      message: "Usuario registrado exitosamente.",
      user: {
        id: userId,
        nombre,
        email,
        rol: rol || "vendedor",
      },
    });
  } catch (error) {
    console.error("Error en registerUser:", error);
    res.status(500).json({ message: "Error en el servidor.", error: error.message });
  }
};

// LOGIN DE USUARIO
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación
    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios." });
    }

    // Buscar usuario
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado." });
    }

    // Comparar contraseñas
    const passwordCorrect = bcrypt.compareSync(password, user.password);
    if (!passwordCorrect) {
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }

    // Crear token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        rol: user.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login exitoso.",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error("Error en loginUser:", error);
    res.status(500).json({ message: "Error en el servidor.", error: error.message });
  }
};

// VALIDAR TOKEN
export const verifyToken = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Token no proporcionado." });
    }

    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUserById(decoded.id);

    res.json({
      message: "Token válido.",
      user,
    });
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado." });
  }
};

// Cambiar clave
export const cambiarPassword = async (req, res) => {
  const { id, password_actual, password_nueva } = req.body;

  try {
    const [user] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);

    if (user.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const match = await bcrypt.compare(password_actual, user[0].password);
    if (!match) {
      return res.status(400).json({ message: "Contraseña actual incorrecta" });
    }

    const hashed = await bcrypt.hash(password_nueva, 10);

    await pool.query("UPDATE usuarios SET password = ? WHERE id = ?", [
      hashed,
      id,
    ]);

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error cambiando contraseña:", error);
    res.status(500).json({ message: "Error al cambiar contraseña" });
  }
};
