// src/public/pages/CartPage.jsx
import PublicLayout from "../../layout/public/PublicLayout";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
// Importamos iconos para mejorar la presentación visual
import { ShoppingCart, X, Trash2, ArrowRight, Package } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  // Función de ayuda para formatear el precio
  const formatPrice = (price) => `S/. ${Number(price).toFixed(2)}`;

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto p-6 mt-10 mb-20">
        {/* Título de la Página - Mejorado con Icono */}
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 flex items-center border-b pb-4 border-blue-100">
          <ShoppingCart className="w-8 h-8 mr-3 text-blue-600" />
          Revisa Tu Carrito
        </h1>

        {cart.length === 0 ? (
          /* Estado de Carrito Vacío - Más atractivo */
          <div className="text-center py-20 bg-white border-2 border-dashed border-blue-200 rounded-xl shadow-lg">
            <Package className="w-16 h-16 mx-auto text-blue-400 mb-4" />
            <p className="text-gray-600 text-xl font-medium">
              Tu carrito está vacío. ¡Es momento de llenarlo!
            </p>

            <Link
              to="/catalogo"
              className="mt-8 inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-xl hover:bg-blue-700 transition transform hover:scale-[1.01]"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Explorar el Catálogo
            </Link>
          </div>
        ) : (
          /* Carrito con Productos */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Columna 1: Lista de Productos */}
            <div className="lg:col-span-2">
              <ul className="space-y-4">
                {cart.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center bg-white p-5 rounded-xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg"
                  >
                    {/* Placeholder/Imagen (Sugerencia de UI) */}
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      {p.imagen ? (
                        <img
                          src={`http://localhost:4000/uploads/${p.imagen}`}
                          alt={p.nombre}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Package className="w-6 h-6 text-blue-500" />
                      )}
                    </div>

                    {/* Información del Ítem */}
                    <div className="flex-grow min-w-0">
                      <p className="text-lg font-bold text-gray-800 truncate">
                        {p.nombre}
                      </p>
                      <p className="text-sm text-gray-500 font-medium">
                        {p.laboratorio}
                      </p>

                      {/* Detalles de Cantidad y Precio unitario en la misma línea */}
                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-semibold">Cantidad:</span>{" "}
                        {p.cantidad} x{" "}
                        <span className="text-emerald-600 font-semibold">
                          {formatPrice(p.precio)}
                        </span>{" "}
                        c/u
                      </p>
                    </div>

                    {/* Subtotal (Destacado) */}
                    <div className="text-right ml-4 flex-shrink-0">
                      <p className="text-xl font-extrabold text-blue-700">
                        {formatPrice(p.precio * p.cantidad)}
                      </p>
                    </div>

                    {/* Botón Quitar */}
                    <button
                      onClick={() => removeFromCart(p.id)}
                      className="ml-4 p-2 text-red-500 hover:text-red-700 bg-red-50 rounded-full transition duration-150 flex-shrink-0"
                      title="Quitar producto"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Botón de Vaciar Carrito (Movido para claridad) */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={clearCart}
                  className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-800 transition px-3 py-1 rounded-md"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Vaciar todo el carrito
                </button>
              </div>
            </div>

            {/* Columna 2: Resumen y CTA (Checkout) - Sticky en escritorio */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">
                  Resumen del Pedido
                </h2>

                {/* Detalle del total (Total vs Subtotal) */}
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg text-gray-600">
                    Subtotal ({cart.length} productos)
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    {formatPrice(total)}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t pt-4 border-blue-200">
                  <p className="text-3xl font-extrabold text-gray-900">
                    Total:
                  </p>
                  <p className="text-3xl font-extrabold text-emerald-600">
                    {formatPrice(total)}
                  </p>
                </div>

                {/* CTA - Finalizar Compra (Más prominente) */}
                <Link
                  to="/checkout"
                  className="w-full mt-6 inline-flex items-center justify-center bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-emerald-700 transition transform hover:scale-105"
                >
                  <ArrowRight className="w-5 h-5 mr-3" />
                  Pagar ahora
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
