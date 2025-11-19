import express from "express";
import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  productosStockBajo
} from "../controllers/ProductController.js";

import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas públicas (solo lectura)
router.get("/", authenticateToken, listarProductos);
router.get("/:id", authenticateToken, obtenerProducto);
router.get("/alertas/stock-bajo", authenticateToken, productosStockBajo);

// Rutas solo admin
router.post("/", authenticateToken, authorizeRole(['admin']), crearProducto);
router.put("/:id", authenticateToken, authorizeRole(['admin']), actualizarProducto);
router.delete("/:id", authenticateToken, authorizeRole(['admin']), eliminarProducto);

export default router;
