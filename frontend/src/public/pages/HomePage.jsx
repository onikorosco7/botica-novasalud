// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PublicLayout from "../../layout/public/PublicLayout";
import { getDestacadosPublic } from "../../services/productPublicService";
// Importamos íconos para mejorar la presentación
import {
  MessageSquare,
  ShoppingBag,
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Award,
} from "lucide-react";

export default function HomePage() {
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true); // <--- 1. ESTADO LOADING AÑADIDO
  const IMG_BASE_URL = "http://localhost:4000/uploads/";

  useEffect(() => {
    const cargar = async () => {
      setLoading(true); // Iniciamos carga
      try {
        const data = await getDestacadosPublic();
        setDestacados(data);
      } catch (error) {
        console.error("Error cargando destacados:", error);
        // Manejo de error si es necesario
      } finally {
        setLoading(false); // Finalizamos carga
      }
    };
    cargar();
  }, []);

  // Skeleton Loader para Productos Destacados (Mejora UX)
  const ProductSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg border p-5 animate-pulse">
      <div className="h-28 bg-gray-200 rounded-xl mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
      <div className="h-5 bg-blue-200 rounded w-1/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  return (
    <PublicLayout>
            {/* HERO (Mejorado visualmente) */}      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white mt-[-3.5rem] min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-0 grid md:grid-cols-2 gap-10 items-center w-full">
          {/* Texto principal */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-200 mb-3">
              BOTICA NOVASALUD
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Salud, confianza y atención profesional
            </h1>

            {/* Subtagline agregado */}
            <p className="text-blue-200 mt-2 text-sm md:text-base">
              Atención rápida, medicamentos confiables y servicio humano.
            </p>

            <p className="mt-4 text-blue-100 text-sm md:text-base">
              En Botica NovaSalud encuentras medicamentos de calidad y atención
              cercana.
            </p>

            {/* Badges de confianza */}
            <div className="flex gap-4 mt-6">
              <div className="bg-white/10 px-4 py-2 rounded-lg border border-blue-300/20 text-blue-100 text-xs">
                ✔ Atención 24/7
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg border border-blue-300/20 text-blue-100 text-xs">
                ✔ Medicamentos garantizados
              </div>
            </div>

            {/* Botones */}
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

          {/* Imagen derecha */}
          <div className="relative hidden md:flex justify-center items-center">
            <div className="w-full h-[28rem] bg-white/10 rounded-3xl border border-blue-300/30 p-8 shadow-2xl flex items-center justify-center relative overflow-hidden">
              {/* Glow moderno */}
              <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-3xl"></div>

              <img
                src="/logo.png"
                alt="Salud"
                className="w-60 h-60 opacity-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain"
              />

              <p className="text-blue-50 text-2xl font-light italic z-10 text-center animate-[pulse_6s_ease-in-out_infinite]">
                “Tu bienestar es nuestro compromiso diario.”
              </p>
            </div>
          </div>
        </div>
      </section>
            {/* PRODUCTOS DESTACADOS */}     {" "}
      <section className="max-w-7xl mx-auto px-4 py-16">
               {" "}
        <div className="flex items-end justify-between mb-8 border-b pb-3 border-slate-200">
                   {" "}
          <div>
                       {" "}
            <h2 className="text-3xl font-extrabold text-slate-900">
                            Destacados de la Semana            {" "}
            </h2>
                       {" "}
            <p className="text-base text-slate-500 mt-1">
                            Los productos mejor valorados por nuestros clientes.
                         {" "}
            </p>
                     {" "}
          </div>
                   {" "}
          <Link
            to="/catalogo"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition flex items-center"
          >
            Ver catálogo completo
            <ArrowRight className="w-4 h-4 ml-1" />         {" "}
          </Link>
                 {" "}
        </div>
               {" "}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                   {" "}
          {/* Mostrar Skeleton mientras carga (CORREGIDO: Usamos 'loading' aquí) */}
          {loading
            ? [...Array(4)].map((_, i) => <ProductSkeleton key={i} />)
            : destacados.map((p) => (
                <article
                  key={p.id}
                  className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 hover:shadow-xl transition duration-300"
                >
                               {" "}
                  <p className="text-xs text-red-500 font-bold mb-1 uppercase flex items-center">
                                    <Award className="w-4 h-4 mr-1" />         
                          Más vendido              {" "}
                  </p>
                               {" "}
                  <div className="h-28 bg-gray-50/50 flex items-center justify-center border border-slate-200 rounded-xl overflow-hidden mb-3">
                                   {" "}
                    {p.imagen ? (
                      <img
                        src={`${IMG_BASE_URL}${p.imagen}`}
                        alt={p.nombre}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-blue-600 font-semibold px-2 text-center text-sm">
                                            {p.nombre}                 {" "}
                      </span>
                    )}
                                 {" "}
                  </div>
                               {" "}
                  <p className="text-xs text-slate-500 font-medium">
                    {p.laboratorio}
                  </p>
                  <h3 className="text-base font-semibold text-slate-900 mt-1 truncate">
                    {p.nombre}
                  </h3>
                               {" "}
                  <p className="mt-3 text-xl font-bold text-green-600">
                                    S/. {Number(p.precio).toFixed(2)}           
                     {" "}
                  </p>
                               {" "}
                  <Link
                    to={`/producto/${p.id}`}
                    className="mt-3 inline-flex text-sm text-blue-600 font-medium hover:text-blue-700 hover:underline"
                  >
                                    Ver detalles              {" "}
                  </Link>
                             {" "}
                </article>
              ))}
                 {" "}
        </div>
        {/* Enlace al Catálogo si no hay destacados */}
        {!loading && destacados.length === 0 && (
          <div className="text-center py-10 bg-white rounded-xl shadow-lg border border-slate-100">
            <p className="text-lg text-slate-600 mb-4">
              No hay productos marcados como destacados en este momento.
            </p>
            <Link
              to="/catalogo"
              className="text-blue-600 font-semibold hover:underline"
            >
              Ir al catálogo completo
            </Link>
          </div>
        )}
             {" "}
      </section>
            {/* POR QUÉ ELEGIRNOS */}     {" "}
      <section className="bg-white border-y border-slate-200">
               {" "}
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-3 gap-12">
                   {" "}
          <div>
                       {" "}
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                            ¿Por qué elegir NovaSalud?            {" "}
            </h2>
                       {" "}
            <p className="text-base text-slate-600">
                            Combinamos experiencia, atención profesional y
              tecnología para               ofrecerte un servicio seguro y
              confiable.            {" "}
            </p>
                     {" "}
          </div>
                   {" "}
          <div className="space-y-6 md:col-span-2">
                       {" "}
            <FeatureItem
              title="Atención farmacéutica profesional"
              text="Te orientamos en el uso adecuado de tus medicamentos y resolvemos tus dudas con un trato humano."
              icon={Shield}
            />
                       {" "}
            <FeatureItem
              title="Productos originales y autorizados"
              text="Trabajamos con laboratorios confiables y productos con registro sanitario que garantizan tu seguridad."
              icon={CheckCircle}
            />
                       {" "}
            <FeatureItem
              title="Servicio rápido y cercano"
              text="Respondemos tus consultas por WhatsApp y preparamos tus pedidos para que pierdas menos tiempo."
              icon={Clock}
            />
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </section>
            {/* TESTIMONIOS */}     {" "}
      <section className="max-w-7xl mx-auto px-4 py-20">
               {" "}
        <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">
                    Lo que dicen nuestros clientes        {" "}
        </h2>
               {" "}
        <div className="grid md:grid-cols-3 gap-6">
                   {" "}
          <Testimonio
            nombre="María G."
            texto="Siempre encuentro mis medicamentos y me explican con calma cómo tomarlos. Muy recomendados."
          />
                   {" "}
          <Testimonio
            nombre="Carlos R."
            texto="Atención rápida y amable. Me ayudan a comparar opciones y encontrar lo mejor para mi bolsillo."
          />
                   {" "}
          <Testimonio
            nombre="Lucía P."
            texto="Se nota que les importa la salud del paciente, no solo vender. Confío mucho en su equipo."
          />
                 {" "}
        </div>
             {" "}
      </section>
            {/* CTA FINAL (WhatsApp) */}     {" "}
      <section className="bg-gradient-to-r from-emerald-600 to-green-700 text-white">
               {" "}
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
                   {" "}
          <div>
                       {" "}
            <h2 className="text-2xl md:text-3xl font-extrabold">
                            ¿Necesitas un medicamento o una consulta rápida?    
                     {" "}
            </h2>
                       {" "}
            <p className="text-base text-green-100 mt-2">
                            Escríbenos por WhatsApp; estamos listos para
              orientarte y atender tu pedido.            {" "}
            </p>
                     {" "}
          </div>
                   {" "}
          <a
            href="https://wa.me/51999999999"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-8 py-3 rounded-xl bg-white text-green-700 font-bold text-lg shadow-2xl hover:bg-gray-100 transition transform hover:scale-[1.02]"
          >
            <MessageSquare className="w-5 h-5 mr-2" />                Hablar con
            un asesor          {" "}
          </a>
                 {" "}
        </div>
             {" "}
      </section>
         {" "}
    </PublicLayout>
  );
}

// Componentes pequeños para mantener limpio

// Componente FeatureItem (Mejorado con íconos)
function FeatureItem({ title, text, icon: Icon }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
           {" "}
      <div className="p-3 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 self-start">
        <Icon className="w-6 h-6" />
      </div>
           {" "}
      <div>
               {" "}
        <h3 className="font-extrabold text-lg text-slate-900">{title}</h3>     
          <p className="text-base text-slate-600 mt-1">{text}</p>     {" "}
      </div>
         {" "}
    </div>
  );
}

// Componente Testimonio (Mejorado con diseño de tarjeta)
function Testimonio({ nombre, texto }) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 flex flex-col justify-between h-full">
           {" "}
      <div className="mb-4">
        {/* Estrellas */}       {" "}
        <p className="text-amber-500 text-xl font-bold mb-3">★★★★★</p>       {" "}
        <p className="text-base text-slate-700 italic">"{texto}"</p>
      </div>
           {" "}
      <p className="mt-4 text-sm font-extrabold text-blue-700 border-t pt-3">
        — {nombre}
      </p>
         {" "}
    </article>
  );
}
