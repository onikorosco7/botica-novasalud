import { useCart } from "../../context/CartContext";
import PublicLayout from "../../layout/public/PublicLayout";
import { useState } from "react";
import axios from "axios";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });

  const [loading, setLoading] = useState(false);

  const validarFormulario = () => {
    return (
      cliente.nombre.trim().length > 2 &&
      cliente.telefono.trim().length >= 6 &&
      cliente.direccion.trim().length > 3 &&
      cart.length > 0
    );
  };

  const actualizarCampo = (campo, valor) => {
    setCliente((prev) => ({
      ...prev,
      [campo]: valor.trimStart(),
    }));
  };

  const enviarPedido = async () => {
    if (!validarFormulario()) {
      alert("Por favor completa todos los datos correctamente.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/ventas/public",
        {
          cliente,
          carrito: cart,
        },
        { timeout: 10000 } // Seguridad: evita requests colgados
      );

      const comprobanteURL = `http://localhost:4000/api/ventas/comprobante/${res.data.ventaId}`;

      // Asegurar que la ventana abra correctamente
      const nuevaPestana = window.open(comprobanteURL, "_blank", "noopener");

      if (!nuevaPestana) {
        alert(
          "El navegador bloqueó la ventana del comprobante. Permite ventanas emergentes."
        );
      }

      alert(`Venta registrada exitosamente. ID: ${res.data.ventaId}`);

      clearCart();
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar la venta. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-8 border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Datos del cliente
        </h1>

        {/* CAMPOS */}
        <input
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Nombre completo"
          value={cliente.nombre}
          onChange={(e) => actualizarCampo("nombre", e.target.value)}
        />

        <input
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Teléfono"
          value={cliente.telefono}
          onChange={(e) => actualizarCampo("telefono", e.target.value)}
        />

        <input
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Dirección"
          value={cliente.direccion}
          onChange={(e) => actualizarCampo("direccion", e.target.value)}
        />

        {/* BOTÓN */}
        <button
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            validarFormulario()
              ? "bg-blue-700 hover:bg-blue-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!validarFormulario() || loading}
          onClick={enviarPedido}
        >
          {loading ? "Procesando..." : "Confirmar compra"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Tus datos están protegidos y solo serán usados para procesar tu
          compra.
        </p>
      </div>
    </PublicLayout>
  );
}
