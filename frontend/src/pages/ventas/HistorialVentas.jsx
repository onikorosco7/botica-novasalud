import { useEffect, useState } from "react";
import { obtenerHistorialVentas } from "../../services/saleService";
import AdminLayout from "../../layout/Admin/AdminLayout";
import LoaderOverlay from "../../components/ui/LoaderOverlay";
import { toast } from "react-toastify";

export default function HistorialVentas() {
  const [ventas, setVentas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [loading, setLoading] = useState(true);

  // Loader skeleton
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="p-3"><div className="h-4 bg-gray-300 rounded w-20"></div></td>
      <td className="p-3"><div className="h-4 bg-gray-300 rounded w-24"></div></td>
      <td className="p-3"><div className="h-4 bg-gray-300 rounded w-32"></div></td>
      <td className="p-3"><div className="h-4 bg-gray-300 rounded w-16"></div></td>
    </tr>
  );

  // Cargar historial de ventas
  const cargarHistorial = async () => {
    try {
      const res = await obtenerHistorialVentas();
      setVentas(res.data);
      setFiltered(res.data);
    } catch (error) {
      toast.error("Error al cargar el historial de ventas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarHistorial();
  }, []);

  // Filtrar por buscador y fecha
  useEffect(() => {
    let data = ventas;

    // Buscador por ID o usuario
    if (search.trim() !== "") {
      data = data.filter(
        (v) =>
          v.id.toString().includes(search) ||
          v.usuario_id.toString().includes(search)
      );
    }

    // Filtro por fecha exacta
    if (fechaFiltro !== "") {
      data = data.filter((v) => v.fecha.startsWith(fechaFiltro));
    }

    setFiltered(data);
  }, [search, fechaFiltro, ventas]);

  return (
    <>
      {loading && <LoaderOverlay text="Cargando historial de ventas..." />}

      <AdminLayout>
        <h1 className="text-2xl font-bold mb-6">Historial de Ventas</h1>

        {/* Filtros */}
        <div className="flex gap-4 mb-5">
          <input
            type="text"
            placeholder="Buscar por ID o Usuario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded shadow-sm w-64"
          />

          <input
            type="date"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
            className="p-2 border rounded shadow-sm"
          />
        </div>

        {/* Tabla */}
        <table className="w-full bg-white shadow rounded overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">ID Venta</th>
              <th className="p-3 text-left">Usuario</th>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Total</th>
            </tr>
          </thead>

          <tbody>
            {/* Skeleton */}
            {loading &&
              [...Array(5)].map((_, i) => <SkeletonRow key={i} />)}

            {/* Sin resultados */}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No se encontraron ventas.
                </td>
              </tr>
            )}

            {/* Datos reales */}
            {!loading &&
              filtered.map((v) => (
                <tr key={v.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 font-medium">{v.id}</td>
                  <td className="p-3">{v.usuario_id}</td>
                  <td className="p-3">
                    {new Date(v.fecha).toLocaleString("es-PE")}
                  </td>
                  
                  <td
                    className={`p-3 font-bold ${
                      Number(v.total) > 100
                        ? "text-green-700"
                        : "text-green-500"
                    }`}
                  >
                    S/. {Number(v.total).toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </AdminLayout>
    </>
  );
}
