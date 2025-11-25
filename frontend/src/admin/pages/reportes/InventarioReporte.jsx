import { useEffect, useState, useMemo } from "react";
import { getInventarioReporte } from "../../../services/reportService";
import AdminLayout from "../../../layout/Admin/AdminLayout";
import LoaderOverlay from "../../../components/ui/LoaderOverlay";
// Importamos TODOS los íconos necesarios (¡CORREGIDO: CheckCircle añadido!)
import {
  Search,
  BarChart3,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function InventarioReporte() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buscar, setBuscar] = useState("");

  const IMG_BASE_URL = "http://localhost:4000/uploads/";

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await getInventarioReporte();
        setData(res.data.data);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  // Función para determinar el estilo y la etiqueta de estado
  const getStatus = (stock, minimo) => {
    const stockNum = Number(stock);
    const minimoNum = Number(minimo);

    // Crítico: Stock en 0 o debajo del mínimo
    if (stockNum <= 0 || stockNum <= minimoNum) {
      return {
        label: "CRÍTICO",
        color: "bg-red-500 text-white font-bold",
        icon: <AlertTriangle className="w-4 h-4 mr-1" />,
      };
    }
    // Bajo: Stock menos del 150% del mínimo
    if (stockNum <= minimoNum * 1.5) {
      return {
        label: "BAJO",
        color: "bg-yellow-400 text-gray-800 font-semibold",
        icon: <TrendingUp className="w-4 h-4 mr-1 rotate-180" />,
      };
    }
    // OK/Saludable
    return {
      label: "SALUDABLE",
      color: "bg-green-500 text-white font-semibold",
      // ¡ESTE ERA EL COMPONENTE FALTANTE!
      icon: <CheckCircle className="w-4 h-4 mr-1" />,
    };
  };

  // Filtro de productos (Usando useMemo para optimizar el cálculo)
  const filtered = useMemo(() => {
    if (!buscar) return data;

    const lowerSearch = buscar.toLowerCase();
    return data.filter(
      (p) =>
        p.nombre.toLowerCase().includes(lowerSearch) ||
        p.laboratorio.toLowerCase().includes(lowerSearch)
    );
  }, [buscar, data]);

  // Componente Skeleton (Corregido el problema de espacios/saltos de línea)
  const SkeletonRow = () => (
    <tr className="border-b border-gray-100">
      {[40, 180, 100, 70, 50, 50, 100].map((width, i) => (
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
      {loading && <LoaderOverlay text="Cargando inventario..." />}

      <AdminLayout>
        {/* Encabezado */}
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 flex items-center border-b pb-4">
          <BarChart3 className="w-7 h-7 mr-3 text-blue-600" />
          Reporte de Inventario General
        </h1>

        {/* Búsqueda y Filtros */}
        <div className="mb-6 flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por producto o laboratorio..."
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
              className="w-80 p-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Contador de resultados */}
          <span className="text-sm text-gray-500">
            {filtered.length} productos listados
          </span>
        </div>

        {/* Tabla de Reporte */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-xl border border-gray-100">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  Producto
                </th>
                <th scope="col" className="px-6 py-3">
                  Laboratorio
                </th>
                <th scope="col" className="px-6 py-3">
                  Precio (S/.)
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Mínimo
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>
              </tr>
            </thead>

            <tbody>
              {/* Skeleton */}
              {loading && [...Array(10)].map((_, i) => <SkeletonRow key={i} />)}

              {/* No resultados */}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="p-8 text-center text-gray-500 bg-white"
                  >
                    <Search className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                    No se encontraron productos que coincidan con la búsqueda.
                  </td>
                </tr>
              )}

              {/* Datos */}
              {!loading &&
                filtered.map((p) => {
                  const status = getStatus(p.stock, p.stock_minimo);

                  return (
                    <tr
                      key={p.id}
                      className="bg-white border-b hover:bg-gray-50/50 transition duration-150"
                    >
                      {/* IMAGEN */}
                      <td className="px-6 py-3">
                        {p.imagen ? (
                          <img
                            src={`${IMG_BASE_URL}${p.imagen}`}
                            alt={p.nombre}
                            className="w-10 h-10 object-cover rounded-md shadow-sm border border-gray-200"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-md text-gray-400">
                            <Package className="w-4 h-4" />
                          </div>
                        )}
                      </td>

                      {/* PRODUCTO */}
                      <td className="px-6 py-3 font-medium text-gray-900">
                        {p.nombre}
                      </td>

                      {/* LABORATORIO */}
                      <td className="px-6 py-3 text-gray-700">
                        {p.laboratorio}
                      </td>

                      {/* PRECIO */}
                      <td className="px-6 py-3 font-semibold text-blue-700">{`S/. ${Number(
                        p.precio
                      ).toFixed(2)}`}</td>

                      {/* STOCK */}
                      <td className="px-6 py-3 text-center font-bold text-gray-800">
                        {p.stock}
                      </td>

                      {/* MÍNIMO */}
                      <td className="px-6 py-3 text-center text-sm text-gray-600">
                        {p.stock_minimo}
                      </td>

                      {/* ESTADO (Mejorado con Icono) */}
                      <td className="px-6 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider inline-flex items-center ${status.color}`}
                        >
                          {status.icon}
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
}
