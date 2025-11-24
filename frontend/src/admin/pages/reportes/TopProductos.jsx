import { useEffect, useState } from "react";
import { getTopProductos } from "../../../services/reportService";
import AdminLayout from "../../../layout/Admin/AdminLayout";
import LoaderOverlay from "../../../components/ui/LoaderOverlay";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function TopProductos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Skeleton loader fila tabla
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-40"></div>
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </td>
    </tr>
  );

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await getTopProductos();
        setData(res.data.data);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  // Generar colores aleatorios pero consistentes
  const generateColors = (count) => {
    return Array.from({ length: count }).map(
      () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 55%)`
    );
  };

  const chartData = {
    labels: data.map((p) => p.nombre),
    datasets: [
      {
        label: "Cantidad vendida",
        data: data.map((p) => p.total_vendido),
        backgroundColor: generateColors(data.length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {loading && <LoaderOverlay text="Cargando top productos..." />}

      <AdminLayout>
        <h1 className="text-2xl font-bold mb-6">Top Productos Más Vendidos</h1>

        {/* GRÁFICO */}
        {!loading && data.length > 0 && (
          <div className="bg-white p-6 rounded shadow mb-10">
            <h2 className="text-xl font-semibold mb-4">Gráfico de Ventas</h2>
            <Bar data={chartData} />
          </div>
        )}

        {/* TABLA */}
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Producto</th>
              <th className="p-3 text-left">Cantidad Vendida</th>
            </tr>
          </thead>

          <tbody>
            {/* Skeleton Loader */}
            {loading && [...Array(5)].map((_, i) => <SkeletonRow key={i} />)}

            {/* Datos */}
            {!loading &&
              data.map((p, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 font-bold text-gray-600">#{i + 1}</td>
                  <td className="p-3">{p.nombre}</td>
                  <td className="p-3 font-semibold text-blue-600">
                    {p.total_vendido}
                  </td>
                </tr>
              ))}

            {/* Sin resultados */}
            {!loading && data.length === 0 && (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No hay ventas registradas aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AdminLayout>
    </>
  );
}
