import PDFDocument from "pdfkit";
import pool from "../config/db.js";

export const generarComprobante = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener venta
    const [ventas] = await pool.query("SELECT * FROM ventas WHERE id = ?", [
      id,
    ]);

    if (ventas.length === 0) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    const venta = ventas[0];

    // Obtener detalles
    const [detalles] = await pool.query(
      `SELECT d.*, p.nombre 
       FROM detalle_ventas d
       INNER JOIN productos p ON p.id = d.producto_id
       WHERE venta_id = ?`,
      [id]
    );

    // Crear PDF
    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=comprobante_${id}.pdf`
    );

    doc.pipe(res);

    // ENCABEZADO
    doc
      .fontSize(20)
      .text("BOTICA NOVASALUD", { align: "center" })
      .moveDown(0.5);

    doc
      .fontSize(12)
      .text("Comprobante de Venta", { align: "center" })
      .moveDown(2);

    // INFORMACIÓN DEL CLIENTE
    doc.fontSize(12).text(`Cliente: ${venta.cliente_nombre}`);
    doc.text(`Teléfono: ${venta.cliente_telefono}`);
    doc.text(`Dirección: ${venta.cliente_direccion}`);
    doc.text(`Fecha: ${venta.fecha}`);
    doc.moveDown(1.5);

    // TABLA DE PRODUCTOS
    doc.fontSize(12).text("Detalle de productos:", { underline: true });
    doc.moveDown(0.8);

    detalles.forEach((item) => {
      doc.text(
        `${item.nombre} - Cant: ${item.cantidad} x S/.${item.precio_unitario} = S/.${item.subtotal}`
      );
    });

    doc.moveDown(1.5);

    // TOTAL
    doc.fontSize(14).text(`TOTAL: S/. ${venta.total}`, {
      align: "right",
      underline: true,
    });

    doc.end();
  } catch (error) {
    console.error("Error generando PDF:", error);
    res.status(500).json({ message: "Error al generar comprobante" });
  }
};
