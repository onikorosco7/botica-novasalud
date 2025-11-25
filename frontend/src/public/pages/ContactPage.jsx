import PublicLayout from "../../layout/public/PublicLayout";
import { useState } from "react";
// Importamos íconos para mejorar la visualización de la información de contacto
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  User,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [submitted, setSubmitted] = useState(false); // Estado para feedback post-envío

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviarFormulario = () => {
    if (!form.nombre || !form.email || !form.mensaje) {
      alert("Completa todos los campos.");
      return;
    }

    // Aquí iría la lógica real de envío (axios.post, etc.)

    // Simulación de éxito
    setSubmitted(true);
    // Usamos el toast de React-Toastify si está disponible, si no, alert
    alert("¡Gracias por escribirnos! Pronto te responderemos.");
    setForm({ nombre: "", email: "", mensaje: "" });
    // setSubmitted(false); // Podrías resetear esto después de un tiempo si quieres que vuelvan a ver el formulario
  };

  // Componente auxiliar para un campo de contacto con ícono
  const InfoItem = ({ icon: Icon, title, content, link }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-50/50 transition">
      <div className="p-3 bg-blue-100 text-blue-700 rounded-full flex-shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-bold text-gray-800 text-lg">{title}</p>
        <a
          href={link || undefined}
          target={link && "_blank"}
          rel="noopener noreferrer"
          className={`text-gray-600 ${
            link ? "hover:text-blue-600 hover:underline" : ""
          }`}
        >
          {content}
        </a>
      </div>
    </div>
  );

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-20">
        {/* TÍTULO Y DESCRIPCIÓN */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Ponte en Contacto
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Si tienes consultas sobre productos, disponibilidad o requieres
            atención, escríbenos o utiliza nuestras vías directas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Columna 1: FORMULARIO DE MENSAJE (2/3) */}
          <div className="lg:col-span-2 bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <Send className="w-6 h-6 mr-2 text-blue-600" />
              Envíanos un mensaje directo
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                enviarFormulario();
              }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              <textarea
                name="mensaje"
                placeholder="Escribe tu consulta detallada..."
                rows="6"
                value={form.mensaje}
                onChange={handleChange}
                className="w-full p-3 mt-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-md"
              >
                Enviar mensaje
              </button>
            </form>
          </div>

          {/* Columna 2: INFORMACIÓN + ACCESO RÁPIDO (1/3) */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            {/* INFO (Mejorado con componente InfoItem) */}
            <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                Información de contacto
              </h2>

              <div className="space-y-4">
                <InfoItem
                  icon={MapPin}
                  title="Dirección"
                  content="Jr. Amazonas 123 – Iquitos, Perú"
                  link="https://maps.app.goo.gl/EjemploLink" // Reemplazar con URL real
                />
                <InfoItem
                  icon={Phone}
                  title="Llámanos"
                  content="+51 987 654 321"
                  link="tel:+51987654321"
                />
                <InfoItem
                  icon={Mail}
                  title="Correo"
                  content="boticanovasalud@gmail.com"
                  link="mailto:boticanovasalud@gmail.com"
                />
                <InfoItem
                  icon={Clock}
                  title="Horario"
                  content="Lunes a domingo – 7am a 10pm"
                />
              </div>
            </div>

            {/* WHATSAPP CTA (Destacado) */}
            <a
              href="https://wa.me/51987654321"
              target="_blank"
              rel="noreferrer"
              className="w-full p-6 bg-emerald-500 text-white rounded-2xl shadow-xl hover:bg-emerald-600 transition transform hover:scale-[1.02] font-bold text-lg flex items-center justify-center"
            >
              <MessageSquare className="w-6 h-6 mr-3" />
              WhatsApp Directo
            </a>
          </div>
        </div>

        {/* MAPA DE UBICACIÓN (Full ancho para destacar) */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Encuéntranos fácilmente
          </h2>
          <iframe
            title="Mapa de Ubicación"
            className="w-full h-[450px] rounded-2xl shadow-2xl border border-gray-300"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15915.228789324036!2d-73.250554!3d-3.754754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x918342af425c2825%3A0xc07612f0a8d4617!2sIquitos%2C%20Per%C3%BA!5e0!3m2!1ses-419!2spe!4v1620000000000!5m2!1ses-419!2spe" // URL de Google Maps de Iquitos (Ejemplo)
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </PublicLayout>
  );
}
