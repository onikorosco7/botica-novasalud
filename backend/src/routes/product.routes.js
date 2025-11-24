import express from "express";
import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  productosStockBajo,
  productosDestacados,
  buscarProductos,
} from "../controllers/ProductController.js";

import {
  authenticateToken,
  authorizeRole,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// RUTAS PÚBLICAS
router.get("/public", listarProductos);
router.get("/public/:id", obtenerProducto);
router.get("/public/search", buscarProductos);
router.get("/public/destacados", productosDestacados);
// RUTAS PRIVADAS
router.get("/", authenticateToken, listarProductos);
router.get("/:id", authenticateToken, obtenerProducto);
router.get("/alertas/stock-bajo", authenticateToken, productosStockBajo);

// Solo admin
router.post("/", authenticateToken, authorizeRole(["admin"]), crearProducto);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  actualizarProducto
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  eliminarProducto
);

export default router;
