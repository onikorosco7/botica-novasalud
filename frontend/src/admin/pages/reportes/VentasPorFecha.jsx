import { useState, useMemo } from "react";
import { getVentasPorFecha } from "../../../services/reportService";
import AdminLayout from "../../../layout/Admin/AdminLayout";
import LoaderOverlay from "../../../components/ui/LoaderOverlay";
import { toast } from "react-toastify";
// Importamos íconos
import {
  Calendar,
  Search,
  BarChart3,
  Clock,
  DollarSign,
  ArrowRight,
} from "lucide-react";

export default function VentasPorFecha() {
  const [fecha, setFecha] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Calcular el total de la búsqueda (Mejora UX: resumen de resultados)
  const totalDia = useMemo(() => {
    return data.reduce((acc, v) => acc + Number(v.total), 0);
  }, [data]);

  // formato de moneda
  const formatMoney = (n) =>
    Number(n).toLocaleString("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
    });

  // formato de fecha y hora
  const formatDateTime = (d) =>
    new Date(d).toLocaleString("es-PE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  const buscar = async () => {
    if (!fecha) {
      toast.warning("Seleccione una fecha para iniciar la búsqueda.");
      return;
    }

    setLoading(true);
    setSearched(true);
    setData([]); // Limpiar resultados anteriores

    try {
      const res = await getVentasPorFecha(fecha);
      setData(res.data.data);
      // Feedback de éxito
      if (res.data.data.length > 0) {
        toast.success(
          `Se encontraron ${res.data.data.length} ventas para la fecha.`
        );
      } else {
        toast.info("No se registraron ventas en la fecha seleccionada.");
      }
    } catch (error) {
      toast.error("Error al obtener ventas. Asegúrate que la fecha es válida.");
    } finally {
      setLoading(false);
    }
  };

  // Skeleton row para tabla (Mejorado)
  const SkeletonRow = () => (
    <tr className="border-b border-gray-100">
      {[50, 80, 150, 100].map((width, i) => (
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
      {loading && <LoaderOverlay text="Buscando ventas..." />}

      <AdminLayout>
        {/* Encabezado */}
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 flex items-center border-b pb-4">
          <BarChart3 className="w-7 h-7 mr-3 text-blue-600" />
          Reporte de Ventas por Día
        </h1>

        {/* Bloque de Búsqueda */}
        <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold mr-4 text-gray-700 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Selecciona la Fecha:
          </h2>

          {/* Entrada de fecha */}
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            disabled={loading}
          />

          {/* Botón de Búsqueda */}
          <button
            onClick={buscar}
            disabled={loading || !fecha}
            className={`ml-4 px-6 py-3 rounded-xl text-white font-bold transition shadow-md flex items-center ${
              loading || !fecha
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <Search className="w-5 h-5 mr-2" />
            {loading ? "Buscando..." : "Buscar Ventas"}
          </button>
        </div>

        {/* Resumen de Resultados y Totales */}
        {searched && !loading && (
          <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200 flex justify-between items-center shadow-inner">
            <p className="text-gray-700 font-semibold text-lg">
              Ventas encontradas ({data.length}):
            </p>
            <div className="flex items-center">
              <h3 className="text-2xl font-extrabold text-green-700">
                Total de Ingresos: {formatMoney(totalDia)}
              </h3>
            </div>
          </div>
        )}

        {/* Contenedor de la Tabla */}
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
                  Total Venta
                </th>
                <th scope="col" className="px-6 py-3">
                  Comprobante
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Skeleton */}
              {loading && [...Array(8)].map((_, i) => <SkeletonRow key={i} />)}

              {/* Si ya buscó y no hay resultados */}
              {searched && !loading && data.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    <Calendar className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    No se encontraron ventas registradas para la fecha
                    seleccionada.
                  </td>
                </tr>
              )}

              {/* Resultados */}
              {!loading &&
                data.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b hover:bg-blue-50/50 transition duration-150"
                  >
                    <td className="px-6 py-3 font-semibold text-blue-600">
                      {v.id}
                    </td>

                    <td className="px-6 py-3">{v.usuario_id}</td>

                    <td className="px-6 py-3 font-medium text-gray-800 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      {formatDateTime(v.fecha)}
                    </td>

                    <td className="px-6 py-3 font-extrabold text-lg text-green-700">
                      {formatMoney(v.total)}
                    </td>

                    {/* Enlace a Comprobante */}
                    <td className="px-6 py-3">
                      <a
                        href={`/ventas/comprobante/${v.id}`} // URL de ejemplo
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-500 hover:text-blue-700 hover:underline transition"
                        title={`Ver comprobante #${v.id}`}
                      >
                        <ArrowRight className="w-4 h-4 mr-1" />
                        Detalle
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
