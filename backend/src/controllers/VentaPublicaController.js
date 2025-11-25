import pool from "../config/db.js";

export const registrarVentaPublica = async (req, res) => {
  const { cliente, carrito } = req.body;

  if (!cliente || !carrito || carrito.length === 0) {
    return res.status(400).json({ message: "Datos incompletos." });
  }

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    // Registrar venta
    const [venta] = await connection.query(
      "INSERT INTO ventas (cliente_nombre, cliente_telefono, cliente_direccion, total) VALUES (?, ?, ?, ?)",
      [
        cliente.nombre,
        cliente.telefono,
        cliente.direccion,
        carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0),
      ]
    );

    const ventaId = venta.insertId;

    // Registrar detalle + descontar stock
    for (const item of carrito) {
      await connection.query(
        "INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)",
        [
          ventaId,
          item.id,
          item.cantidad,
          item.precio,
          item.precio * item.cantidad,
        ]
      );

      // Reducir stock
      await connection.query(
        "UPDATE productos SET stock = stock - ? WHERE id = ?",
        [item.cantidad, item.id]
      );
    }

    await connection.commit();
    connection.release();

    return res.json({
      message: "Venta registrada correctamente",
      ventaId,
    });
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error("ERROR VENTA PUBLICA:", error);
    return res.status(500).json({
      message: "Error al registrar venta",
      error: error.message,
    });
  }
};
