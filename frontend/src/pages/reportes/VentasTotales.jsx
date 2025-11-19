import { useEffect, useState } from "react";
import { getVentasTotales } from "../../services/reportService";
import AdminLayout from "../../layout/Admin/AdminLayout";
import LoaderOverlay from "../../components/ui/LoaderOverlay";
import { toast } from "react-toastify";

export default function VentasTotales() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Skeleton card
  const SkeletonCard = () => (
    <div className="bg-white p-6 shadow rounded w-72 animate-pulse">
      <div className="h-5 bg-gray-300 rounded w-40 mb-4"></div>
      <div className="h-5 bg-gray-300 rounded w-28"></div>
    </div>
  );

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await getVentasTotales();
        setData(res.data.data);
      } catch (error) {
        toast.error("Error al cargar ventas totales");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  // Formato de moneda
  const formatMoney = (n) =>
    Number(n).toLocaleString("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
    });

  return (
    <>
      <AdminLayout>
        <h1 className="text-2xl font-bold mb-6">Ventas Totales</h1>

        {/* Loading Skeleton */}
        {loading && <SkeletonCard />}

        {/* Datos reales */}
        {!loading && data && (
          <div className="bg-white p-6 shadow rounded w-80 transition-all">
            <p className="text-lg font-semibold mb-2">
              Total de ventas:
              <span className="text-blue-600 font-bold ml-2">
                {data.total_ventas}
              </span>
            </p>

            <p className="text-lg font-semibold">
              Total ingresos:
              <span className="text-green-600 font-bold ml-2">
                {formatMoney(data.total_ingresos)}
              </span>
            </p>
          </div>
        )}

        {/* Sin datos */}
        {!loading && !data && (
          <p className="text-gray-500 mt-4">No hay datos disponibles.</p>
        )}
      </AdminLayout>
    </>
  );
}
