import {
  getTotalSales,
  getSalesByDate,
  getTopProducts,
  getInventoryReport,
} from "../models/ReportModel.js";
import pool from "../config/db.js";


// Reporte: Ventas totales
export const reporteVentasTotales = async (req, res) => {
  try {
    const datos = await getTotalSales();
    res.json({
      message: "Reporte de ventas totales",
      data: datos
    });
  } catch (error) {
    res.status(500).json({ message: "Error al generar reporte", error: error.message });
  }
};

// Reporte: Ventas por fecha (AAAA-MM-DD)
export const reporteVentasPorFecha = async (req, res) => {
  try {
    const { fecha } = req.params;

    const datos = await getSalesByDate(fecha);

    res.json({
      message: `Ventas del día ${fecha}`,
      data: datos
    });
  } catch (error) {
    res.status(500).json({ message: "Error al generar reporte por fecha", error: error.message });
  }
};

// Reporte: Productos más vendidos
export const reporteTopProductos = async (req, res) => {
  try {
    const datos = await getTopProducts();
    res.json({
      message: "Top productos más vendidos",
      data: datos
    });
  } catch (error) {
    res.status(500).json({ message: "Error al generar reporte de productos top", error: error.message });
  }
};

// Reporte: Inventario general
export const reporteInventario = async (req, res) => {
  try {
    const datos = await getInventoryReport();
    res.json({
      message: "Reporte general de inventario",
      data: datos
    });
  } catch (error) {
    res.status(500).json({ message: "Error al generar reporte de inventario", error: error.message });
  }
};

// Reporte: Gráfico
export const ventasPorDia = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT DATE(fecha) AS fecha, SUM(total) AS total_dia
      FROM ventas
      GROUP BY DATE(fecha)
      ORDER BY fecha ASC;
    `);

    res.json({ data: rows });
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo ventas por día" });
  }
};
