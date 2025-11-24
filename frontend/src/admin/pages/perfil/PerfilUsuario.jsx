import { useState } from "react";
import AdminLayout from "../../../layout/Admin/AdminLayout";
import axios from "axios";
import LoaderOverlay from "../../../components/ui/LoaderOverlay";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function PerfilUsuario() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [showChangePass, setShowChangePass] = useState(false);
  const [passwords, setPasswords] = useState({
    actual: "",
    nueva: "",
    repetir: "",
  });

  const [loading, setLoading] = useState(false);

  const cambiarPassword = async () => {
    if (!passwords.actual || !passwords.nueva || !passwords.repetir) {
      toast.warning("Completa todos los campos");
      return;
    }

    if (passwords.nueva.length < 6) {
      toast.error("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (passwords.nueva !== passwords.repetir) {
      toast.error("Las contraseñas no coinciden");
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

      setShowChangePass(false);
      setPasswords({ actual: "", nueva: "", repetir: "" });
    } catch (error) {
      toast.error("Error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoaderOverlay text="Actualizando contraseña..." />}

      <AdminLayout>
        <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-8 max-w-xl border border-gray-200"
        >
          {/* Foto + Datos */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={`https://ui-avatars.com/api/?name=${user.nombre}&background=0D8ABC&color=fff&size=128`}
              alt="perfil"
              className="w-24 h-24 rounded-full shadow-md"
            />

            <div>
              <h2 className="text-2xl font-bold">{user.nombre}</h2>
              <p className="text-gray-600 capitalize">{user.rol}</p>
            </div>
          </div>

          {/* Correo */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm">Correo electrónico</p>
            <p className="font-semibold">{user.email}</p>
          </div>

          {/* ID */}
          <div className="mb-6">
            <p className="text-gray-500 text-sm">ID de usuario</p>
            <p className="font-semibold">{user.id}</p>
          </div>

          {/* Botón cambiar contraseña */}
          <button
            onClick={() => setShowChangePass(!showChangePass)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Cambiar contraseña
          </button>

          {/* Formulario cambiar contraseña */}
          {showChangePass && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 bg-gray-50 border rounded-xl p-5 shadow"
            >
              <input
                type="password"
                placeholder="Contraseña actual"
                value={passwords.actual}
                className="w-full p-2 border rounded mb-3"
                onChange={(e) =>
                  setPasswords({ ...passwords, actual: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Nueva contraseña"
                value={passwords.nueva}
                className="w-full p-2 border rounded mb-3"
                onChange={(e) =>
                  setPasswords({ ...passwords, nueva: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Repetir nueva contraseña"
                value={passwords.repetir}
                className="w-full p-2 border rounded mb-4"
                onChange={(e) =>
                  setPasswords({ ...passwords, repetir: e.target.value })
                }
              />

              <button
                onClick={cambiarPassword}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Guardar nueva contraseña
              </button>
            </motion.div>
          )}
        </motion.div>
      </AdminLayout>
    </>
  );
}
