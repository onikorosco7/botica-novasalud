import { useEffect, useState, useMemo } from "react";
import { getProductos } from "../../../services/productService";
import { registrarVenta } from "../../../services/saleService";
import AdminLayout from "../../../layout/Admin/AdminLayout";
import { toast } from "react-toastify";
import LoaderOverlay from "../../../components/ui/LoaderOverlay";
// Importamos íconos para mejorar la interfaz del TPV
import {
  ShoppingCart,
  Package,
  DollarSign,
  Plus,
  X,
  Trash2,
  CheckCircle,
  Search,
  Clock,
} from "lucide-react";

export default function RegistrarVenta() {
  const user = JSON.parse(localStorage.getItem("user"));
  const IMG_BASE_URL = "http://localhost:4000/uploads/";

  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cantidadModal, setCantidadModal] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  // Nuevo estado para la búsqueda de productos
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Calcular total y subtotal automáticamente (Mejora: usando useMemo)
  const total = useMemo(() => {
    return carrito.reduce((acc, item) => acc + item.subtotal, 0);
  }, [carrito]);

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

  // Filtro de productos disponibles (Mejora: filtrado en la lista)
  const filteredProductos = useMemo(() => {
    if (!search) return productos;
    const lowerSearch = search.toLowerCase();
    return productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(lowerSearch) ||
        p.laboratorio.toLowerCase().includes(lowerSearch) // Permitir buscar por laboratorio también
    );
  }, [productos, search]);

  // Abrir modal de cantidad (Mejora: limpia la cantidad al abrir)
  const abrirModalCantidad = (prod) => {
    // Verificar si el producto ya está en el carrito para sumarlo o modificarlo (UX mejorada)
    const itemExistente = carrito.find((item) => item.id === prod.id);

    setProductoSeleccionado(prod);
    setCantidadModal(itemExistente ? String(itemExistente.cantidad) : ""); // Carga la cantidad existente si aplica
  };

  // Agregar producto con validación de stock
  const confirmarCantidad = () => {
    const cantidad = Number(cantidadModal);
    const prod = productoSeleccionado;

    if (!cantidad || cantidad <= 0 || !Number.isInteger(cantidad)) {
      toast.warning("Ingrese una cantidad entera válida (mín. 1).");
      return;
    }

    // Verificar si ya existe en el carrito
    const itemExistenteIndex = carrito.findIndex((item) => item.id === prod.id);

    // Calcular la cantidad TOTAL que el cliente tendrá después de esta acción (si es edición, el stock ya está reservado)
    let nuevaCantidadTotal = cantidad;
    if (itemExistenteIndex !== -1) {
      // Si ya existe, el stock disponible es el stock actual del producto (sin descontar nada, ya que lo estamos sumando)
      // PERO la validación original solo compara stock vs cantidad. Mantendremos esa lógica.
    }

    if (cantidad > prod.stock) {
      toast.error(`Stock insuficiente. Solo quedan ${prod.stock} unidades.`);
      return;
    }

    const nuevoItem = {
      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precio,
      cantidad,
      subtotal: cantidad * prod.precio,
      laboratorio: prod.laboratorio || "N/A", // Incluir laboratorio
    };

    setCarrito((prev) => {
      if (itemExistenteIndex !== -1) {
        // Reemplazar o actualizar el ítem
        const newCarrito = [...prev];
        newCarrito[itemExistenteIndex] = nuevoItem;
        return newCarrito;
      } else {
        // Añadir nuevo ítem
        return [...prev, nuevoItem];
      }
    });

    toast.success(
      `${cantidad} x ${prod.nombre} ${
        itemExistenteIndex !== -1 ? "actualizado" : "agregado"
      } al carrito.`
    );
    setProductoSeleccionado(null);
  };

  // Eliminar item del carrito (Mejora: usa el ID del producto para eliminarlo del carrito)
  const eliminarItem = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
    toast.info("Producto quitado del carrito.");
  };

  // Registrar venta
  const guardarVenta = async () => {
    if (carrito.length === 0) {
      toast.warning(
        "El carrito está vacío. Agregue productos para registrar la venta."
      );
      return;
    }

    // Pedir confirmación al cajero (Mejora UX)
    if (
      !window.confirm(
        `Confirmar venta por un total de S/. ${total.toFixed(2)}?`
      )
    ) {
      return;
    }

    const productosVenta = carrito.map((item) => ({
      producto_id: item.id,
      cantidad: item.cantidad,
    }));

    setSaving(true);

    try {
      const res = await registrarVenta({
        usuario_id: user.id,
        productos: productosVenta,
      });

      toast.success(`Venta #${res.data.ventaId} registrada correctamente.`);

      setTimeout(() => {
        // Podríamos navegar a la página de detalle de venta o generar comprobante
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error al registrar venta. Verifica el stock."
      );
    } finally {
      setSaving(false);
    }
  };

  // Componente Skeleton (reutilizado)
  const SkeletonRow = () => (
    <tr className="border-b border-gray-100">
      {[40, 150, 80, 50, 80].map((width, i) => (
        <td key={i} className="p-4">
          <div
            className="h-4 bg-gray-200 rounded-lg animate-pulse"
            style={{ width: `${width}px` }}
          ></div>
        </td>
      ))}
    </tr>
  );

  const getStockStyle = (stock) => {
    if (stock > 20) return "bg-green-100 text-green-800";
    if (stock > 5) return "bg-yellow-100 text-yellow-800";
    if (stock > 0) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <>
      {saving && <LoaderOverlay text="Registrando venta..." />}

      <AdminLayout>
        {/* Encabezado */}
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 flex items-center border-b pb-3">
          <DollarSign className="w-7 h-7 mr-3 text-green-600" />
          Punto de Venta (TPV)
        </h1>

        {/* Contenido en dos columnas: Productos y Carrito */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Columna 1: Productos Disponibles (3/5) */}
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-700 flex items-center">
              <Package className="w-5 h-5 mr-2" /> Productos Disponibles
            </h2>

            {/* Buscador */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar producto por nombre o laboratorio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Tabla de Productos (Scrollable) */}
            <div className="max-h-[600px] overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Prod.
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Nombre
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Precio
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Stock
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    [...Array(8)].map((_, i) => <SkeletonRow key={i} />)
                  ) : filteredProductos.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-5 text-center text-gray-500">
                        <Search className="w-5 h-5 mx-auto mb-1" />
                        No hay productos disponibles o coincidiendo con "
                        {search}".
                      </td>
                    </tr>
                  ) : (
                    filteredProductos.map((p) => (
                      <tr
                        key={p.id}
                        className="bg-white border-b hover:bg-blue-50/50 transition duration-150"
                      >
                        {/* IMAGEN */}
                        <td className="px-4 py-3">
                          {p.imagen ? (
                            <img
                              src={`${IMG_BASE_URL}${p.imagen}`}
                              alt={p.nombre}
                              className="w-8 h-8 object-cover rounded shadow-sm"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded text-gray-400">
                              <Package className="w-4 h-4" />
                            </div>
                          )}
                        </td>

                        {/* NOMBRE */}
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {p.nombre}
                        </td>

                        {/* PRECIO */}
                        <td className="px-4 py-3 font-semibold text-blue-700">
                          S/. {Number(p.precio).toFixed(2)}
                        </td>

                        {/* STOCK */}
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs font-bold rounded-full inline-flex items-center ${getStockStyle(
                              p.stock
                            )}`}
                          >
                            {p.stock === 0 ? "AGOTADO" : `${p.stock} Uds.`}
                          </span>
                        </td>

                        {/* ACCIONES */}
                        <td className="px-4 py-3">
                          <button
                            onClick={() => abrirModalCantidad(p)}
                            disabled={p.stock === 0}
                            className={`p-2 rounded-full text-white transition ${
                              p.stock === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                            title="Agregar al carrito"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Columna 2: Carrito y Resumen (2/5) */}
          <div className="lg:col-span-2 bg-blue-50 p-6 rounded-2xl shadow-xl border border-blue-200 sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-blue-800 flex items-center border-b pb-2">
              <ShoppingCart className="w-5 h-5 mr-2" /> Carrito de Venta
            </h2>

            {/* Tabla de Carrito */}
            <div className="max-h-[400px] overflow-y-auto mb-4">
              {carrito.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
                  <p>El carrito está vacío. Agrega productos.</p>
                </div>
              ) : (
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-gray-600 uppercase bg-blue-100 sticky top-0">
                    <tr>
                      <th scope="col" className="px-4 py-2">
                        Prod.
                      </th>
                      <th scope="col" className="px-4 py-2 text-center">
                        Cant.
                      </th>
                      <th scope="col" className="px-4 py-2 text-right">
                        Subtotal
                      </th>
                      <th scope="col" className="px-4 py-2 text-center">
                        Quitar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((item, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b border-blue-100 hover:bg-blue-50/50"
                      >
                        <td
                          className="px-4 py-3 font-medium cursor-pointer"
                          onClick={() => abrirModalCantidad(item)}
                          title="Clic para editar cantidad"
                        >
                          {item.nombre}
                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.laboratorio}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-center font-bold text-blue-700">
                          {item.cantidad}
                        </td>
                        <td className="px-4 py-3 text-right font-extrabold text-green-700">{`S/. ${item.subtotal.toFixed(
                          2
                        )}`}</td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => eliminarItem(item.id)}
                            className="p-1 rounded-full text-red-600 hover:bg-red-100 transition"
                            title="Quitar ítem"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* TOTAL Y CTA */}
            <div className="pt-4 border-t border-blue-200">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">
                  Total a Pagar:
                </h3>
                <h3 className="text-3xl font-extrabold text-green-700">{`S/. ${total.toFixed(
                  2
                )}`}</h3>
              </div>

              <button
                onClick={guardarVenta}
                disabled={saving || carrito.length === 0}
                className={`w-full py-3 rounded-xl text-lg font-bold transition shadow-xl flex items-center justify-center ${
                  saving || carrito.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {saving ? (
                  <>
                    <Clock className="w-5 h-5 mr-3 animate-spin" />
                    Procesando Venta...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-3" />
                    Registrar Venta
                  </>
                )}
              </button>

              {/* Botón de Limpiar Carrito (Secundario) */}
              {carrito.length > 0 && (
                <button
                  onClick={() => setCarrito([])}
                  className="w-full mt-2 text-sm text-red-600 hover:text-red-800 font-medium transition"
                >
                  Vaciar Carrito
                </button>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>

      {/* MODAL DE CANTIDAD (Mejorado) */}
      {productoSeleccionado && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setProductoSeleccionado(null)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm border border-gray-100 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-xl font-bold text-gray-800">
                {productoSeleccionado.nombre}
              </h2>
              <button
                onClick={() => setProductoSeleccionado(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Info de Stock */}
            <p className="text-sm text-gray-600 mb-3">
              Stock disponible:{" "}
              <span className="font-semibold text-orange-600">
                {productoSeleccionado.stock} unidades
              </span>
            </p>

            <label
              htmlFor="cantidad"
              className="font-semibold text-gray-700 block mb-1"
            >
              Cantidad a vender:
            </label>
            <input
              id="cantidad"
              type="number"
              min="1"
              step="1"
              placeholder="1"
              value={cantidadModal}
              onChange={(e) => setCantidadModal(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              autoFocus
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setProductoSeleccionado(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl font-medium hover:bg-gray-400 transition"
              >
                Cancelar
              </button>

              <button
                onClick={confirmarCantidad}
                disabled={!Number(cantidadModal) || Number(cantidadModal) <= 0}
                className={`px-4 py-2 text-white rounded-xl font-semibold transition ${
                  !Number(cantidadModal) || Number(cantidadModal) <= 0
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {carrito.some((item) => item.id === productoSeleccionado.id)
                  ? "Actualizar"
                  : "Agregar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
