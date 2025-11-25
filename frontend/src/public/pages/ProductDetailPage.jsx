import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductoPublicById } from "../../services/productPublicService";
import PublicLayout from "../../layout/public/PublicLayout";
import { useCart } from "../../context/CartContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getProductoPublicById(id);
        setProducto(data);
      } catch (error) {
        console.error("Error cargando producto", error);
      }
    };
    cargar();
  }, [id]);

  if (!producto)
    return (
      <PublicLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
        </div>
      </PublicLayout>
    );

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* IMAGEN DEL PRODUCTO (opcional o placeholder) */}
          <div className="flex justify-center items-center">
            <div className="w-64 h-64 bg-gray-100 rounded-xl flex items-center justify-center shadow-inner">
              <span className="text-gray-400 text-xl">Sin imagen</span>
            </div>
          </div>

          {/* INFORMACIÓN */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {producto.nombre}
            </h1>

            <p className="text-lg text-gray-700 mb-2">
              <span className="font-semibold text-gray-900">Laboratorio:</span>{" "}
              {producto.laboratorio}
            </p>

            <p className="text-lg text-gray-700 mb-2">
              <span className="font-semibold text-gray-900">Precio:</span>{" "}
              <span className="text-emerald-600 font-bold text-2xl">
                S/. {producto.precio}
              </span>
            </p>

            <p className="text-lg text-gray-700 mb-4">
              <span className="font-semibold text-gray-900">
                Stock disponible:
              </span>{" "}
              {producto.stock}
            </p>

            <button
              onClick={() => addToCart(producto)}
              className="w-full md:w-auto bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-emerald-700 transition"
            >
              Agregar al carrito
            </button>

            <a
              href="/catalogo"
              className="inline-block mt-4 md:mt-6 text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              ← Volver al catálogo
            </a>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
