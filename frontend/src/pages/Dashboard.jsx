import { useEffect, useState } from "react";
import AdminLayout from "../layout/Admin/AdminLayout";

import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  getVentasPorDia,
  getTopProductos,
  getVentasTotales,
  getInventario,
} from "../services/dashboardService";

import LoaderOverlay from "../components/ui/LoaderOverlay";
import { motion } from "framer-motion";
import {
  BanknotesIcon,
  ShoppingBagIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [ventasDia, setVentasDia] = useState([]);
  const [topProductos, setTopProductos] = useState([]);
  const [stats, setStats] = useState(null);
  const [inventario, setInventario] = useState([]);
  const [loading, setLoading] = useState(true);

  // Skeleton loader de tarjetas
  const CardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow p-6 border animate-pulse">
      <div className="h-6 w-32 bg-gray-300 rounded mb-3"></div>
      <div className="h-10 w-24 bg-gray-300 rounded"></div>
    </div>
  );

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const vDia = await getVentasPorDia();
      const tProd = await getTopProductos();
      const tot = await getVentasTotales();
      const inv = await getInventario();

      setVentasDia(vDia.data.data || []);
      setTopProductos(tProd.data.data || []);
      setStats(tot.data.data || null);
      setInventario(inv.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  // Tarjetas
  const cards = [
    {
      title: "Total Ventas",
      value: stats?.total_ventas || 0,
      color: "from-blue-500 to-blue-700",
      icon: ShoppingBagIcon,
    },
    {
      title: "Ingresos Totales",
      value: `S/. ${stats?.total_ingresos || 0}`,
      color: "from-green-500 to-green-700",
      icon: BanknotesIcon,
    },
    {
      title: "Stock Crítico",
      value: inventario.filter((i) => i.stock <= i.stock_minimo).length,
      color: "from-red-500 to-red-700",
      icon: ArrowTrendingUpIcon,
    },
  ];

  return (
    <>
      {loading && <LoaderOverlay text="Cargando estadísticas..." />}

      <AdminLayout>
        <h1 className="text-3xl font-bold mb-8 tracking-tight">Dashboard</h1>

        {/* TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {loading
            ? [...Array(3)].map((_, i) => <CardSkeleton key={i} />)
            : cards.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white shadow mb-4`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="font-medium text-gray-500">{c.title}</h3>
                    <p className="text-4xl font-bold mt-2 text-gray-800">
                      {c.value}
                    </p>
                  </motion.div>
                );
              })}
        </div>

        {/* GRÁFICOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Ventas por día */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 border"
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Ventas por Día
            </h2>
            {!loading && (
              <Line
                data={{
                  labels: ventasDia.map((v) => v.fecha),
                  datasets: [
                    {
                      label: "Ventas S/.",
                      data: ventasDia.map((v) => v.total_dia),
                      borderColor: "#2563EB",
                      backgroundColor: "rgba(37, 99, 235, 0.3)",
                      borderWidth: 3,
                    },
                  ],
                }}
              />
            )}
          </motion.div>

          {/* Top productos */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="bg-white rounded-2xl shadow-lg p-6 border"
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Top Productos Vendidos
            </h2>
            {!loading && (
              <Bar
                data={{
                  labels: topProductos.map((p) => p.nombre),
                  datasets: [
                    {
                      label: "Cantidad vendida",
                      data: topProductos.map((p) => p.total_vendido),
                      backgroundColor: "rgba(16, 185, 129, 0.6)",
                    },
                  ],
                }}
              />
            )}
          </motion.div>

          {/* Inventario Doughnut */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="bg-white rounded-2xl shadow-lg p-6 border col-span-1 lg:col-span-2"
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Inventario General
            </h2>
            {!loading && (
              <Doughnut
                data={{
                  labels: inventario.map((p) => p.nombre),
                  datasets: [
                    {
                      data: inventario.map((p) => p.stock),
                      backgroundColor: inventario.map(
                        () =>
                          `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
                      ),
                    },
                  ],
                }}
              />
            )}
          </motion.div>
        </div>
      </AdminLayout>
    </>
  );
}
