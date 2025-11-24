// src/pages/CatalogoPage.jsx
import { useEffect, useState } from "react";
import PublicLayout from "../../layout/public/PublicLayout";
import { getProductosPublic } from "../../services/productPublicService";
import { Link } from "react-router-dom";

export default function CatalogoPage() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [laboratorio, setLaboratorio] = useState("");

  const [laboratorios, setLaboratorios] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data = await getProductosPublic(); // CORREGIDO
      setProductos(data);

      const labs = [...new Set(data.map((p) => p.laboratorio))];
      setLaboratorios(labs);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  const filtrados = productos.filter((p) => {
    const coincideNombre = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincideLab =
      laboratorio === "" ||
      p.laboratorio.toLowerCase() === laboratorio.toLowerCase();
    const coincidePrecioMin = precioMin === "" || p.precio >= Number(precioMin);
    const coincidePrecioMax = precioMax === "" || p.precio <= Number(precioMax);

    return (
      coincideNombre && coincideLab && coincidePrecioMin && coincidePrecioMax
    );
  });

  return (
    <PublicLayout>
      <section className="bg-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold">
            Catálogo de Productos
          </h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="p-3 border rounded-lg shadow-sm outline-blue-600"
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            className="p-3 border rounded-lg shadow-sm outline-blue-600"
            onChange={(e) => setLaboratorio(e.target.value)}
          >
            <option value="">Todos los laboratorios</option>
            {laboratorios.map((lab, i) => (
              <option key={i} value={lab}>
                {lab}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Precio mínimo"
            className="p-3 border rounded-lg shadow-sm outline-blue-600"
            onChange={(e) => setPrecioMin(e.target.value)}
          />

          <input
            type="number"
            placeholder="Precio máximo"
            className="p-3 border rounded-lg shadow-sm outline-blue-600"
            onChange={(e) => setPrecioMax(e.target.value)}
          />
        </div>

        <p className="mt-4 text-slate-600 text-sm">
          {filtrados.length} productos encontrados
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {filtrados.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-2xl shadow-sm border p-5"
            >
              <div className="h-28 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center border">
                <span className="text-blue-700 font-semibold text-sm px-4 text-center">
                  {p.nombre}
                </span>
              </div>

              <p className="text-xs text-blue-700 mt-3">{p.laboratorio}</p>
              <p className="text-lg text-blue-800 font-bold mt-2">
                S/. {Number(p.precio).toFixed(2)}
              </p>

              <Link
                to={`/producto/${p.id}`}
                className="mt-3 inline-flex text-sm text-blue-700 hover:underline"
              >
                Ver detalles
              </Link>
            </article>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
