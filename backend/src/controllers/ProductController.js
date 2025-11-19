import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts
} from "../models/ProductModel.js";

// Obtener todos los productos
export const listarProductos = async (req, res) => {
  try {
    const productos = await getAllProducts();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error: error.message });
  }
};

// Obtener un producto por ID
export const obtenerProducto = async (req, res) => {
  try {
    const producto = await getProductById(req.params.id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto", error: error.message });
  }
};

// Crear producto
export const crearProducto = async (req, res) => {
  try {
    const { nombre, laboratorio, precio, stock, stock_minimo } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({ message: "Nombre y precio son obligatorios." });
    }

    const id = await createProduct(nombre, laboratorio, precio, stock, stock_minimo);

    res.json({
      message: "Producto creado exitosamente",
      producto: { id, nombre, laboratorio, precio, stock, stock_minimo },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error: error.message });
  }
};

// Actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
    const { nombre, laboratorio, precio, stock, stock_minimo } = req.body;
    const id = req.params.id;

    const existe = await getProductById(id);
    if (!existe) return res.status(404).json({ message: "Producto no encontrado" });

    await updateProduct(id, nombre, laboratorio, precio, stock, stock_minimo);

    res.json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error: error.message });
  }
};

// Eliminar producto
export const eliminarProducto = async (req, res) => {
  try {
    const id = req.params.id;

    const eliminado = await deleteProduct(id);
    if (eliminado === 0) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error: error.message });
  }
};

// Productos con stock mínimo
export const productosStockBajo = async (req, res) => {
  try {
    const productos = await getLowStockProducts();
    res.json({
      message: "Productos con stock bajo",
      productos
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener productos con bajo stock",
      error: error.message
    });
  }
};
