// src/pages/CatalogoPage.jsx
import { useEffect, useState, useMemo } from "react";
import PublicLayout from "../../layout/public/PublicLayout";
import {
  getProductosPublic,
  searchProductosPublic,
} from "../../services/productPublicService";
import { Link } from "react-router-dom";
import { Search, ChevronDown, DollarSign, Loader } from "lucide-react"; // Iconos para mejor UX

export default function CatalogoPage() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [laboratorio, setLaboratorio] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [laboratorios, setLaboratorios] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setIsLoading(true);
    try {
      const data = await getProductosPublic();
      setProductos(data);

      const labs = [...new Set(data.map((p) => p.laboratorio))].sort(); // Ordenar laboratorios
      setLaboratorios(labs);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buscar = async (q) => {
    setIsLoading(true);
    try {
      const data = await searchProductosPublic(q);
      setProductos(data);
    } catch (error) {
      console.error("Error buscando productos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Usamos useMemo para optimizar los filtros y evitar recálculos innecesarios
  const filtrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideNombre = p.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());
      const coincideLab =
        laboratorio === "" ||
        p.laboratorio.toLowerCase() === laboratorio.toLowerCase();
      const coincidePrecioMin =
        precioMin === "" || p.precio >= Number(precioMin);
      const coincidePrecioMax =
        precioMax === "" || p.precio <= Number(precioMax);

      return (
        coincideNombre && coincideLab && coincidePrecioMin && coincidePrecioMax
      );
    });
  }, [productos, busqueda, laboratorio, precioMin, precioMax]);

  // Función para resetear todos los filtros (Mejora de UX)
  const resetearFiltros = () => {
    setBusqueda("");
    setPrecioMin("");
    setPrecioMax("");
    setLaboratorio("");
    // Si la búsqueda está vacía, cargamos los productos iniciales o mantenemos los actuales
    if (busqueda.length > 0) {
      cargarProductos();
    }
  };

  return (
    <PublicLayout>
      {/* Sección de Encabezado (Header) - Mejorada visualmente */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Descubre Nuestro Catálogo
          </h1>
          <p className="mt-2 text-blue-200 text-lg">
            Encuentra los productos que necesitas rápidamente con nuestros
            filtros.
          </p>
        </div>
      </section>

      {/* Sección Principal de Catálogo */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* Controles de Filtrado - Mejorados con Iconos y Diseño Agrupado */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 mb-8">
          <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Opciones de Búsqueda y Filtrado
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {/* Input de Búsqueda (Con Icono) */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar producto por nombre..."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-150"
                value={busqueda}
                onChange={(e) => {
                  const q = e.target.value;
                  setBusqueda(q);

                  // La lógica funcional se mantiene
                  if (q.length >= 2) {
                    buscar(q);
                  } else if (q.length === 0) {
                    cargarProductos(); // Opcional: recargar si la búsqueda se vacía
                  }
                }}
              />
            </div>

            {/* Selector de Laboratorio (Con Icono) */}
            <div className="relative">
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <select
                className="w-full appearance-none p-3 pl-4 border border-slate-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white transition duration-150"
                onChange={(e) => setLaboratorio(e.target.value)}
                value={laboratorio}
              >
                <option value="">Todos los laboratorios</option>
                {laboratorios.map((lab, i) => (
                  <option key={i} value={lab}>
                    {lab}
                  </option>
                ))}
              </select>
            </div>

            {/* Input Precio Mínimo (Con Icono de Moneda) */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                placeholder="Precio min."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-150 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={(e) => setPrecioMin(e.target.value)}
                value={precioMin}
                min="0"
              />
            </div>

            {/* Input Precio Máximo (Con Icono de Moneda) */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                placeholder="Precio máx."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-150 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={(e) => setPrecioMax(e.target.value)}
                value={precioMax}
                min="0"
              />
            </div>
          </div>

          {/* Botón de Limpiar Filtros - Mejora de UX */}
          <div className="mt-4 flex justify-end">
            {(busqueda || precioMin || precioMax || laboratorio) && (
              <button
                onClick={resetearFiltros}
                className="text-sm text-red-600 hover:text-red-800 font-medium transition duration-150"
              >
                Limpiar Filtros
              </button>
            )}
          </div>
        </div>

        {/* Mensaje de Conteo y Estados (Cargando / Sin Resultados) */}
        <p className="mt-4 text-slate-600 text-md font-medium">
          Resultados:{" "}
          <span className="text-blue-700 font-bold">{filtrados.length}</span>{" "}
          productos encontrados
        </p>

        {/* Contenido del Catálogo */}
        <div className="mt-8">
          {/* Estado de Carga (Loading) */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <Loader className="w-8 h-8 text-blue-500 animate-spin mr-3" />
              <p className="text-xl text-blue-600 font-medium">
                Cargando productos...
              </p>
            </div>
          )}

          {/* Estado Vacío (No hay resultados) */}
          {!isLoading && filtrados.length === 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg text-center mt-10">
              <p className="text-lg font-semibold text-yellow-800">
                😔 ¡Vaya! No encontramos productos que coincidan con tu búsqueda
                y filtros.
              </p>
              <p className="mt-2 text-yellow-700">
                Intenta ajustar los criterios o{" "}
                <button
                  onClick={resetearFiltros}
                  className="text-blue-600 hover:underline font-bold"
                >
                  limpiar los filtros
                </button>
                .
              </p>
            </div>
          )}

          {/* Lista de Productos (Tarjetas Mejoradas) */}
          {!isLoading && filtrados.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtrados.map((p) => (
                <article
                  key={p.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-100 overflow-hidden"
                >
                  {/* Área de Imagen/Placeholder (Mejorado) */}
                  <div className="h-40 bg-white flex items-center justify-center overflow-hidden border-b rounded-t-xl">
                    {p.imagen ? (
                      <img
                        src={`http://localhost:4000/uploads/${p.imagen}`}
                        alt={p.nombre}
                        className="w-full h-full object-contain p-3"
                      />
                    ) : (
                      <span className="text-blue-600 font-bold text-lg px-4 text-center">
                        {p.nombre}
                      </span>
                    )}
                  </div>

                  {/* Detalles del Producto */}
                  <div className="p-5">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                      {p.laboratorio}
                    </p>
                    <h3 className="text-lg font-extrabold text-slate-800 mt-1 truncate">
                      {p.nombre}
                    </h3>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xl text-blue-700 font-bold">
                        S/. {Number(p.precio).toFixed(2)}
                      </p>

                      {/* Botón de Acción (Mejorado) */}
                      <Link
                        to={`/producto/${p.id}`}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition duration-150 shadow-md hover:shadow-lg"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
