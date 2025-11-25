import { useEffect, useState, useMemo } from "react";
import {
  getProductos,
  eliminarProducto,
} from "../../../services/productService";
import AdminLayout from "../../../layout/Admin/AdminLayout";
import { toast } from "react-toastify";
import LoaderOverlay from "../../../components/ui/LoaderOverlay";
// Importamos íconos para mejorar la interfaz del dashboard
import { Search, Plus, Edit, Trash2, Package, Loader2 } from "lucide-react";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Cargar productos
  const cargarProductos = async () => {
    setLoading(true);
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

  // Filtro instantáneo optimizado con useMemo
  const filtered = useMemo(() => {
    if (!search) return productos;

    const lowerSearch = search.toLowerCase();
    return productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(lowerSearch) ||
        p.laboratorio.toLowerCase().includes(lowerSearch)
    );
  }, [search, productos]);

  // Función para determinar el estilo del stock (Feedback visual UX)
  const getStockStyle = (stock) => {
    if (stock > 20) return "bg-green-100 text-green-800";
    if (stock > 5) return "bg-yellow-100 text-yellow-800";
    if (stock > 0) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  // Eliminar producto
  const eliminar = async (id) => {
    // Confirmación visual (Mejora de UX para acciones destructivas)
    if (
      !window.confirm(
        "¿Estás seguro de que quieres eliminar este producto? Esta acción es irreversible."
      )
    ) {
      return;
    }

    setDeletingId(id);

    try {
      await eliminarProducto(id);
      toast.success("Producto eliminado exitosamente.");
      // Actualizar el estado para reflejar el cambio en la UI
      setProductos(productos.filter((p) => p.id !== id));
    } catch (error) {
      toast.error(
        "Error al eliminar producto. Puede estar asociado a otras ventas."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Skeleton loader (Mejorado visualmente)
  const SkeletonRow = () => (
    <tr className="border-b border-gray-100">
      {/* Skeletons para cada columna */}
      {[50, 180, 100, 70, 40, 100].map((width, i) => (
        <td key={i} className="p-4">
          <div
            className="h-4 bg-gray-200 rounded-lg animate-pulse"
            style={{ width: `${width}px` }}
          ></div>
        </td>
      ))}
    </tr>
  );

  return (
    <>
      {loading && <LoaderOverlay text="Cargando productos..." />}
      <AdminLayout>
        {/* Encabezado y CTA */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center">
            <Package className="w-7 h-7 mr-3 text-blue-600" />
            Gestión de Productos
          </h1>

          <a
            href="/productos/crear"
            className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Producto
          </a>
        </div>

        {/* Controles de búsqueda y filtros */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o laboratorio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-80 p-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Contador de resultados */}
          <span className="text-sm text-gray-500">
            {filtered.length} productos mostrados
          </span>
        </div>

        {/* Tabla de Productos */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-xl border border-gray-100">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Imagen
                </th>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Laboratorio
                </th>
                <th scope="col" className="px-6 py-3">
                  Precio (S/.)
                </th>
                <th scope="col" className="px-6 py-3">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Skeletons */}
              {loading && [...Array(8)].map((_, i) => <SkeletonRow key={i} />)}

              {/* Sin resultados */}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="p-8 text-center text-gray-500 bg-white"
                  >
                    <Search className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    No se encontraron productos que coincidan con la búsqueda.
                  </td>
                </tr>
              )}

              {/* Datos reales */}
              {!loading &&
                filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="bg-white border-b hover:bg-blue-50/50 transition duration-150"
                  >
                    {/* IMAGEN */}
                    <td className="px-6 py-3">
                      {p.imagen ? (
                        <img
                          src={`http://localhost:4000/uploads/${p.imagen}`}
                          alt={p.nombre}
                          className="w-12 h-12 object-cover rounded-md shadow-sm border border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                          <Package className="w-5 h-5" />
                        </div>
                      )}
                    </td>

                    {/* NOMBRE */}
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {p.nombre}
                    </td>

                    {/* LABORATORIO */}
                    <td className="px-6 py-3 text-gray-700">{p.laboratorio}</td>

                    {/* PRECIO */}
                    <td className="px-6 py-3 font-semibold text-blue-700">
                      {Number(p.precio).toFixed(2)}
                    </td>

                    {/* STOCK (Con feedback visual) */}
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full inline-flex items-center ${getStockStyle(
                          p.stock
                        )}`}
                      >
                        {p.stock === 0 ? "AGOTADO" : `${p.stock} Uds.`}
                      </span>
                    </td>

                    {/* ACCIONES (Botones con Íconos) */}
                    <td className="px-6 py-3 flex gap-2 items-center">
                      <a
                        href={`/productos/editar/${p.id}`}
                        title="Editar producto"
                        className="p-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition"
                      >
                        <Edit className="w-5 h-5" />
                      </a>

                      <button
                        onClick={() => eliminar(p.id)}
                        title="Eliminar producto"
                        disabled={deletingId === p.id}
                        className={`p-2 rounded-full text-white transition flex items-center justify-center ${
                          deletingId === p.id
                            ? "bg-red-400 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        {deletingId === p.id ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Trash2 className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
}
