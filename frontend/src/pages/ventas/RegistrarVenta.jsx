import { useEffect, useState } from "react";
import { getProductos } from "../../services/productService";
import { registrarVenta } from "../../services/saleService";
import AdminLayout from "../../layout/Admin/AdminLayout";
import { toast } from "react-toastify";
import LoaderOverlay from "../../components/ui/LoaderOverlay";

export default function RegistrarVenta() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cantidadModal, setCantidadModal] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Skeleton loader
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="p-3"><div className="h-4 bg-gray-300 rounded w-28"></div></td>
      <td className="p-3"><div className="h-4 bg-gray-300 rounded w-20"></div></td>
      <td className="p-3"><div className="h-4 bg-gray-300 rounded w-16"></div></td>
      <td className="p-3"><div className="h-8 bg-gray-300 rounded w-20"></div></td>
    </tr>
  );

  const cargarProductos = async () => {
    try {
      const res = await getProductos();
      setProductos(res.data);
    } catch (error) {
      toast.error("Error al cargar productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Calcular total
  useEffect(() => {
    const t = carrito.reduce((acc, item) => acc + item.subtotal, 0);
    setTotal(t);
  }, [carrito]);

  // Abrir modal de cantidad
  const abrirModalCantidad = (prod) => {
    setProductoSeleccionado(prod);
    setCantidadModal("");
  };

  // Agregar producto con validación de stock
  const confirmarCantidad = () => {
    const cantidad = Number(cantidadModal);

    if (!cantidad || cantidad <= 0) {
      toast.warning("Ingrese una cantidad válida.");
      return;
    }

    if (cantidad > productoSeleccionado.stock) {
      toast.error("Stock insuficiente.");
      return;
    }

    setCarrito((prev) => [
      ...prev,
      {
        id: productoSeleccionado.id,
        nombre: productoSeleccionado.nombre,
        precio: productoSeleccionado.precio,
        cantidad,
        subtotal: cantidad * productoSeleccionado.precio,
      },
    ]);

    setProductoSeleccionado(null);
  };

  // Eliminar item del carrito
  const eliminarItem = (index) => {
    setCarrito(carrito.filter((_, i) => i !== index));
  };

  // Registrar venta
  const guardarVenta = async () => {
    if (carrito.length === 0) {
      toast.warning("El carrito está vacío.");
      return;
    }

    const productosVenta = carrito.map((item) => ({
      producto_id: item.id,
      cantidad: item.cantidad,
    }));

    setSaving(true);

    try {
      await registrarVenta({
        usuario_id: user.id,
        productos: productosVenta,
      });

      toast.success("Venta registrada correctamente.");

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      toast.error(error.response?.data?.message || "Error al registrar venta.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {saving && <LoaderOverlay text="Registrando venta..." />}

      <AdminLayout>
        <h1 className="text-2xl font-bold mb-6">Registrar Venta</h1>

        {/* LISTA DE PRODUCTOS */}
        <h2 className="text-xl font-semibold mb-2">Productos disponibles</h2>

        <table className="w-full bg-white rounded shadow mb-6">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Precio</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              [...Array(5)].map((_, i) => <SkeletonRow key={i} />)}

            {!loading &&
              productos.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{p.nombre}</td>
                  <td className="p-3">S/. {p.precio}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3">
                    <button
                      onClick={() => abrirModalCantidad(p)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Agregar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* CARRITO */}
        <h2 className="text-xl font-semibold mb-2">Carrito</h2>

        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Producto</th>
              <th className="p-3">Cantidad</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Subtotal</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-3">{item.nombre}</td>
                <td className="p-3">{item.cantidad}</td>
                <td className="p-3">S/. {item.precio}</td>
                <td className="p-3 font-bold">S/. {item.subtotal}</td>
                <td className="p-3">
                  <button
                    onClick={() => eliminarItem(index)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTAL */}
        <div className="mt-6 flex justify-between items-center bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold">Total: S/. {total.toFixed(2)}</h2>

          <button
            onClick={guardarVenta}
            disabled={saving}
            className={`px-6 py-3 rounded text-white font-semibold transition ${
              saving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {saving ? "Procesando..." : "Registrar Venta"}
          </button>
        </div>
      </AdminLayout>

      {/* MODAL DE CANTIDAD */}
      {productoSeleccionado && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-3">
              Cantidad para {productoSeleccionado.nombre}
            </h2>

            <input
              type="number"
              min="1"
              placeholder="Cantidad"
              value={cantidadModal}
              onChange={(e) => setCantidadModal(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setProductoSeleccionado(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancelar
              </button>

              <button
                onClick={confirmarCantidad}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
