import PublicLayout from "../../layout/public/PublicLayout";
// Importamos íconos de Lucide React
import {
  Pill,
  BookOpen,
  Truck,
  Heart,
  ArrowRight,
  Clipboard,
  ChevronRight,
} from "lucide-react";

export default function ServicesPage() {
  // Mapeo de Servicios (Mejora: Estructura de datos para facilitar la gestión)
  const serviceList = [
    {
      icon: Pill,
      title: "Venta de Medicamentos",
      text: "Amplio stock de medicamentos genéricos y de marca. Garantizamos calidad, registro sanitario y precios accesibles.",
      color: "text-blue-600",
    },
    {
      icon: BookOpen,
      title: "Orientación Farmacéutica",
      text: "Farmacéuticos capacitados brindan información clara y confiable sobre tratamientos y el uso adecuado de tus medicamentos.",
      color: "text-green-600",
    },
    {
      icon: Truck,
      title: "Entrega Rápida a Domicilio",
      text: "Recibe tus medicamentos sin salir de casa. Servicio de entrega rápido, seguro y confiable.",
      color: "text-orange-500",
    },
    {
      icon: Heart,
      title: "Monitoreo de Signos Vitales",
      text: "Servicio complementario de toma de presión arterial y glucosa para monitorear tu salud con personal capacitado.",
      color: "text-red-500",
    },
    {
      icon: Clipboard,
      title: "Control de Recetas Médicas",
      text: "Asistencia en el seguimiento y dosificación de medicamentos prescritos, asegurando el cumplimiento del tratamiento.",
      color: "text-indigo-600",
    },
  ];

  // Componente de Tarjeta de Servicio
  const ServiceCard = ({ icon: Icon, title, text, color }) => (
    <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 transition duration-300 transform hover:-translate-y-1">
      <div
        className={`w-14 h-14 rounded-full ${color} bg-opacity-10 flex items-center justify-center mb-4`}
      >
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      <h3 className="text-xl font-extrabold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-base">{text}</p>
    </div>
  );

  return (
    <PublicLayout>
            {/* HERO (Estética mejorada) */}     {" "}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-24 text-center px-6 shadow-xl mt-[-4rem]">
        {" "}
               {" "}
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
                    Servicios al Cliente        {" "}
        </h1>
               {" "}
        <p className="text-xl text-blue-200 max-w-3xl mx-auto font-light">
                    En Botica NovaSalud ofrecemos **atención especializada** y
          servicios enfocados en el bienestar integral de tu familia.        {" "}
        </p>
             {" "}
      </section>
            {/* LISTA DE SERVICIOS */}     {" "}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-12">
          Lo que hacemos por ti
        </h2>
               {" "}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                   {" "}
          {serviceList.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              text={service.text}
              color={service.color}
            />
          ))}
                 {" "}
        </div>
             {" "}
      </section>
            {/* CTA (Más llamativo) */}     {" "}
      <section className="py-20 px-6 text-center bg-green-600 text-white shadow-xl">
               {" "}
        <h2 className="text-3xl font-extrabold mb-4">
          ¡Tu salud es nuestra prioridad!
        </h2>
               {" "}
        <p className="text-green-100 mb-8 text-xl">
                    Llámanos o escríbenos por WhatsApp para recibir atención de
          nuestros farmacéuticos.        {" "}
        </p>
               {" "}
        <a
          href="/contacto"
          className="inline-flex items-center bg-white text-green-700 font-bold text-lg px-8 py-3 rounded-xl shadow-2xl hover:bg-gray-100 transition transform hover:scale-[1.05]"
        >
                    Contactar y Pedir          {" "}
          <ChevronRight className="w-5 h-5 ml-2" />       {" "}
        </a>
             {" "}
      </section>
         {" "}
    </PublicLayout>
  );
}
