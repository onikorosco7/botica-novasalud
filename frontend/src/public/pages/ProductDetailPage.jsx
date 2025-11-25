// src/pages/ProductDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductoPublicById } from "../../services/productPublicService";
import PublicLayout from "../../layout/public/PublicLayout";
import { useCart } from "../../context/CartContext";
// ¡CORREGIDO! 'Pill' en singular
import { ShoppingCart, Package, DollarSign, Pill } from "lucide-react"; // Iconos para mejor UX

export default function ProductDetailPage() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const cargar = async () => {
      setIsLoading(true);
      try {
        const data = await getProductoPublicById(id);
        setProducto(data);
      } catch (error) {
        console.error("Error cargando producto", error);
        // Podríamos setear un estado de error aquí
      } finally {
        setIsLoading(false);
      }
    };
    cargar();
  }, [id]);

  // Estado de Carga (Loading State) - Más prominente y mejor diseñado
  if (isLoading)
    return (
      <PublicLayout>
        <div className="flex justify-center items-center h-[50vh] flex-col">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-blue-600"></div>
          <p className="mt-4 text-lg text-blue-600 font-semibold">
            Cargando detalles del producto...
          </p>
        </div>
      </PublicLayout>
    );

  // Estado de Producto No Encontrado (Manejo simple, asumiendo que el error se maneja en 'finally')
  if (!producto)
    return (
      <PublicLayout>
        <div className="max-w-4xl mx-auto mt-20 p-8 bg-red-50 border border-red-200 rounded-xl text-center shadow-lg">
          <h2 className="text-2xl font-bold text-red-700">
            Producto no encontrado
          </h2>
          <p className="mt-2 text-red-600">
            El ID del producto no es válido o no existe en el catálogo.
          </p>
          <Link
            to="/catalogo"
            className="mt-4 inline-block text-blue-600 font-semibold hover:text-blue-700 transition"
          >
            ← Volver al catálogo
          </Link>
        </div>
      </PublicLayout>
    );

  // Contenido de la Página de Detalle
  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto my-12 p-8 bg-white rounded-3xl shadow-2xl border border-blue-100/50">
        <Link
          to="/catalogo"
          className="inline-flex items-center mb-6 text-blue-600 font-medium hover:text-blue-700 hover:underline transition"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Columna 1: IMAGEN DEL PRODUCTO (Visualmente mejorado) */}
          <div className="lg:col-span-1 flex justify-center items-center p-4 bg-blue-50/70 rounded-2xl shadow-inner border border-blue-100 h-96">
            {/* ¡CORREGIDO EL NOMBRE DEL COMPONENTE A 'Pill'! */}
            {producto.imagen ? (
              <img
                src={`http://localhost:4000/uploads/${producto.imagen}`}
                alt={producto.nombre}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <Pill className="w-24 h-24 text-blue-400" />
            )}

            <span className="sr-only">Imagen de producto</span>
            {/* Si tuvieras p.imagenUrl, usarías: <img src={producto.imagenUrl} alt={producto.nombre} className="max-w-full max-h-full object-contain" /> */}
          </div>

          {/* Columna 2 & 3: INFORMACIÓN Y ACCIONES */}
          <div className="lg:col-span-2">
            {/* Título y Laboratorio */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              {producto.nombre}
            </h1>
            <p className="text-xl text-blue-700 font-semibold mt-2 mb-4 uppercase tracking-wider">
              {producto.laboratorio}
            </p>

            <hr className="my-6 border-blue-100" />

            {/* Detalles Clave (Organización de la Información) */}
            <div className="space-y-4">
              {/* PRECIO (Más destacado) */}
              <div className="flex items-center text-gray-700">
                <DollarSign className="w-6 h-6 mr-3 text-emerald-500 flex-shrink-0" />
                <span className="font-semibold text-gray-900 mr-2">
                  Precio Unitario:
                </span>
                <span className="text-3xl text-emerald-600 font-bold">
                  S/. {Number(producto.precio).toFixed(2)}
                </span>
              </div>

              {/* STOCK */}
              <div className="flex items-center text-gray-700">
                <Package className="w-6 h-6 mr-3 text-amber-500 flex-shrink-0" />
                <span className="font-semibold text-gray-900 mr-2">
                  Stock Disponible:
                </span>
                <span
                  className={`font-bold text-xl ${
                    producto.stock > 10
                      ? "text-green-600"
                      : producto.stock > 0
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {producto.stock > 0
                    ? `${producto.stock} unidades`
                    : "AGOTADO"}
                </span>
              </div>
            </div>

            <hr className="my-8 border-blue-100" />

            {/* Acciones (CTA - Call to Action) */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              {/* Botón de Agregar al Carrito (Mejorado y deshabilitado si no hay stock) */}
              <button
                onClick={() => addToCart(producto)}
                disabled={producto.stock === 0}
                className={`flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg transition duration-200 shadow-lg ${
                  producto.stock > 0
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              >
                <ShoppingCart className="w-6 h-6 mr-3" />
                {producto.stock > 0 ? "Agregar al carrito" : "Sin Stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
