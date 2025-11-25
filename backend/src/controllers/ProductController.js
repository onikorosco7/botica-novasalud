import pool from "../config/db.js";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  searchProducts,
  getFeaturedProducts,
} from "../models/ProductModel.js";

// Obtener todos los productos
export const listarProductos = async (req, res) => {
  try {
    const productos = await getAllProducts();
    res.json(productos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener productos", error: error.message });
  }
};

// Buscar producto por nombre
export const buscarProductos = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Debe enviar parámetro q" });
    }

    const productos = await searchProducts(q);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar productos" });
  }
};

// Productos destacados
export const productosDestacados = async (req, res) => {
  try {
    const productos = await getFeaturedProducts();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos destacados" });
  }
};

// Obtener un producto por ID
export const obtenerProducto = async (req, res) => {
  try {
    const producto = await getProductById(req.params.id);
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json(producto);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener producto", error: error.message });
  }
};

// Crear producto
export const crearProducto = async (req, res) => {
  try {
    const { nombre, laboratorio, precio, stock, stock_minimo } = req.body;
    const imagen = req.file ? req.file.filename : null;

    const id = await createProduct(
      nombre,
      laboratorio,
      precio,
      stock,
      stock_minimo,
      imagen
    );

    res.json({
      message: "Producto creado exitosamente",
      producto: {
        id,
        nombre,
        laboratorio,
        precio,
        stock,
        stock_minimo,
        imagen,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear producto", error: error.message });
  }
};

// Actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, laboratorio, precio, stock, stock_minimo } = req.body;

    const producto = await getProductById(id);
    if (!producto)
      return res.status(404).json({ message: "Producto no encontrado" });

    let nuevaImagen = producto.imagen;

    // Si viene un archivo, reemplaza imagen
    if (req.file) {
      nuevaImagen = req.file.filename;
    }

    // Si el frontend envió "REMOVE"
    if (req.body.imagen === "REMOVE") {
      nuevaImagen = null;
    }

    await pool.query(
      `UPDATE productos 
       SET nombre=?, laboratorio=?, precio=?, stock=?, stock_minimo=?, imagen=?
       WHERE id=?`,
      [nombre, laboratorio, precio, stock, stock_minimo, nuevaImagen, id]
    );

    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar producto",
      error: error.message,
    });
  }
};

// Eliminar producto
export const eliminarProducto = async (req, res) => {
  try {
    const id = req.params.id;

    const eliminado = await deleteProduct(id);
    if (eliminado === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar producto", error: error.message });
  }
};

// Productos con stock mínimo
export const productosStockBajo = async (req, res) => {
  try {
    const productos = await getLowStockProducts();
    res.json({
      message: "Productos con stock bajo",
      productos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener productos con bajo stock",
      error: error.message,
    });
  }
};
