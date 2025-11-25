import { useEffect, useState } from "react";
import { getVentasTotales } from "../../../services/reportService";
import AdminLayout from "../../../layout/Admin/AdminLayout";
import { toast } from "react-toastify";
// Importamos íconos
import { BarChart2, DollarSign, ShoppingBag, Loader2 } from "lucide-react";

export default function VentasTotales() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Componente de Tarjeta de Estadística (Mejorado)
  const StatCard = ({
    title,
    value,
    icon: Icon,
    colorClass,
    isMoney = false,
  }) => (
    <div
      className={`bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all transform hover:scale-[1.02] duration-300 w-full max-w-xs`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          {title}
        </h3>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
      <p className="text-3xl font-extrabold text-gray-900">
        {isMoney ? formatMoney(value) : value}
      </p>
    </div>
  );

  // Skeleton card (Mejorado y estandarizado)
  const SkeletonCard = () => (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xs animate-pulse border border-gray-100">
      <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-3/4"></div>
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

  // Formato de moneda (Se mantiene)
  const formatMoney = (n) =>
    Number(n).toLocaleString("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
    });

  return (
    <>
      <AdminLayout>
        {/* Encabezado */}
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800 flex items-center border-b pb-4">
          <BarChart2 className="w-7 h-7 mr-3 text-blue-600" />
          Reporte: Métricas de Ventas Totales
        </h1>

        {/* Loading / Datos / Sin Datos */}
        <div className="flex flex-wrap gap-6">
          {/* Loading Skeleton */}
          {loading && (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}

          {/* Datos reales */}
          {!loading && data && (
            <>
              <StatCard
                title="Total de Ventas Registradas"
                value={data.total_ventas || 0}
                icon={ShoppingBag}
                colorClass="text-blue-600"
                isMoney={false}
              />

              <StatCard
                title="Total de Ingresos Monetarios"
                value={data.total_ingresos || 0}
                icon={DollarSign}
                colorClass="text-green-600"
                isMoney={true}
              />
            </>
          )}

          {/* Sin datos */}
          {!loading && !data && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <p className="text-yellow-700 font-medium flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                No hay datos disponibles para el reporte de ventas totales.
              </p>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
}
