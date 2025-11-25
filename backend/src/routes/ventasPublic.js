import express from "express";
import { registrarVentaPublica } from "../controllers/VentaPublicaController.js";

const router = express.Router();

// Registro de venta pública sin login
router.post("/public", registrarVentaPublica);

export default router;
