import { useEffect, useState } from "react";
import {
  obtenerProducto,
  actualizarProducto,
} from "../../../services/productService";
import AdminLayout from "../../../layout/Admin/AdminLayout";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoaderOverlay from "../../../components/ui/LoaderOverlay";

export default function EditarProducto() {
  const { id } = useParams();

  const [form, setForm] = useState({
    nombre: "",
    laboratorio: "",
    precio: "",
    stock: "",
    stock_minimo: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // Skeleton loader
  const SkeletonInput = () => (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
    </div>
  );

  // VALIDACIONES
  const validar = () => {
    let nuevosErrores = {};
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
    const soloNumero = /^[0-9]+(\.[0-9]+)?$/;

    if (!soloLetras.test(form.nombre))
      nuevosErrores.nombre = "El nombre solo debe contener letras.";

    if (!soloLetras.test(form.laboratorio))
      nuevosErrores.laboratorio = "El laboratorio solo debe contener letras.";

    if (!soloNumero.test(form.precio))
      nuevosErrores.precio = "El precio debe ser un número válido.";

    if (!soloNumero.test(form.stock))
      nuevosErrores.stock = "El stock debe ser un número válido.";

    if (!soloNumero.test(form.stock_minimo))
      nuevosErrores.stock_minimo = "El stock mínimo debe ser un número válido.";

    setErrors(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  // CARGAR PRODUCTO
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await obtenerProducto(id);
        setForm(res.data);
      } catch (error) {
        toast.error("Error al cargar el producto.");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // GUARDAR CAMBIOS
  const guardar = async () => {
    if (!validar()) return;

    setSaving(true);

    try {
      await actualizarProducto(id, form);
      toast.success("Producto actualizado exitosamente.");

      setTimeout(() => {
        window.location.href = "/productos";
      }, 800);
    } catch (error) {
      toast.error("Error al actualizar el producto.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {saving && <LoaderOverlay text="Actualizando producto..." />}

      <AdminLayout>
        <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>

        <div className="bg-white p-6 rounded shadow w-96">
          {loading ? (
            <>
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
            </>
          ) : (
            <>
              {/* NOMBRE */}
              <label className="font-semibold">Nombre:</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className={`w-full p-2 mb-2 border rounded ${
                  errors.nombre ? "border-red-500 bg-red-50" : ""
                }`}
              />
              {errors.nombre && (
                <p className="text-red-600 text-sm mb-2">{errors.nombre}</p>
              )}

              {/* LABORATORIO */}
              <label className="font-semibold">Laboratorio:</label>
              <input
                name="laboratorio"
                value={form.laboratorio}
                onChange={handleChange}
                className={`w-full p-2 mb-2 border rounded ${
                  errors.laboratorio ? "border-red-500 bg-red-50" : ""
                }`}
              />
              {errors.laboratorio && (
                <p className="text-red-600 text-sm mb-2">
                  {errors.laboratorio}
                </p>
              )}

              {/* PRECIO */}
              <label className="font-semibold">Precio:</label>
              <input
                name="precio"
                value={form.precio}
                onChange={handleChange}
                className={`w-full p-2 mb-2 border rounded ${
                  errors.precio ? "border-red-500 bg-red-50" : ""
                }`}
              />
              {errors.precio && (
                <p className="text-red-600 text-sm mb-2">{errors.precio}</p>
              )}

              {/* STOCK */}
              <label className="font-semibold">Stock:</label>
              <input
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className={`w-full p-2 mb-2 border rounded ${
                  errors.stock ? "border-red-500 bg-red-50" : ""
                }`}
              />
              {errors.stock && (
                <p className="text-red-600 text-sm mb-2">{errors.stock}</p>
              )}

              {/* STOCK MINIMO */}
              <label className="font-semibold">Stock mínimo:</label>
              <input
                name="stock_minimo"
                value={form.stock_minimo}
                onChange={handleChange}
                className={`w-full p-2 mb-4 border rounded ${
                  errors.stock_minimo ? "border-red-500 bg-red-50" : ""
                }`}
              />
              {errors.stock_minimo && (
                <p className="text-red-600 text-sm mb-2">
                  {errors.stock_minimo}
                </p>
              )}

              {/* BOTÓN */}
              <button
                onClick={guardar}
                disabled={saving}
                className={`w-full py-2 rounded text-white font-semibold transition ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {saving ? "Actualizando..." : "Actualizar"}
              </button>
            </>
          )}
        </div>
      </AdminLayout>
    </>
  );
}
