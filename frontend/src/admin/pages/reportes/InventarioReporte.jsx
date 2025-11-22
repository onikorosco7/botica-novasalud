import { useEffect, useState } from "react";
import { getInventarioReporte } from "../../services/reportService";
import AdminLayout from "../../layout/Admin/AdminLayout";
import LoaderOverlay from "../../components/ui/LoaderOverlay";

export default function InventarioReporte() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buscar, setBuscar] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await getInventarioReporte();
        setData(res.data.data);
        setFiltered(res.data.data);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  // Skeleton
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="p-3"><div className="h-4 bg-gray-300 rounded w-32"></div></td>
      <td className="p-3"><div className="h-4 bg-gray-300 rounded w-24"></div></td>
      <td className="p-3"><div className="h-4 bg-gray-300 rounded w-20"></div></td>
      <td className="p-3"><div className="h-4 bg-gray-300 rounded w-12"></div></td>
      <td className="p-3"><div className="h-4 bg-gray-300 rounded w-12"></div></td>
      <td className="p-3"><div className="h-4 bg-gray-300 rounded w-20"></div></td>
    </tr>
  );

  // Barra de estado visual
  const getStatus = (stock, minimo) => {
    if (stock <= minimo) {
      return {
        label: "Crítico",
        color: "bg-red-600 text-white",
      };
    }
    if (stock <= minimo * 2) {
      return {
        label: "Bajo",
        color: "bg-yellow-500 text-white",
      };
    }
    return {
      label: "OK",
      color: "bg-green-600 text-white",
    };
  };

  // Buscar productos
  const filtrar = (text) => {
    setBuscar(text);
    if (!text) {
      setFiltered(data);
      return;
    }

    const f = data.filter((p) =>
      p.nombre.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(f);
  };

  return (
    <>
      {loading && <LoaderOverlay text="Cargando inventario..." />}

      <AdminLayout>
        <h1 className="text-2xl font-bold mb-6">Inventario General</h1>

        {/* Búsqueda */}
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={buscar}
          onChange={(e) => filtrar(e.target.value)}
          className="border p-2 rounded w-64 mb-4 shadow-sm"
        />

        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Producto</th>
              <th className="p-3 text-left">Laboratorio</th>
              <th className="p-3 text-left">Precio</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Mínimo</th>
              <th className="p-3 text-left">Estado</th>
            </tr>
          </thead>

          <tbody>
            {/* Skeleton */}
            {loading &&
              [...Array(6)].map((_, i) => <SkeletonRow key={i} />)}

            {/* No resultados */}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No se encontraron productos con ese nombre.
                </td>
              </tr>
            )}

            {/* Datos */}
            {!loading &&
              filtered.map((p) => {
                const status = getStatus(p.stock, p.stock_minimo);

                return (
                  <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3">{p.nombre}</td>
                    <td className="p-3">{p.laboratorio}</td>
                    <td className="p-3">S/. {p.precio}</td>
                    <td className="p-3">{p.stock}</td>
                    <td className="p-3">{p.stock_minimo}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded text-sm font-semibold ${status.color}`}
                      >
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </AdminLayout>
    </>
  );
}
