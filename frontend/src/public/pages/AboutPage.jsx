import PublicLayout from "../../layout/public/PublicLayout";

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 text-center px-6">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
          Sobre Nosotros
        </h1>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          Somos una botica peruana comprometida con la salud, confianza y el
          bienestar de nuestras familias.
        </p>
      </section>

      {/* MISIÓN - VISIÓN */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="bg-white shadow-md rounded-xl p-8 border">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Nuestra Misión</h2>
          <p className="text-gray-700 leading-relaxed">
            Brindar productos farmacéuticos de calidad, garantizando confianza,
            precios accesibles y un servicio humano orientado al cuidado de la salud.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-8 border">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Nuestra Visión</h2>
          <p className="text-gray-700 leading-relaxed">
            Convertirnos en la botica de referencia en la región amazónica,
            destacando por innovación, atención personalizada y compromiso social.
          </p>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuestra Historia</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Botica NovaSalud nació con el propósito de atender a las familias
            de nuestra comunidad, brindando medicamentos confiables y un trato
            cercano.  
            <br />
            Con años de experiencia, hemos construido una relación basada
            en la confianza, la responsabilidad y el compromiso por
            mejorar la calidad de vida de las personas.
          </p>
        </div>
      </section>

      {/* VALORES */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Nuestros Valores
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow p-6 rounded-lg text-center border">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Responsabilidad</h3>
            <p className="text-gray-600">
              Actuamos con ética y compromiso en cada atención.
            </p>
          </div>

          <div className="bg-white shadow p-6 rounded-lg text-center border">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Calidad</h3>
            <p className="text-gray-600">
              Garantizamos medicamentos seguros y confiables.
            </p>
          </div>

          <div className="bg-white shadow p-6 rounded-lg text-center border">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Servicio Humano</h3>
            <p className="text-gray-600">
              Atención cálida, cercana y enfocada en el bienestar.
            </p>
          </div>
        </div>
      </section>

      {/* LLAMADO A CONTACTO */}
      <section className="py-16 px-6 text-center bg-blue-700 text-white">
        <h2 className="text-3xl font-bold mb-4">¿Tienes dudas?</h2>
        <p className="text-blue-100 mb-6">
          Nuestro equipo está listo para ayudarte.
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
