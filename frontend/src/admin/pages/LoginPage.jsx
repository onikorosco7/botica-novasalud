import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import LoaderOverlay from "../../components/ui/LoaderOverlay";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      toast.warning("Completa todos los campos");
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

      toast.success("¡Bienvenido!");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (error) {
      toast.error("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoaderOverlay text="Validando credenciales..." />}

      {/* Fondo premium */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800 p-6">

        {/* Card animado */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-lg shadow-2xl p-8 rounded-2xl w-full max-w-md border border-gray-200"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Botica <span className="text-blue-600">NovaSalud</span>
          </h2>

          {/* CAMPO EMAIL */}
          <label className="text-gray-700 font-medium">Correo</label>
          <input
            type="email"
            placeholder="ejemplo@correo.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-1 mb-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />

          {/* CAMPO PASSWORD */}
          <label className="text-gray-700 font-medium">Contraseña</label>
          <input
            type="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-1 mb-6 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />

          {/* BOTÓN LOGIN */}
          <button
            onClick={login}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Iniciar Sesión
          </button>

          {/* Pie */}
          <p className="text-center text-gray-500 text-sm mt-4">
            Sistema Administrativo – Botica NovaSalud
          </p>
        </motion.div>
      </div>
    </>
  );
}
