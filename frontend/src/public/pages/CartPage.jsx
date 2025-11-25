// src/public/pages/CartPage.jsx
import PublicLayout from "../../layout/public/PublicLayout";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto p-6 mt-8">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
          Tu carrito
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow">
            <p className="text-gray-600 text-lg">
              No tienes productos en tu carrito aún.
            </p>

            <Link
              to="/catalogo"
              className="mt-6 inline-block px-6 py-3 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition"
            >
              Ir al catálogo
            </Link>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((p) => (
                <li
                  key={p.id}
                  className="flex justify-between items-center bg-white p-5 rounded-xl shadow border border-gray-100"
                >
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {p.nombre}
                    </p>
                    <p className="text-gray-600">Precio: S/. {p.precio}</p>
                    <p className="text-gray-600">Cantidad: {p.cantidad}</p>
                  </div>

                  <button
                    onClick={() => removeFromCart(p.id)}
                    className="text-red-600 font-semibold hover:text-red-800 transition"
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 bg-white p-5 rounded-xl shadow border border-gray-100 flex justify-between items-center">
              <p className="text-2xl font-bold text-gray-800">
                Total:{" "}
                <span className="text-emerald-600">S/. {total.toFixed(2)}</span>
              </p>

              <button
                onClick={clearCart}
                className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition shadow"
              >
                Vaciar carrito
              </button>
            </div>

            <Link
              to="/checkout"
              className="w-full mt-6 inline-block text-center bg-emerald-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-emerald-700 transition"
            >
              Finalizar compra
            </Link>
          </>
        )}
      </div>
    </PublicLayout>
  );
}
