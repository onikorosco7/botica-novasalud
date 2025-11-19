import { createSale, addSaleDetail, getSalesHistory } from "../models/SaleModel.js";
import { getProductById } from "../models/ProductModel.js";
import pool from "../config/db.js";

// Registrar una venta completa
export const registrarVenta = async (req, res) => {
  const { usuario_id, productos } = req.body;

  try {
    if (!usuario_id || !productos || productos.length === 0) {
      return res.status(400).json({ message: "Datos incompletos para la venta." });
    }

    let total = 0;

    // Verificar stock y calcular total
    for (const item of productos) {
      const producto = await getProductById(item.producto_id);

      if (!producto) {
        return res.status(404).json({ message: `Producto con ID ${item.producto_id} no existe.` });
      }

      if (producto.stock < item.cantidad) {
        return res.status(400).json({
          message: `Stock insuficiente para ${producto.nombre}. Stock disponible: ${producto.stock}`,
        });
      }

      total += item.cantidad * producto.precio;
    }

    // Crear la venta
    const venta_id = await createSale(usuario_id, total);

    // Insertar detalles y actualizar stock
    for (const item of productos) {
      const producto = await getProductById(item.producto_id);
      const subtotal = producto.precio * item.cantidad;

      await addSaleDetail(venta_id, item.producto_id, item.cantidad, producto.precio, subtotal);

      // Actualizar stock
      await pool.query(
        "UPDATE productos SET stock = stock - ? WHERE id = ?",
        [item.cantidad, item.producto_id]
      );
    }

    res.json({
      message: "Venta registrada correctamente.",
      venta_id,
      total,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al registrar venta.",
      error: error.message,
    });
  }
};

// Obtener historial de ventas
export const historialVentas = async (req, res) => {
  try {
    const ventas = await getSalesHistory();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener historial.",
      error: error.message,
    });
  }
};
