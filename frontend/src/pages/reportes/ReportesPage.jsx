import AdminLayout from "../../layout/Admin/AdminLayout";
import { ChartBarIcon, CalendarDaysIcon, ArrowTrendingUpIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function ReportesPage() {
  const cards = [
    {
      title: "Ventas Totales",
      desc: "Resumen general de ingresos y número de ventas.",
      icon: ChartBarIcon,
      href: "/reportes/ventas-totales",
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Ventas por Fecha",
      desc: "Ver ventas realizadas en un día específico.",
      icon: CalendarDaysIcon,
      href: "/reportes/ventas-por-fecha",
      color: "from-green-500 to-green-700",
    },
    {
      title: "Top Productos",
      desc: "Productos más vendidos de la botica.",
      icon: ArrowTrendingUpIcon,
      href: "/reportes/top-productos",
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Inventario General",
      desc: "Listado detallado del inventario actual.",
      icon: ClipboardDocumentListIcon,
      href: "/reportes/inventario",
      color: "from-orange-500 to-orange-700",
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Reportes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {cards.map((card, i) => {
          const Icon = card.icon;

          return (
            <motion.a
              key={i}
              href={card.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="group p-6 bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {/* ICON */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-105 transition`}>
                <Icon className="w-7 h-7" />
              </div>

              {/* TEXT */}
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="text-gray-600 mt-2">{card.desc}</p>
            </motion.a>
          );
        })}

      </div>
    </AdminLayout>
  );
}
