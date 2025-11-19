import { useState } from "react";
import { crearProducto } from "../../services/productService";
import AdminLayout from "../../layout/Admin/AdminLayout";
import { toast } from "react-toastify";
import LoaderOverlay from "../../components/ui/LoaderOverlay";

export default function CrearProducto() {
  const [form, setForm] = useState({
    nombre: "",
    laboratorio: "",
    precio: "",
    stock: "",
    stock_minimo: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // VALIDACIONES
  const validar = () => {
    let nuevosErrores = {};

    // Solo letras para nombre y laboratorio
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;

    if (!form.nombre || !soloLetras.test(form.nombre)) {
      nuevosErrores.nombre = "El nombre solo debe contener letras.";
    }

    if (!form.laboratorio || !soloLetras.test(form.laboratorio)) {
      nuevosErrores.laboratorio = "El laboratorio solo debe contener letras.";
    }

    // Solo números para precio, stock y stock_minimo
    const soloNumero = /^[0-9]+(\.[0-9]+)?$/;

    if (!soloNumero.test(form.precio)) {
      nuevosErrores.precio = "El precio debe ser un número válido.";
    }

    if (!soloNumero.test(form.stock)) {
      nuevosErrores.stock = "El stock debe ser un número.";
    }

    if (!soloNumero.test(form.stock_minimo)) {
      nuevosErrores.stock_minimo = "El stock mínimo debe ser un número.";
    }

    setErrors(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardar = async () => {
    if (!validar()) return;

    setLoading(true);

    try {
      await crearProducto(form);
      toast.success("Producto creado exitosamente.");

      setTimeout(() => {
        window.location.href = "/productos";
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoaderOverlay text="Guardando producto..." />}

      <AdminLayout>
        <h1 className="text-2xl font-bold mb-6">Crear Producto</h1>

        <div className="bg-white p-6 rounded shadow w-96">

          {/* CAMPO NOMBRE */}
          <label className="font-semibold">Nombre:</label>
          <input
            name="nombre"
            placeholder="Paracetamol"
            onChange={handleChange}
            className={`w-full p-2 mb-2 border rounded ${
              errors.nombre ? "border-red-500 bg-red-50" : ""
            }`}
          />
          {errors.nombre && (
            <p className="text-red-600 text-sm mb-2">{errors.nombre}</p>
          )}

          {/* CAMPO LABORATORIO */}
          <label className="font-semibold">Laboratorio:</label>
          <input
            name="laboratorio"
            placeholder="Bayer"
            onChange={handleChange}
            className={`w-full p-2 mb-2 border rounded ${
              errors.laboratorio ? "border-red-500 bg-red-50" : ""
            }`}
          />
          {errors.laboratorio && (
            <p className="text-red-600 text-sm mb-2">{errors.laboratorio}</p>
          )}

          {/* CAMPO PRECIO */}
          <label className="font-semibold">Precio (S/.):</label>
          <input
            name="precio"
            placeholder="10.50"
            onChange={handleChange}
            className={`w-full p-2 mb-2 border rounded ${
              errors.precio ? "border-red-500 bg-red-50" : ""
            }`}
          />
          {errors.precio && (
            <p className="text-red-600 text-sm mb-2">{errors.precio}</p>
          )}

          {/* CAMPO STOCK */}
          <label className="font-semibold">Stock:</label>
          <input
            name="stock"
            placeholder="50"
            onChange={handleChange}
            className={`w-full p-2 mb-2 border rounded ${
              errors.stock ? "border-red-500 bg-red-50" : ""
            }`}
          />
          {errors.stock && (
            <p className="text-red-600 text-sm mb-2">{errors.stock}</p>
          )}

          {/* CAMPO STOCK MINIMO */}
          <label className="font-semibold">Stock mínimo:</label>
          <input
            name="stock_minimo"
            placeholder="5"
            onChange={handleChange}
            className={`w-full p-2 mb-4 border rounded ${
              errors.stock_minimo ? "border-red-500 bg-red-50" : ""
            }`}
          />
          {errors.stock_minimo && (
            <p className="text-red-600 text-sm mb-2">{errors.stock_minimo}</p>
          )}

          {/* BOTÓN */}
          <button
            onClick={guardar}
            disabled={loading}
            className={`w-full py-2 rounded text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </AdminLayout>
    </>
  );
}
