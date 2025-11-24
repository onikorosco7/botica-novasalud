import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductoPublicById } from "../../services/productPublicService";
import PublicLayout from "../../layout/public/PublicLayout";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getProductoPublicById(id);
        setProducto(data);
      } catch (error) {
        console.error("Error cargando producto", error);
      }
    };
    cargar();
  }, [id]);

  if (!producto)
    return (
      <PublicLayout>
        <p>Cargando...</p>
      </PublicLayout>
    );

  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
        <h1 className="text-3xl font-bold mb-4">{producto.nombre}</h1>

        <p className="text-gray-700">
          <strong>Laboratorio:</strong> {producto.laboratorio}
        </p>
        <p className="text-gray-700">
          <strong>Precio:</strong> S/. {producto.precio}
        </p>
        <p className="text-gray-700">
          <strong>Stock:</strong> {producto.stock}
        </p>

        <a
          href="/catalogo"
          className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Volver al catálogo
        </a>
      </div>
    </PublicLayout>
  );
}
