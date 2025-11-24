import pool from "../config/db.js";

// Obtener todos los productos
export const getAllProducts = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM productos ORDER BY nombre ASC"
  );
  return rows;
};

// Obtener producto por id
export const getProductById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [id]);
  return rows[0];
};

// Buscar producto por nombre
export const searchProducts = async (term) => {
  const [rows] = await pool.query(
    "SELECT * FROM productos WHERE nombre LIKE ? ORDER BY nombre ASC",
    [`%${term}%`]
  );
  return rows;
};

// Productos destacados
export const getFeaturedProducts = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM productos ORDER BY precio DESC LIMIT 4"
  );
  return rows;
};

// Crear producto
export const createProduct = async (
  nombre,
  laboratorio,
  precio,
  stock,
  stock_minimo
) => {
  const [result] = await pool.query(
    "INSERT INTO productos (nombre, laboratorio, precio, stock, stock_minimo) VALUES (?, ?, ?, ?, ?)",
    [nombre, laboratorio, precio, stock, stock_minimo]
  );
  return result.insertId;
};

// Actualizar producto
export const updateProduct = async (
  id,
  nombre,
  laboratorio,
  precio,
  stock,
  stock_minimo
) => {
  const [result] = await pool.query(
    "UPDATE productos SET nombre=?, laboratorio=?, precio=?, stock=?, stock_minimo=? WHERE id=?",
    [nombre, laboratorio, precio, stock, stock_minimo, id]
  );
  return result.affectedRows;
};

// Eliminar producto
export const deleteProduct = async (id) => {
  const [result] = await pool.query("DELETE FROM productos WHERE id=?", [id]);
  return result.affectedRows;
};

// Obtener productos con stock bajo
export const getLowStockProducts = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM productos WHERE stock <= stock_minimo ORDER BY stock ASC"
  );
  return rows;
};
