import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import saleRoutes from "./routes/sale.routes.js";
import reportRoutes from "./routes/report.routes.js";
import ventasPublicRouter from "./routes/ventasPublic.js";
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/usuarios", userRoutes);
app.use("/api/productos", productRoutes);
app.use("/api/ventas", saleRoutes);
app.use("/api/ventas", ventasPublicRouter);

app.use("/api/reportes", reportRoutes);
app.use("/uploads", express.static("public/uploads"));

// Ruta de prueba del servidor
app.get("/", (req, res) => {
  res.send("Servidor backend de Botica NovaSalud funcionando correctamente.");
});

// Test de conexión a la BD desde el servidor
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS resultado");
    res.json({
      message: "Conexión exitosa a MySQL",
      result: rows[0].resultado,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error conectando a MySQL",
      error: error.message,
    });
  }
});

// Puerto del servidor
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
