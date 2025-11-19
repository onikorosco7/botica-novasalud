import pool from "../config/db.js";

// Reporte: Ventas totales del sistema
export const getTotalSales = async () => {
  const [rows] = await pool.query(
    "SELECT COUNT(*) AS total_ventas, IFNULL(SUM(total), 0) AS total_ingresos FROM ventas"
  );
  return rows[0];
};

// Reporte: Ventas por fecha específica
export const getSalesByDate = async (fecha) => {
  const [rows] = await pool.query(
    "SELECT * FROM ventas WHERE DATE(fecha) = ? ORDER BY fecha DESC",
    [fecha]
  );
  return rows;
};

// Reporte: Productos más vendidos
export const getTopProducts = async () => {
  const [rows] = await pool.query(`
    SELECT 
      p.nombre,
      SUM(d.cantidad) AS total_vendido
    FROM detalle_ventas d
    INNER JOIN productos p ON p.id = d.producto_id
    GROUP BY p.id, p.nombre
    ORDER BY total_vendido DESC
    LIMIT 10;
  `);
  return rows;
};

// Reporte: Inventario general
export const getInventoryReport = async () => {
  const [rows] = await pool.query(
    "SELECT id, nombre, laboratorio, precio, stock, stock_minimo FROM productos ORDER BY nombre ASC"
  );
  return rows;
};
