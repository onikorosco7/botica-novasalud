import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoaderOverlay from "../../components/ui/LoaderOverlay";
import { motion } from "framer-motion";
// Importamos íconos para mejorar la usabilidad del formulario
import { Mail, Lock, LogIn, Hospital, RotateCw } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      // Usar toast.error o info para mensajes importantes
      toast.error("Por favor, ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/usuarios/login", {
        email,
        password,
      });

      // Guardar token y datos del usuario
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("¡Bienvenido al sistema!");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (error) {
      toast.error("Credenciales incorrectas o usuario no encontrado.");
    } finally {
      setLoading(false);
    }
  };

  // Manejo de la pulsación de la tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && email && password && !loading) {
      login();
    }
  };

  return (
    <>
      {/* Loader Overlay (Se mantiene para una buena UX) */}
      {loading && <LoaderOverlay text="Validando credenciales..." />}

      {/* Fondo premium y centrado */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-900 p-6">
        {/* Card de Login animado y mejorado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/95 backdrop-blur-md shadow-3xl p-10 rounded-3xl w-full max-w-sm border border-gray-100 transform hover:shadow-2xl transition-shadow duration-300"
          onKeyDown={handleKeyPress} // Manejar Enter en todo el formulario
        >
          {/* Encabezado con Ícono */}
          <div className="text-center mb-8">
            <Hospital className="w-10 h-10 mx-auto text-blue-600 mb-2" />
            <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              Acceso Administrativo
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Botica{" "}
              <span className="font-semibold text-blue-700">NovaSalud</span>
            </p>
          </div>

          {/* CAMPO EMAIL */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-gray-700 font-semibold mb-1 block text-sm"
            >
              <Mail className="w-4 h-4 inline mr-1" /> Correo Electrónico
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="ejemplo@correo.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition pl-4"
                disabled={loading}
              />
            </div>
          </div>

          {/* CAMPO PASSWORD */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-gray-700 font-semibold mb-1 block text-sm"
            >
              <Lock className="w-4 h-4 inline mr-1" /> Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Ingresa tu clave"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition pl-4"
                disabled={loading}
              />
            </div>
          </div>

          {/* BOTÓN LOGIN - Mejorado con estado de carga y accesibilidad */}
          <button
            onClick={login}
            disabled={loading}
            className={`w-full py-3 rounded-xl text-lg font-bold transition duration-300 shadow-lg flex items-center justify-center ${
              loading
                ? "bg-blue-400 cursor-wait"
                : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
            }`}
          >
            {loading ? (
              <>
                <RotateCw className="w-5 h-5 mr-3 animate-spin" />
                Validando...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5 mr-3" />
                Iniciar Sesión
              </>
            )}
          </button>

          {/* Pie */}
          <p className="text-center text-gray-400 text-xs mt-6">
            © {new Date().getFullYear()} Sistema NovaSalud. Todos los derechos
            reservados.
          </p>
        </motion.div>
      </div>
    </>
  );
}
