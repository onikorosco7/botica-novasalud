import { useState } from "react";
import { crearProducto } from "../../../services/productService";
import AdminLayout from "../../../layout/Admin/AdminLayout";
import { toast } from "react-toastify";
import LoaderOverlay from "../../../components/ui/LoaderOverlay";
// Importamos íconos para el formulario
import {
  Tag,
  Factory,
  DollarSign,
  Package,
  AlertTriangle,
  Image as ImageIcon,
  PlusCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";

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

  // Imagen + preview
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);

  const validar = () => {
    let nuevosErrores = {};

    // Expresión regular mejorada para permitir letras, números y algunos símbolos comunes
    const letrasYNumeros = /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ\s\-\/\.\(\)]+$/;
    const soloNumero = /^[0-9]+(\.[0-9]+)?$/;
    const soloEntero = /^[0-9]+$/;

    // Validación de Nombre
    if (!form.nombre || form.nombre.trim().length < 2) {
      nuevosErrores.nombre = "El nombre es obligatorio (mín. 2 caracteres).";
    } else if (!letrasYNumeros.test(form.nombre)) {
      nuevosErrores.nombre = "Contiene caracteres inválidos.";
    }

    // Validación de Laboratorio
    if (!form.laboratorio || form.laboratorio.trim().length < 2) {
      nuevosErrores.laboratorio = "El laboratorio es obligatorio.";
    } else if (!letrasYNumeros.test(form.laboratorio)) {
      nuevosErrores.laboratorio = "Contiene caracteres inválidos.";
    }

    // Validación de Precio
    if (!soloNumero.test(form.precio) || Number(form.precio) <= 0) {
      nuevosErrores.precio = "Debe ser un número mayor que cero.";
    }

    // Validación de Stock
    if (!soloEntero.test(form.stock) || Number(form.stock) < 0) {
      nuevosErrores.stock = "Debe ser un número entero (>= 0).";
    }

    // Validación de Stock Mínimo
    if (!soloEntero.test(form.stock_minimo) || Number(form.stock_minimo) < 0) {
      nuevosErrores.stock_minimo = "Debe ser un número entero (>= 0).";
    } else if (Number(form.stock_minimo) > Number(form.stock)) {
      nuevosErrores.stock_minimo =
        "El stock mínimo no puede ser mayor que el stock actual.";
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Limpiar error al empezar a escribir (Mejora UX)
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  // 📌 Cuando cambia la imagen, generar preview
  const handleImagen = (e) => {
    const file = e.target.files[0];
    setImagen(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const guardar = async () => {
    if (!validar()) {
      // Mantenemos el toast.warning para alertar sobre errores
      toast.warning("Revisa los campos con error antes de guardar.");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("laboratorio", form.laboratorio);
    formData.append("precio", form.precio);
    formData.append("stock", form.stock);
    formData.append("stock_minimo", form.stock_minimo);

    if (imagen) formData.append("imagen", imagen);

    setLoading(true);

    try {
      await crearProducto(formData);
      // Mantenemos el toast de éxito
      toast.success("Producto creado exitosamente.");

      setTimeout(() => {
        window.location.href = "/productos";
      }, 800);
    } catch (error) {
      // Mantenemos el toast de error
      toast.error(
        error.response?.data?.message ||
          "Error al crear producto. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  // Componente auxiliar para renderizar los inputs con error
  const InputGroup = ({
    label,
    name,
    type = "text",
    placeholder,
    icon: Icon,
    isRequired = true,
  }) => (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="font-semibold text-gray-700 mb-1 flex items-center"
      >
        {Icon && <Icon className="w-4 h-4 mr-2 text-blue-600" />}
        {label} {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          value={form[name]}
          disabled={loading}
          className={`w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
            errors[name]
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
          }`}
        />
      </div>
      {errors[name] && (
        <p className="text-red-600 text-sm mt-1 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-1" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <>
      {/* Loader Overlay */}
      {loading && <LoaderOverlay text="Guardando producto..." />}

      <AdminLayout>
        {/* Encabezado y Navegación */}
        <div className="flex items-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center">
            <PlusCircle className="w-7 h-7 mr-3 text-green-600" />
            Crear Nuevo Producto
          </h1>
          <a
            href="/productos"
            className="ml-auto inline-flex items-center text-sm text-blue-600 font-medium hover:underline transition"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver a la lista
          </a>
        </div>

        {/* Contenedor principal del formulario */}
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              guardar();
            }}
          >
            {/* Bloque 1: Datos Básicos */}
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              Información Principal
            </h2>

            <InputGroup
              label="Nombre del Producto"
              name="nombre"
              placeholder="Paracetamol 500mg"
              icon={Tag}
            />
            <InputGroup
              label="Laboratorio / Fabricante"
              name="laboratorio"
              placeholder="Bayer S.A."
              icon={Factory}
            />

            {/* Bloque 2: Precios e Inventario */}
            <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4 border-b pb-2">
              Inventario y Precios
            </h2>

            <InputGroup
              label="Precio Unitario"
              name="precio"
              type="number"
              placeholder="10.50"
              icon={DollarSign}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputGroup
                label="Stock Actual"
                name="stock"
                type="number"
                placeholder="50"
                icon={Package}
              />
              <InputGroup
                label="Stock Mínimo (Alerta)"
                name="stock_minimo"
                type="number"
                placeholder="5"
                icon={AlertTriangle}
              />
            </div>

            {/* Bloque 3: Imagen y Preview */}
            <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4 border-b pb-2">
              Imagen del Producto
            </h2>

            <div className="mb-6 border border-dashed border-gray-300 p-4 rounded-xl flex items-center space-x-4">
              <label className="flex flex-col items-center justify-center cursor-pointer p-2 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition">
                <ImageIcon className="w-6 h-6" />
                <span className="mt-1 text-sm font-semibold">
                  Seleccionar Imagen
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagen}
                  className="hidden"
                  disabled={loading}
                />
              </label>

              {preview && (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="w-20 h-20 object-cover rounded-lg shadow-md border border-gray-200"
                  />
                </div>
              )}
              {!preview && (
                <p className="text-gray-500 text-sm">
                  Máx. 2MB, formato JPG o PNG.
                </p>
              )}
            </div>

            {/* BOTÓN GUARDAR */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-lg text-white font-bold transition duration-300 shadow-md flex items-center justify-center ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Guardando producto...
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5 mr-3" />
                  Crear Producto
                </>
              )}
            </button>
          </form>
        </div>
      </AdminLayout>
    </>
  );
}
