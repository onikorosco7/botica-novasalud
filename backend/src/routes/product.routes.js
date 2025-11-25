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

import upload from "../config/multer.js";

import {
  authenticateToken,
  authorizeRole,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===========================
        RUTAS PÚBLICAS
   =========================== */
router.get("/public", listarProductos);
router.get("/public/search", buscarProductos);
router.get("/public/destacados", productosDestacados);
router.get("/public/:id", obtenerProducto);

/* ===========================
        RUTAS PRIVADAS
   =========================== */

// Primero rutas específicas (IMPORTANTE)
router.get("/alertas/stock-bajo", authenticateToken, productosStockBajo);

// Luego listado general
router.get("/", authenticateToken, listarProductos);

// Después obtener un producto privado
router.get("/:id", authenticateToken, obtenerProducto);

/* ===========================
        ADMIN (con imagen)
   =========================== */

// Crear producto
router.post(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  upload.single("imagen"),
  crearProducto
);

// Actualizar producto
router.put(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  upload.single("imagen"),
  actualizarProducto
);

// Eliminar producto
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  eliminarProducto
);

export default router;
