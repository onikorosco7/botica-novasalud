import PublicLayout from "../../layout/public/PublicLayout";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviarFormulario = () => {
    if (!form.nombre || !form.email || !form.mensaje) {
      alert("Completa todos los campos.");
      return;
    }

    alert("Gracias por escribirnos. Pronto te responderemos.");
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-20">

        {/* TÍTULO */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Contáctanos
        </h1>

        <p className="text-gray-600 text-center mb-12">
          Si tienes consultas sobre productos, disponibilidad o atención,
          escríbenos y te responderemos lo antes posible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* FORMULARIO */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Envíanos un mensaje</h2>

            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-lg"
            />

            <textarea
              name="mensaje"
              placeholder="Escribe tu consulta..."
              rows="5"
              value={form.mensaje}
              onChange={handleChange}
              className="w-full p-3 mb-4 border rounded-lg"
            ></textarea>

            <button
              onClick={enviarFormulario}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Enviar mensaje
            </button>
          </div>

          {/* INFORMACIÓN + MAPA */}
          <div className="flex flex-col gap-6">

            {/* INFO */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Información de contacto</h2>

              <p className="text-gray-700 mb-2">
                📍 <strong>Dirección:</strong> Jr. Amazonas 123 – Iquitos, Perú
              </p>

              <p className="text-gray-700 mb-2">
                📞 <strong>Teléfono:</strong> +51 987 654 321
              </p>

              <p className="text-gray-700 mb-2">
                ✉ <strong>Correo:</strong> boticanovasalud@gmail.com
              </p>

              <p className="text-gray-700">
                🕒 <strong>Horario:</strong> Lunes a domingo – 7am a 10pm
              </p>
            </div>

            {/* MAPA */}
            <iframe
              title="mapa"
              className="w-full h-72 rounded-xl shadow"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.885502369256!2d-73.2538333258051!3d-3.749121043264136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916decb1bdb7a777%3A0x448eea14f6c8e3f4!2sIquitos!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
