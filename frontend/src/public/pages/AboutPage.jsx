import PublicLayout from "../../layout/public/PublicLayout";
// Importamos íconos de Lucide React
import {
  Target,
  Eye,
  Clock,
  Shield,
  Heart,
  Handshake,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* HERO (Se mantiene el margen negativo para la Navbar) */}     {" "}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white pt-24 pb-20 text-center px-6 shadow-xl mt-[-4rem]">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-blue-300" />   
           {" "}
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
                    Nuestra Historia y Compromiso        {" "}
        </h1>
               {" "}
        <p className="text-xl text-blue-200 max-w-3xl mx-auto font-light">
                    Somos una botica peruana comprometida con la **salud,      
              confianza** y el bienestar integral de nuestras familias y
          comunidad.        {" "}
        </p>
             {" "}
      </section>
                 {" "}
      {/* MISIÓN - VISIÓN (CORREGIDO: Usando Flexbox para una sola fila) */}   
       {" "}
      <section className="py-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                                       {" "}
        <div className="bg-white shadow-2xl rounded-2xl p-10 border-t-4 border-blue-600 flex-1">
                              <Target className="w-8 h-8 text-blue-600 mb-4" /> 
                 {" "}
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                        Nuestra Misión          {" "}
          </h2>
                                       {" "}
          <p className="text-lg text-gray-700 leading-relaxed border-l-4 pl-4 border-gray-200">
                                    Brindar productos farmacéuticos de calidad,
            garantizando             **confianza, precios accesibles y un
            servicio humano** orientado al             cuidado de la salud de
            nuestra comunidad.          {" "}
          </p>
                                   {" "}
        </div>
                               {" "}
        <div className="bg-white shadow-2xl rounded-2xl p-10 border-t-4 border-green-600 flex-1">
                              <Eye className="w-8 h-8 text-green-600 mb-4" />   
               {" "}
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                        Nuestra Visión          {" "}
          </h2>
                                       {" "}
          <p className="text-lg text-gray-700 leading-relaxed border-l-4 pl-4 border-gray-200">
                                    Convertirnos en la botica de **referencia en
            la             región**, destacando por **innovación, atención
            personalizada** y             firme compromiso social.          {" "}
          </p>
                                   {" "}
        </div>
                           {" "}
      </section>
            {/* VALORES */}     {" "}
      <section className="py-20 px-6 max-w-7xl mx-auto">
               {" "}
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
                    Pilares de Nuestro Servicio        {" "}
        </h2>
               {" "}
        <div className="grid md:grid-cols-3 gap-8">
                   {" "}
          <ValorCard
            title="Responsabilidad"
            text="Actuamos con ética y total compromiso en cada atención farmacéutica."
            icon={Handshake}
            color="text-blue-600"
          />
                   {" "}
          <ValorCard
            title="Calidad"
            text="Garantizamos productos y medicamentos seguros, originales y confiables."
            icon={Shield}
            color="text-green-600"
          />
                   {" "}
          <ValorCard
            title="Servicio Humano"
            text="Atención cálida, cercana y genuinamente enfocada en el bienestar del paciente."
            icon={Heart}
            color="text-red-500"
          />
                 {" "}
        </div>
             {" "}
      </section>
            {/* LLAMADO A CONTACTO (CTA) */}     {" "}
      <section className="py-16 px-6 bg-blue-900 text-white shadow-inner">
               {" "}
        <div className="max-w-4xl mx-auto text-center">
                   {" "}
          <h2 className="text-3xl font-extrabold mb-4">
            ¿Tienes dudas o necesitas ayuda?
          </h2>
                   {" "}
          <p className="text-blue-100 mb-8 text-lg">
                        Nuestro equipo farmacéutico está listo para asistirte
            con tu pedido o consulta.          {" "}
          </p>
                   {" "}
          <a
            href="/contacto"
            className="inline-flex items-center bg-white text-blue-700 font-bold text-lg px-8 py-3 rounded-xl shadow-2xl hover:bg-gray-100 transition transform hover:scale-[1.05]"
          >
                        Contáctanos Ahora            {" "}
            <ArrowRight className="w-5 h-5 ml-2" />         {" "}
          </a>
                 {" "}
        </div>
             {" "}
      </section>
         {" "}
    </PublicLayout>
  );
}

// Componente para los Valores (Mejora: reutilizable y visual)
function ValorCard({ title, text, icon: Icon, color }) {
  return (
    <div className="bg-white shadow-lg p-8 rounded-2xl text-center border-t-4 border-blue-200 hover:shadow-xl transition duration-300">
      <div
        className={`mx-auto w-16 h-16 rounded-full ${color} bg-opacity-10 flex items-center justify-center mb-4`}
      >
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
      <h3 className="text-xl font-extrabold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-base">{text}</p>
    </div>
  );
}
