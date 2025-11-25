import { useEffect, useState } from "react";
import {
  obtenerProducto,
  actualizarProducto,
} from "../../../services/productService";
import AdminLayout from "../../../layout/Admin/AdminLayout";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoaderOverlay from "../../../components/ui/LoaderOverlay";
// Importamos íconos (¡CORREGIDO: 'Edit' ha sido añadido!)
import {
  Tag,
  Factory,
  DollarSign,
  Package,
  AlertTriangle,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  Loader2,
  X,
  Edit,
} from "lucide-react";

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    laboratorio: "",
    precio: "",
    stock: "",
    stock_minimo: "",
    imagen: "", // 🟢 imagen actual desde BD
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const [nuevaImagen, setNuevaImagen] = useState(null); // 🟢 archivo nuevo
  const [preview, setPreview] = useState(null); // 🟢 preview nueva imagen

  // URL base para la imagen (mejor mover esto a una constante global o archivo .env)
  const IMG_BASE_URL = "http://localhost:4000/uploads/";

  // VALIDACIONES (Mejoradas)
  const validar = () => {
    let nuevosErrores = {};
    const letrasYNumeros = /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ\s\-\/\.\(\)]+$/;
    const soloNumero = /^[0-9]+(\.[0-9]+)?$/;
    const soloEntero = /^[0-9]+$/;

    // Validación de Nombre
    if (
      !form.nombre ||
      form.nombre.trim().length < 2 ||
      !letrasYNumeros.test(form.nombre)
    ) {
      nuevosErrores.nombre =
        "El nombre es obligatorio y solo debe contener letras/números.";
    }

    // Validación de Laboratorio
    if (
      !form.laboratorio ||
      form.laboratorio.trim().length < 2 ||
      !letrasYNumeros.test(form.laboratorio)
    ) {
      nuevosErrores.laboratorio =
        "El laboratorio es obligatorio y solo debe contener letras/números.";
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

  // CARGAR PRODUCTO
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await obtenerProducto(id);
        setForm({
          ...res.data,
          // Aseguramos que los números sean strings si el input es text/number
          precio: String(res.data.precio),
          stock: String(res.data.stock),
          stock_minimo: String(res.data.stock_minimo),
        });

        // No hay nueva imagen, por lo que no se necesita preview aquí, solo la imagen existente
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
    // Limpiar error al empezar a escribir (Mejora UX)
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  // 🟢 Cuando el usuario selecciona una nueva imagen
  const handleNuevaImagen = (e) => {
    const file = e.target.files[0];
    setNuevaImagen(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  // 🟢 Función para eliminar la imagen actual (UX: permite quitar la imagen sin subir una nueva)
  const handleRemoveImage = () => {
    // Si hay una preview (nueva imagen seleccionada), la quitamos
    if (nuevaImagen) {
      setNuevaImagen(null);
      setPreview(null);
    } else {
      // Si no hay nueva imagen, eliminamos la imagen de la base de datos (simulado aquí)
      setForm((prev) => ({ ...prev, imagen: "" }));
      toast.info("La imagen será eliminada al guardar los cambios.");
    }
  };

  // GUARDAR CAMBIOS
  const guardar = async () => {
    if (!validar()) {
      toast.warning("Revisa los campos con error antes de actualizar.");
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();
      // Solo enviamos los campos que queremos actualizar
      formData.append("nombre", form.nombre);
      formData.append("laboratorio", form.laboratorio);
      formData.append("precio", form.precio);
      formData.append("stock", form.stock);
      formData.append("stock_minimo", form.stock_minimo);

      // Si el campo imagen en el formulario está vacío (porque se eliminó)
      if (form.imagen === "" && !nuevaImagen) {
        formData.append("imagen", "REMOVE"); // Flag para el backend: eliminar imagen
      }

      // Si hay una nueva imagen seleccionada
      if (nuevaImagen) {
        formData.append("imagen", nuevaImagen);
      }

      await actualizarProducto(id, formData);

      toast.success("Producto actualizado exitosamente.");

      setTimeout(() => {
        navigate("/productos");
      }, 800);
    } catch (error) {
      toast.error("Error al actualizar el producto.");
    } finally {
      setSaving(false);
    }
  };

  // Componente Skeleton (mejorado)
  const SkeletonInput = () => (
    <div className="mb-4">
      <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
      <div className="h-10 bg-gray-300 rounded-xl w-full"></div>
    </div>
  );

  // Componente auxiliar para renderizar los inputs con error (reutilizado)
  const InputGroup = ({
    label,
    name,
    type = "text",
    placeholder,
    icon: Icon,
  }) => (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="font-semibold text-gray-700 mb-1 flex items-center"
      >
        {Icon && <Icon className="w-4 h-4 mr-2 text-blue-600" />}
        {label} <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          value={form[name]}
          disabled={saving}
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
      {saving && <LoaderOverlay text="Actualizando producto..." />}

      <AdminLayout>
        {/* Encabezado y Navegación */}
        <div className="flex items-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-800 flex items-center">
            <Edit className="w-7 h-7 mr-3 text-blue-600" />
            Editar Producto{" "}
            <span className="text-gray-500 ml-3 font-medium">#{id}</span>
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
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100">
          {loading ? (
            // Skeleton Loader
            <div className="grid grid-cols-2 gap-6">
              <div>
                <SkeletonInput />
                <SkeletonInput />
                <SkeletonInput />
              </div>
              <div>
                <SkeletonInput />
                <SkeletonInput />
                <SkeletonInput />
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                guardar();
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Columna 1: Datos Básicos y Precio */}
                <div>
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
                  <InputGroup
                    label="Precio Unitario"
                    name="precio"
                    type="number"
                    placeholder="10.50"
                    icon={DollarSign}
                  />
                </div>

                {/* Columna 2: Inventario e Imagen */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                    Inventario y Stock Mínimo
                  </h2>
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

                  {/* Bloque 3: Imagen y Preview (Optimizado) */}
                  <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4 border-b pb-2">
                    Imagen
                  </h2>

                  <div className="flex items-start space-x-4 mb-4">
                    <div className="flex flex-col items-center">
                      {/* Muestra la preview (si hay nueva) o la imagen de BD */}
                      {preview ? (
                        <img
                          src={preview}
                          alt="Nueva Vista Previa"
                          className="w-24 h-24 object-cover rounded-lg shadow-md border border-blue-300"
                        />
                      ) : form.imagen ? (
                        <img
                          src={`${IMG_BASE_URL}${form.imagen}`}
                          alt="Imagen Actual"
                          className="w-24 h-24 object-cover rounded-lg shadow-md border border-gray-200"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-lg text-gray-500">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )}
                      <span className="text-xs text-gray-500 mt-1">
                        {preview
                          ? "Nueva imagen"
                          : form.imagen
                          ? "Imagen actual"
                          : "Sin imagen"}
                      </span>
                    </div>

                    {/* Controles de Imagen */}
                    <div className="flex flex-col space-y-2">
                      <label className="flex items-center cursor-pointer p-2 rounded-lg text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 transition font-semibold">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        {form.imagen && !nuevaImagen
                          ? "Cambiar Imagen"
                          : "Seleccionar Imagen"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleNuevaImagen}
                          className="hidden"
                          disabled={saving}
                        />
                      </label>

                      {(form.imagen || nuevaImagen) && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          disabled={saving}
                          className="flex items-center p-2 rounded-lg text-xs text-red-600 bg-red-50 hover:bg-red-100 transition font-semibold"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Quitar Imagen
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTÓN GUARDAR */}
              <button
                type="submit"
                disabled={saving}
                className={`w-full mt-6 py-3 rounded-xl text-lg text-white font-bold transition duration-300 shadow-md flex items-center justify-center ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Guardando cambios...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-3" />
                    Guardar Cambios
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </AdminLayout>
    </>
  );
}
