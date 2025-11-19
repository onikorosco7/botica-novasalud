import express from "express";
import {
  reporteVentasTotales,
  reporteVentasPorFecha,
  reporteTopProductos,
  reporteInventario,
  ventasPorDia,
} from "../controllers/ReportController.js";

import {
  authenticateToken,
  authorizeRole,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// SOLO ADMIN puede ver reportes
router.get(
  "/ventas/totales",
  authenticateToken,
  authorizeRole(["admin"]),
  reporteVentasTotales
);
router.get(
  "/ventas/fecha/:fecha",
  authenticateToken,
  authorizeRole(["admin"]),
  reporteVentasPorFecha
);
router.get(
  "/productos/top",
  authenticateToken,
  authorizeRole(["admin"]),
  reporteTopProductos
);
router.get(
  "/inventario",
  authenticateToken,
  authorizeRole(["admin"]),
  reporteInventario
);
router.get(
  "/ventas/por-dia",
  authenticateToken,
  authorizeRole(["admin"]),
  ventasPorDia
);

export default router;
