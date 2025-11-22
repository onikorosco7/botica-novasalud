// src/pages/CatalogoPage.jsx
import { useEffect, useState } from "react";
import PublicLayout from "../../layout/public/PublicLayout";
import { getProductos } from "../../services/productService";

import { Link } from "react-router-dom";

export default function CatalogoPage() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [laboratorio, setLaboratorio] = useState("");

  const [laboratorios, setLaboratorios] = useState([]);

  // Cargar productos del backend
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await getProductos();
      setProductos(res.data);

      // obtener laboratorios únicos
      const labs = [...new Set(res.data.map((p) => p.laboratorio))];
      setLaboratorios(labs);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  // FILTRAR PRODUCTOS
  const filtrados = productos.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());

    const coincideLab =
      laboratorio === "" || p.laboratorio.toLowerCase() === laboratorio.toLowerCase();

    const coincidePrecioMin = precioMin === "" || p.precio >= Number(precioMin);

    const coincidePrecioMax = precioMax === "" || p.precio <= Number(precioMax);

    return coincideNombre && coincideLab && coincidePrecioMin && coincidePrecioMax;
  });

  return (
    <PublicLayout>
      {/* HERO DEL CATÁLOGO */}
      <section className="bg-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold">Catálogo de Productos</h1>
          <p className="text-blue-200 mt-2 text-sm md:text-base">
            Encuentra medicamentos confiables y productos de salud para ti y tu familia.
          </p>
        </div>
      </section>

      {/* FILTROS */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-4">

          {/* BUSCADOR */}
          <input
            type="text"
            placeholder="Buscar producto..."
            className="p-3 border rounded-lg shadow-sm outline-blue-600"
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {/* LABORATORIO */}
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

          {/* PRECIO MIN */}
          <input
            type="number"
            placeholder="Precio mínimo"
            className="p-3 border rounded-lg shadow-sm outline-blue-600"
            onChange={(e) => setPrecioMin(e.target.value)}
          />

          {/* PRECIO MAX */}
          <input
            type="number"
            placeholder="Precio máximo"
            className="p-3 border rounded-lg shadow-sm outline-blue-600"
            onChange={(e) => setPrecioMax(e.target.value)}
          />
        </div>

        {/* RESULTADOS */}
        <p className="mt-4 text-slate-600 text-sm">
          {filtrados.length} productos encontrados
        </p>

        {/* LISTADO */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {filtrados.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md hover:-translate-y-1 transition"
            >
              <div className="h-28 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center border border-blue-200">
                <span className="text-blue-700 font-semibold text-sm px-4 text-center">
                  {p.nombre}
                </span>
              </div>

              <p className="text-xs text-blue-700 font-medium mt-3">
                {p.laboratorio}
              </p>

              <p className="text-lg text-blue-800 font-bold mt-2">
                S/. {Number(p.precio).toFixed(2)}
              </p>

              <Link
                to={`/producto/${p.id}`}
                className="mt-3 inline-flex text-sm text-blue-700 font-semibold hover:underline"
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
