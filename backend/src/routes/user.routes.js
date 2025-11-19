import express from "express";
import {
  registerUser,
  loginUser,
  verifyToken,
  cambiarPassword,
} from "../controllers/UserController.js";

const router = express.Router();

// Ruta para registro
router.post("/register", registerUser);

// Ruta para login
router.post("/login", loginUser);

// Ruta para validar token
router.get("/verify", verifyToken);

// Ruta para cambiar clave
router.put("/cambiar-password", cambiarPassword);

export default router;
