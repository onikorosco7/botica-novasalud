import { useCart } from "../../context/CartContext";
import PublicLayout from "../../layout/public/PublicLayout";
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importamos Link para volver al carrito
import axios from "axios";
// Importamos iconos para un checkout más profesional
import {
  CheckCircle,
  MapPin,
  Phone,
  User,
  ShoppingBag,
  Loader2,
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate(); // Hook para navegación fluida

  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });

  const [loading, setLoading] = useState(false);

  // Nuevo estado para manejar la retroalimentación de éxito/error del envío
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Usamos useMemo para calcular el total
  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }, [cart]);

  // Función para formatear precio
  const formatPrice = (price) => `S/. ${Number(price).toFixed(2)}`;

  // Validación: más explícita y mejor retroalimentación
  const validarFormulario = useMemo(() => {
    return (
      cliente.nombre.trim().length > 2 &&
      cliente.telefono.trim().length >= 6 &&
      cliente.direccion.trim().length > 3 &&
      cart.length > 0
    );
  }, [cliente, cart]);

  const actualizarCampo = (campo, valor) => {
    setCliente((prev) => ({
      ...prev,
      [campo]: valor.trimStart(),
    }));
  };

  const enviarPedido = async () => {
    if (!validarFormulario) {
      setSubmissionStatus({
        type: "error",
        message:
          "Por favor completa todos los datos obligatorios antes de finalizar.",
      });
      return;
    }

    setLoading(true);
    setSubmissionStatus(null);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/ventas/public",
        {
          cliente,
          carrito: cart,
        },
        { timeout: 15000 }
      );

      // Feedback de éxito mejorado
      setSubmissionStatus({
        type: "success",
        message: `¡Pedido #${res.data.ventaId} confirmado!`,
      });

      // Lógica de apertura de comprobante
      const comprobanteURL = `http://localhost:4000/api/ventas/comprobante/${res.data.ventaId}`;
      const nuevaPestana = window.open(comprobanteURL, "_blank", "noopener");

      if (!nuevaPestana) {
        // Mejor UX para bloqueos
        setSubmissionStatus({
          type: "warning",
          message:
            "¡Bloqueo detectado! Tu pedido fue registrado, pero el navegador bloqueó la descarga del comprobante. Por favor, revisa tu carpeta de descargas.",
        });
      }

      clearCart();
      // Navegación suave después de un pequeño retraso para que el usuario vea el mensaje de éxito
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      setSubmissionStatus({
        type: "error",
        message:
          "Hubo un error de conexión al procesar el pago. Intenta nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Si el carrito está vacío (después del envío exitoso o si llega sin ítems)
  if (cart.length === 0 && submissionStatus?.type !== "success") {
    return (
      <PublicLayout>
        <div className="max-w-4xl mx-auto mt-20 p-8 bg-yellow-50 border border-yellow-200 rounded-xl text-center shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-700">Carrito vacío</h2>
          <p className="mt-2 text-yellow-600">
            No puedes proceder a la compra sin productos.
          </p>
          <Link
            to="/cart"
            className="mt-4 inline-block text-blue-600 font-semibold hover:text-blue-700 transition"
          >
            ← Volver al carrito
          </Link>
        </div>
      </PublicLayout>
    );
  }

  // Vista principal del Checkout
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto my-12 p-6">
        {/* Encabezado */}
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 border-b pb-4 border-blue-100 flex items-center">
          <CheckCircle className="w-8 h-8 mr-3 text-emerald-600" />
          Finalizar Compra
        </h1>

        {/* Contenido en 2 columnas: Formulario y Resumen */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna 1: Formulario de Datos (2/3) */}
          <div className="lg:col-span-2 p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <User className="w-6 h-6 mr-2 text-blue-600" />
              1. Datos de Contacto y Envío
            </h2>

            {/* Formulario */}
            <div className="space-y-5">
              {/* Input: Nombre */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full border border-gray-300 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Nombre completo (ej. Juan Pérez)"
                  value={cliente.nombre}
                  onChange={(e) => actualizarCampo("nombre", e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Input: Teléfono */}
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  className="w-full border border-gray-300 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Teléfono de contacto (ej. 987654321)"
                  value={cliente.telefono}
                  onChange={(e) => actualizarCampo("telefono", e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Input: Dirección */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full border border-gray-300 p-3 pl-10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Dirección de envío (Calle, número, ref.)"
                  value={cliente.direccion}
                  onChange={(e) => actualizarCampo("direccion", e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Mensaje de Confianza */}
            <p className="text-left text-sm text-gray-500 mt-6">
              Tus datos personales se usarán únicamente para gestionar el envío
              y contactarte.
            </p>

            {/* Botón Volver al Carrito */}
            <Link
              to="/carrito"
              className="inline-block mt-4 text-sm text-blue-600 font-medium hover:text-blue-700 hover:underline transition"
            >
              ← Volver a modificar el carrito
            </Link>
          </div>

          {/* Columna 2: Resumen del Pedido (1/3) */}
          <div className="lg:col-span-1">
            <div className="bg-blue-50 p-6 rounded-2xl shadow-lg border border-blue-100 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <ShoppingBag className="w-6 h-6 mr-2 text-blue-700" />
                2. Tu Pedido
              </h2>

              {/* Ítems del carrito */}
              <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm border-b pb-2 border-gray-200 last:border-b-0"
                  >
                    <span className="text-gray-600">
                      {item.nombre} (x{item.cantidad})
                    </span>
                    <span className="font-semibold text-gray-700">
                      {formatPrice(item.precio * item.cantidad)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center border-t pt-4 border-blue-200">
                <p className="text-xl font-bold text-gray-900">
                  TOTAL A PAGAR:
                </p>
                <p className="text-3xl font-extrabold text-emerald-600">
                  {formatPrice(total)}
                </p>
              </div>

              <hr className="my-6 border-blue-100" />

              {/* Mensajes de Retroalimentación */}
              {submissionStatus && (
                <div
                  className={`p-3 rounded-lg text-sm mb-4 font-semibold ${
                    submissionStatus.type === "success"
                      ? "bg-emerald-100 text-emerald-800"
                      : submissionStatus.type === "error"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {submissionStatus.message}
                </div>
              )}

              {/* Botón de Confirmación (CTA) */}
              <button
                className={`w-full py-4 rounded-xl text-white font-bold text-lg transition duration-200 shadow-xl flex items-center justify-center ${
                  validarFormulario && !loading
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={
                  !validarFormulario ||
                  loading ||
                  submissionStatus?.type === "success"
                }
                onClick={enviarPedido}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Procesando Pedido...
                  </>
                ) : (
                  "Confirmar y Pagar"
                )}
              </button>

              {/* Garantía */}
              <p className="text-center text-xs text-gray-500 mt-4">
                Al confirmar, aceptas nuestros términos y condiciones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
