import { useState } from "react";
import AdminLayout from "../../../layout/Admin/AdminLayout";
import axios from "axios";
import LoaderOverlay from "../../../components/ui/LoaderOverlay";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
// Importamos íconos para mejorar la interfaz
import { User, Mail, Key, Shield, Lock, Repeat, ArrowLeft } from "lucide-react";

export default function PerfilUsuario() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user.rol
    ? user.rol.charAt(0).toUpperCase() + user.rol.slice(1)
    : "Usuario";

  const [showChangePass, setShowChangePass] = useState(false);
  const [passwords, setPasswords] = useState({
    actual: "",
    nueva: "",
    repetir: "",
  });

  const [loading, setLoading] = useState(false);
  const [passErrors, setPassErrors] = useState({}); // Nuevo estado para errores de validación local

  // Función de validación local del formulario de contraseña
  const validatePasswordForm = () => {
    let errors = {};
    let isValid = true;

    if (!passwords.actual) {
      errors.actual = "Ingresa tu contraseña actual.";
      isValid = false;
    }
    if (passwords.nueva.length < 6) {
      errors.nueva = "Debe tener al menos 6 caracteres.";
      isValid = false;
    }
    if (passwords.nueva !== passwords.repetir) {
      errors.repetir = "Las contraseñas nuevas no coinciden.";
      isValid = false;
    }

    setPassErrors(errors);
    return isValid;
  };

  const cambiarPassword = async () => {
    if (!validatePasswordForm()) {
      toast.warning("Revisa los errores del formulario.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.put(
        "http://localhost:4000/api/usuarios/cambiar-password",
        {
          id: user.id,
          password_actual: passwords.actual,
          password_nueva: passwords.nueva,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );

      toast.success(res.data.message);

      // Limpieza y cierre
      setShowChangePass(false);
      setPasswords({ actual: "", nueva: "", repetir: "" });
      setPassErrors({});
    } catch (error) {
      // Manejar error de backend (ej. contraseña actual incorrecta)
      const message =
        error.response?.data?.message ||
        "Error al cambiar la contraseña. Verifica tu clave actual.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el cambio en los inputs y limpiar errores asociados
  const handlePassChange = (e, field) => {
    setPasswords({ ...passwords, [field]: e.target.value });
    setPassErrors((prev) => ({
      ...prev,
      [field]: null,
      repetir: prev.repetir,
    })); // Limpiamos errores al escribir
  };

  return (
    <>
      {loading && <LoaderOverlay text="Actualizando contraseña..." />}

      <AdminLayout>
        {/* Encabezado */}
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800 flex items-center border-b pb-4">
          <User className="w-7 h-7 mr-3 text-blue-600" />
          Mi Perfil y Seguridad
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl border border-gray-100"
        >
          {/* Bloque de Información del Usuario */}
          <div className="flex items-center gap-6 mb-8 border-b pb-6">
            <img
              src={`https://ui-avatars.com/api/?name=${user.nombre}&background=0D8ABC&color=fff&size=128&bold=true`}
              alt="perfil"
              className="w-28 h-28 rounded-full shadow-lg border-4 border-blue-100"
            />

            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                {user.nombre}
              </h2>
              <div className="flex items-center mt-1">
                <Shield className="w-5 h-5 mr-1 text-green-600" />
                <p className="text-lg font-semibold text-green-700">
                  {userRole}
                </p>
              </div>
            </div>
          </div>

          {/* Detalles (Estructura de tarjetas de datos) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="text-gray-500 text-sm mb-1 flex items-center">
                <Mail className="w-4 h-4 mr-2" /> Correo electrónico
              </p>
              <p className="font-semibold text-gray-800">{user.email}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="text-gray-500 text-sm mb-1 flex items-center">
                <Key className="w-4 h-4 mr-2" /> ID de usuario
              </p>
              <p className="font-semibold text-gray-800">#{user.id}</p>
            </div>
          </div>

          {/* Botón cambiar contraseña */}
          <button
            onClick={() => {
              setShowChangePass(!showChangePass);
              setPassErrors({}); // Limpiar errores al cerrar/abrir
            }}
            className="inline-flex items-center bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
          >
            {showChangePass ? (
              <ArrowLeft className="w-5 h-5 mr-2" />
            ) : (
              <Lock className="w-5 h-5 mr-2" />
            )}
            {showChangePass ? "Cancelar Cambio" : "Cambiar Contraseña"}
          </button>

          {/* Formulario cambiar contraseña (Mejorado) */}
          {showChangePass && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-lg space-y-4"
            >
              <h3 className="text-lg font-bold text-blue-800 mb-4 border-b pb-2">
                Actualizar Contraseña
              </h3>

              {/* Input: Contraseña actual */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="Contraseña actual"
                  value={passwords.actual}
                  className={`w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 transition ${
                    passErrors.actual ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={(e) => handlePassChange(e, "actual")}
                  disabled={loading}
                />
                {passErrors.actual && (
                  <p className="text-red-600 text-sm mt-1">
                    {passErrors.actual}
                  </p>
                )}
              </div>

              {/* Input: Nueva contraseña */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="Nueva contraseña (mínimo 6 caracteres)"
                  value={passwords.nueva}
                  className={`w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 transition ${
                    passErrors.nueva ? "border-red-500" : "border-gray-300"
                  }`}
                  onChange={(e) => handlePassChange(e, "nueva")}
                  disabled={loading}
                />
                {passErrors.nueva && (
                  <p className="text-red-600 text-sm mt-1">
                    {passErrors.nueva}
                  </p>
                )}
              </div>

              {/* Input: Repetir nueva contraseña */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="Repetir nueva contraseña"
                  value={passwords.repetir}
                  className={`w-full p-3 border rounded-xl shadow-sm focus:ring-2 transition ${
                    passErrors.repetir
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  onChange={(e) => handlePassChange(e, "repetir")}
                  disabled={loading}
                />
                {passErrors.repetir && (
                  <p className="text-red-600 text-sm mt-1">
                    {passErrors.repetir}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={cambiarPassword}
                  disabled={loading}
                  className={`inline-flex items-center px-6 py-3 rounded-xl text-white font-bold transition duration-300 shadow-md ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  <Repeat className="w-5 h-5 mr-2" />
                  {loading ? "Actualizando..." : "Confirmar Cambio"}
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AdminLayout>
    </>
  );
}
