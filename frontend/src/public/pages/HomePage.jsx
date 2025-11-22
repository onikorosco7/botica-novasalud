// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import PublicLayout from "../../layout/public/PublicLayout";

export default function HomePage() {
  // Productos de ejemplo por ahora (luego podemos conectarlo al backend)
  const destacados = [
    {
      id: 1,
      nombre: "Paracetamol 500 mg",
      descripcion: "Alivio rápido del dolor y la fiebre.",
      precio: 5.9,
    },
    {
      id: 2,
      nombre: "Ibuprofeno 400 mg",
      descripcion: "Antiinflamatorio y analgésico de amplio uso.",
      precio: 8.5,
    },
    {
      id: 3,
      nombre: "Vitamina C 1 g",
      descripcion: "Refuerza el sistema inmunológico.",
      precio: 12.0,
    },
  ];

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          {/* Texto */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-200 mb-3">
              BOTICA NOVASALUD
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Salud, confianza y atención profesional
            </h1>
            <p className="mt-4 text-blue-100 text-sm md:text-base">
              En Botica NovaSalud encuentras medicamentos de calidad,
              orientación farmacéutica y un servicio cercano para cuidar lo
              más importante: tu bienestar y el de tu familia.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/catalogo"
                className="inline-flex justify-center px-6 py-3 rounded-lg bg-white text-blue-800 font-semibold text-sm shadow hover:bg-blue-50 transition"
              >
                Ver catálogo de productos
              </Link>
              <a
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center px-6 py-3 rounded-lg border border-blue-200 text-white text-sm font-semibold hover:bg-blue-800/40 transition"
              >
                Consultar por WhatsApp
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-blue-100">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Atención farmacéutica profesional
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Productos originales y seguros
              </span>
            </div>
          </div>

          {/* Imagen simple (puedes reemplazarla por una real en /public) */}
          <div className="relative">
            <div className="rounded-3xl bg-white/10 border border-blue-300/30 p-6 backdrop-blur flex flex-col gap-4 shadow-2xl">
              <div className="h-40 rounded-2xl bg-gradient-to-br from-sky-100 to-blue-50 border border-blue-100 flex items-center justify-center">
                <p className="text-blue-800 font-semibold text-center px-6">
                  “Tu salud, nuestra prioridad.  
                  Siempre cerca cuando más nos necesitas.”
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-xs text-blue-100">
                <div className="p-3 rounded-xl bg-blue-900/40 border border-blue-600/40">
                  <p className="font-semibold text-base">+500</p>
                  <p>Productos</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-900/40 border border-blue-600/40">
                  <p className="font-semibold text-base">24/7</p>
                  <p>Atención online</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-900/40 border border-blue-600/40">
                  <p className="font-semibold text-base">100%</p>
                  <p>Confianza</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Productos destacados
            </h2>
            <p className="text-sm text-slate-500">
              Algunos de los medicamentos más consultados por nuestros clientes.
            </p>
          </div>
          <Link
            to="/catalogo"
            className="text-sm text-blue-700 font-semibold hover:underline"
          >
            Ver todo el catálogo
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {destacados.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md hover:-translate-y-1 transition"
            >
              <p className="text-xs text-emerald-600 font-semibold mb-1">
                Recomendado
              </p>
              <h3 className="font-semibold text-slate-900">{p.nombre}</h3>
              <p className="text-sm text-slate-500 mt-1">{p.descripcion}</p>
              <p className="mt-4 text-lg font-bold text-blue-700">
                S/. {p.precio.toFixed(2)}
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

      {/* POR QUÉ ELEGIRNOS */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
              ¿Por qué elegir Botica NovaSalud?
            </h2>
            <p className="text-sm text-slate-500">
              Combinamos experiencia, atención profesional y tecnología para
              ofrecerte un servicio cercano, seguro y confiable.
            </p>
          </div>

          <div className="space-y-4 md:col-span-2">
            <FeatureItem
              title="Atención farmacéutica profesional"
              text="Te orientamos en el uso adecuado de tus medicamentos y resolvemos tus dudas con un trato humano."
            />
            <FeatureItem
              title="Productos originales y autorizados"
              text="Trabajamos con laboratorios confiables y productos con registro sanitario."
            />
            <FeatureItem
              title="Servicio rápido y cercano"
              text="Respondemos tus consultas por WhatsApp y preparamos tus pedidos para que pierdas menos tiempo."
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">
          Lo que dicen nuestros clientes
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Testimonio
            nombre="María G."
            texto="Siempre encuentro mis medicamentos y me explican con calma cómo tomarlos. Muy recomendados."
          />
          <Testimonio
            nombre="Carlos R."
            texto="Atención rápida y amable. Me ayudan a comparar opciones y encontrar lo mejor para mi bolsillo."
          />
          <Testimonio
            nombre="Lucía P."
            texto="Se nota que les importa la salud del paciente, no solo vender. Confío mucho en su equipo."
          />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">
              ¿Necesitas un medicamento o una consulta rápida?
            </h2>
            <p className="text-sm text-blue-100 mt-1">
              Escríbenos por WhatsApp y te ayudamos a encontrar la mejor opción
              para ti.
            </p>
          </div>
          <a
            href="https://wa.me/51999999999"
            target="_blank"
            rel="noreferrer"
            className="inline-flex px-6 py-3 rounded-lg bg-emerald-500 text-sm font-semibold shadow hover:bg-emerald-600 transition"
          >
            Hablar con un asesor
          </a>
        </div>
      </section>
    </PublicLayout>
  );
}

// Componentes pequeños para mantener limpio
function FeatureItem({ title, text }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 w-2 h-2 rounded-full bg-blue-600" />
      <div>
        <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
        <p className="text-sm text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function Testimonio({ nombre, texto }) {
  return (
    <article className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <p className="text-amber-500 mb-2">★★★★★</p>
      <p className="text-sm text-slate-600">{texto}</p>
      <p className="mt-3 text-sm font-semibold text-slate-900">{nombre}</p>
    </article>
  );
}
