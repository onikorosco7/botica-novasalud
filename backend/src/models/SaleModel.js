import pool from "../config/db.js";

// Crear una venta
export const createSale = async (usuario_id, total) => {
  const [result] = await pool.query(
    "INSERT INTO ventas (usuario_id, total) VALUES (?, ?)",
    [usuario_id, total]
  );
  return result.insertId;
};

// Insertar detalle de venta
export const addSaleDetail = async (venta_id, producto_id, cantidad, precio_unitario, subtotal) => {
  const [result] = await pool.query(
    "INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)",
    [venta_id, producto_id, cantidad, precio_unitario, subtotal]
  );
  return result.insertId;
};

// Obtener historial de ventas
export const getSalesHistory = async () => {
  const [rows] = await pool.query("SELECT * FROM ventas ORDER BY fecha DESC");
  return rows;
};
