// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PublicLayout from "../../layout/public/PublicLayout";
import { getDestacadosPublic } from "../../services/productPublicService";

export default function HomePage() {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const data = await getDestacadosPublic();
      setDestacados(data);
    };
    cargar();
  }, []);
  return (
    <PublicLayout>
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-200 mb-3">
              BOTICA NOVASALUD
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Salud, confianza y atención profesional
            </h1>
            <p className="mt-4 text-blue-100 text-sm md:text-base">
              En Botica NovaSalud encuentras medicamentos de calidad y atención
              cercana.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/catalogo"
                className="inline-flex justify-center px-6 py-3 rounded-lg bg-white text-blue-800 font-semibold text-sm shadow hover:bg-blue-50 transition"
              >
                Ver catálogo
              </Link>
              <a
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center px-6 py-3 rounded-lg border border-blue-200 text-white text-sm font-semibold hover:bg-blue-800/40 transition"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Imagen */}
          <div className="relative">
            <div className="rounded-3xl bg-white/10 border border-blue-300/30 p-6 backdrop-blur shadow-2xl">
              <div className="h-40 rounded-2xl bg-gradient-to-br from-sky-100 to-blue-50 border flex items-center justify-center">
                <p className="text-blue-800 font-semibold text-center px-6">
                  “Tu salud, nuestra prioridad.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Productos destacados</h2>
            <p className="text-sm text-slate-500">
              Los más buscados por nuestros clientes.
            </p>
          </div>

          <Link
            to="/catalogo"
            className="text-sm text-blue-700 font-semibold hover:underline"
          >
            Ver todo
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {destacados.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-2xl p-5 border shadow-sm"
            >
              <p className="text-xs text-emerald-600 mb-1">Recomendado</p>
              <h3 className="font-semibold">{p.nombre}</h3>
              <p className="text-sm text-slate-500 mt-1">{p.laboratorio}</p>
              <p className="mt-4 text-lg font-bold text-blue-700">
                S/. {p.precio}
              </p>

              <Link
                to={`/producto/${p.id}`}
                className="mt-3 inline-block text-blue-700 hover:underline"
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
