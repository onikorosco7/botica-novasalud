import express from "express";
import { registrarVenta, historialVentas } from "../controllers/SaleController.js";

import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Registrar venta (admin y vendedor)
router.post("/", authenticateToken, authorizeRole(['admin', 'vendedor']), registrarVenta);

// Historial (SOLO ADMIN)
router.get("/historial", authenticateToken, authorizeRole(['admin']), historialVentas);

export default router;
