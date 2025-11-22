import PublicLayout from "../../layout/public/PublicLayout";
import { FaPills, FaNotesMedical, FaTruckMedical, FaUserNurse } from "react-icons/fa6";

export default function ServicesPage() {
  return (
    <PublicLayout>
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 text-center px-6">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
          Nuestros Servicios
        </h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          En Botica NovaSalud ofrecemos atención personalizada y servicios enfocados en el bienestar integral de tu familia.
        </p>
      </section>

      {/* LISTA DE SERVICIOS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Servicio 1 */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg border transition">
            <FaPills className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Venta de Medicamentos</h3>
            <p className="text-gray-600 leading-relaxed">
              Amplio stock de medicamentos genéricos y de marca, garantizando calidad y precios accesibles.
            </p>
          </div>

          {/* Servicio 2 */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg border transition">
            <FaNotesMedical className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Orientación Farmacéutica</h3>
            <p className="text-gray-600 leading-relaxed">
              Farmacéuticos capacitados brindan información clara y confiable sobre tratamientos y uso adecuado de medicamentos.
            </p>
          </div>

          {/* Servicio 3 */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg border transition">
            <FaTruckMedical className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Entrega a Domicilio</h3>
            <p className="text-gray-600 leading-relaxed">
              Lleva tus medicamentos sin salir de casa. Servicio rápido, seguro y confiable.
            </p>
          </div>

          {/* Servicio 4 */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg border transition">
            <FaUserNurse className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Toma de Presión & Glucosa</h3>
            <p className="text-gray-600 leading-relaxed">
              Servicio complementario para monitorear tu salud con personal capacitado.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center bg-blue-700 text-white">
        <h2 className="text-3xl font-bold mb-4">¿Necesitas un medicamento?</h2>
        <p className="text-blue-100 mb-6">
          Visítanos o contáctanos para una atención rápida y segura.
        </p>
        <a
          href="/contacto"
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-100 transition"
        >
          Contáctanos
        </a>
      </section>
    </PublicLayout>
  );
}
