import { useState } from "react";
import { getVentasPorFecha } from "../../../services/reportService";
import AdminLayout from "../../../layout/Admin/AdminLayout";
import LoaderOverlay from "../../../components/ui/LoaderOverlay";
import { toast } from "react-toastify";

export default function VentasPorFecha() {
  const [fecha, setFecha] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Skeleton row para tabla
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-40"></div>
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </td>
    </tr>
  );

  const buscar = async () => {
    if (!fecha) {
      toast.warning("Seleccione una fecha.");
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const res = await getVentasPorFecha(fecha);
      setData(res.data.data);
    } catch (error) {
      toast.error("Error al obtener ventas.");
    } finally {
      setLoading(false);
    }
  };

  // formato de moneda
  const formatMoney = (n) =>
    Number(n).toLocaleString("es-PE", {
      style: "currency",
      currency: "PEN",
    });

  // formato de fecha
  const formatDate = (d) => new Date(d).toLocaleString("es-PE");

  return (
    <>
      {loading && <LoaderOverlay text="Buscando ventas..." />}

      <AdminLayout>
        <h1 className="text-2xl font-bold mb-6">Ventas por Fecha</h1>

        {/* Entrada de fecha */}
        <div className="flex items-center mb-4 gap-3">
          <input
            type="date"
            className="border p-2 rounded shadow-sm"
            onChange={(e) => setFecha(e.target.value)}
          />

          <button
            onClick={buscar}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Buscar
          </button>
        </div>

        {/* Tabla */}
        <table className="w-full bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Usuario</th>
              <th className="p-3 text-left">Fecha</th>
              <th className="p-3 text-left">Total</th>
            </tr>
          </thead>

          <tbody>
            {/* Skeleton */}
            {loading && [...Array(4)].map((_, i) => <SkeletonRow key={i} />)}

            {/* Si ya buscó y no hay resultados */}
            {searched && !loading && data.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No hay ventas registradas en esta fecha.
                </td>
              </tr>
            )}

            {/* Resultados */}
            {!loading &&
              data.map((v) => (
                <tr key={v.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 font-medium">{v.id}</td>
                  <td className="p-3">{v.usuario_id}</td>
                  <td className="p-3">{formatDate(v.fecha)}</td>
                  <td className="p-3 font-semibold text-green-700">
                    {formatMoney(v.total)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </AdminLayout>
    </>
  );
}
