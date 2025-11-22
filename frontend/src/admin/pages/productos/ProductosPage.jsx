import { useEffect, useState } from "react";
import {
  getProductos,
  eliminarProducto,
} from "../../services/productService";
import AdminLayout from "../../layout/Admin/AdminLayout";
import { toast } from "react-toastify";
import LoaderOverlay from "../../components/ui/LoaderOverlay";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Skeleton loader
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-10"></div>
      </td>
      <td className="p-3">
        <div className="h-8 bg-gray-300 rounded w-32"></div>
      </td>
    </tr>
  );

  // Cargar productos
  const cargarProductos = async () => {
    try {
      const res = await getProductos();
      setProductos(res.data);
      setFiltered(res.data);
    } catch (error) {
      toast.error("Error al cargar productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Filtro instantáneo
  useEffect(() => {
    const filteredList = productos.filter((p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredList);
  }, [search, productos]);

  // Eliminar producto
  const eliminar = async (id) => {
    setDeletingId(id);

    try {
      await eliminarProducto(id);
      toast.success("Producto eliminado.");
      setProductos(productos.filter((p) => p.id !== id));
    } catch (error) {
      toast.error("Error al eliminar producto.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      {loading && <LoaderOverlay text="Cargando productos..." />}
      <AdminLayout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestión de Productos</h1>

          <a
            href="/productos/crear"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            + Nuevo Producto
          </a>
        </div>

        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 p-2 border rounded mb-4 shadow-sm"
        />

        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Laboratorio</th>
              <th className="p-3 text-left">Precio</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {/* Skeletons */}
            {loading &&
              [...Array(5)].map((_, i) => <SkeletonRow key={i} />)}

            {/* Sin resultados */}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="p-5 text-center text-gray-500">
                  No se encontraron productos.
                </td>
              </tr>
            )}

            {/* Datos reales */}
            {!loading &&
              filtered.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{p.nombre}</td>
                  <td className="p-3">{p.laboratorio}</td>
                  <td className="p-3">S/. {p.precio}</td>
                  <td className="p-3">{p.stock}</td>

                  <td className="p-3 flex gap-2">
                    <a
                      href={`/productos/editar/${p.id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Editar
                    </a>

                    <button
                      onClick={() => eliminar(p.id)}
                      disabled={deletingId === p.id}
                      className={`px-3 py-1 rounded text-white transition ${
                        deletingId === p.id
                          ? "bg-red-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {deletingId === p.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </AdminLayout>
    </>
  );
}
