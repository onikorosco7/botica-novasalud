import { useEffect, useState, useMemo } from "react";
import { obtenerHistorialVentas } from "../../../services/saleService";
import AdminLayout from "../../../layout/Admin/AdminLayout";
import LoaderOverlay from "../../../components/ui/LoaderOverlay";
import { toast } from "react-toastify";
// Importamos íconos
import {
  Clock,
  Search,
  Calendar,
  DollarSign,
  List,
  FileText,
} from "lucide-react";

export default function HistorialVentas() {
  const [ventas, setVentas] = useState([]);
  const [search, setSearch] = useState("");
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [loading, setLoading] = useState(true);

  // Formato de moneda
  const formatMoney = (n) => `S/. ${Number(n).toFixed(2)}`;

  // Formato de fecha y hora
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    // Mantenemos el formato original que incluye hora y fecha
    return new Date(dateString).toLocaleString("es-PE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Cargar historial de ventas
  const cargarHistorial = async () => {
    try {
      const res = await obtenerHistorialVentas();
      // Aseguramos que los datos tengan una estructura consistente para el filtro
      setVentas(
        res.data.map((v) => ({
          ...v,
          // Convertir el total a número para el cálculo de formato
          total: Number(v.total),
        }))
      );
    } catch (error) {
      toast.error("Error al cargar el historial de ventas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarHistorial();
  }, []);

  // Filtrar por buscador y fecha (Optimizado con useMemo)
  const filtered = useMemo(() => {
    let data = ventas;

    // Buscador por ID o usuario
    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      data = data.filter(
        (v) =>
          v.id.toString().includes(lowerSearch) ||
          (v.usuario_nombre &&
            v.usuario_nombre.toLowerCase().includes(lowerSearch)) || // Asumiendo que el campo 'usuario_nombre' existe
          v.usuario_id.toString().includes(lowerSearch)
      );
    }

    // Filtro por fecha exacta
    if (fechaFiltro !== "") {
      data = data.filter((v) => v.fecha.startsWith(fechaFiltro));
    }

    return data;
  }, [search, fechaFiltro, ventas]);

  // Loader skeleton (Mejorado visualmente)
  const SkeletonRow = () => (
    <tr className="border-b border-gray-100">
      {[50, 80, 150, 80, 40].map((width, i) => (
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
      {loading && <LoaderOverlay text="Cargando historial de ventas..." />}

      <AdminLayout>
        {/* Encabezado */}
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 flex items-center border-b pb-4">
          <List className="w-7 h-7 mr-3 text-blue-600" />
          Historial de Ventas Registradas
        </h1>

        {/* Filtros (Mejorados) */}
        <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-200">
          {/* Buscador */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar ID, Cajero o Usuario ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 w-80 transition"
            />
          </div>

          {/* Filtro de Fecha */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="date"
              value={fechaFiltro}
              onChange={(e) => setFechaFiltro(e.target.value)}
              className="p-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Contador de resultados */}
          <div className="ml-auto flex items-center text-sm text-gray-600 font-medium">
            {filtered.length} ventas encontradas
          </div>
        </div>

        {/* Tabla (Mejorada) */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-xl border border-gray-100">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID Venta
                </th>
                <th scope="col" className="px-6 py-3">
                  Cajero (ID Usuario)
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha y Hora
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Comprobante
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Skeleton */}
              {loading && [...Array(10)].map((_, i) => <SkeletonRow key={i} />)}

              {/* Sin resultados */}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-gray-500 bg-white"
                  >
                    <Search className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    No se encontraron ventas que coincidan con los filtros
                    aplicados.
                  </td>
                </tr>
              )}

              {/* Datos reales */}
              {!loading &&
                filtered.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b hover:bg-blue-50/50 transition duration-150"
                  >
                    {/* ID Venta */}
                    <td className="px-6 py-3 font-semibold text-blue-600">
                      {v.id}
                    </td>

                    {/* Usuario */}
                    <td className="px-6 py-3">
                      {v.usuario_nombre
                        ? v.usuario_nombre
                        : `ID: ${v.usuario_id}`}
                      <p className="text-xs text-gray-400">
                        {v.usuario_nombre ? `ID: ${v.usuario_id}` : ""}
                      </p>
                    </td>

                    {/* Fecha y Hora */}
                    <td className="px-6 py-3 font-medium text-gray-800 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      {formatDateTime(v.fecha)}
                    </td>

                    {/* Total */}
                    <td
                      className={`px-6 py-3 font-extrabold text-lg ${
                        v.total > 100 ? "text-green-700" : "text-green-600"
                      }`}
                    >
                      {formatMoney(v.total)}
                    </td>

                    {/* Comprobante */}
                    <td className="px-6 py-3">
                      {/* Asumimos que la URL del comprobante se puede generar aquí, o es un campo en 'v' */}
                      <a
                        href={`/ventas/comprobante/${v.id}`} // URL de ejemplo
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-500 hover:text-blue-700 hover:underline transition"
                        title={`Ver comprobante #${v.id}`}
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        Ver
                      </a>
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
