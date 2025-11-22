import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProductosPage from "./pages/productos/ProductosPage";
import CrearProducto from "./pages/productos/CrearProducto";
import EditarProducto from "./pages/productos/EditarProducto";
import RegistrarVenta from "./pages/ventas/RegistrarVenta";
import ReportesPage from "./pages/reportes/ReportesPage";
import VentasTotales from "./pages/reportes/VentasTotales";
import VentasPorFecha from "./pages/reportes/VentasPorFecha";
import TopProductos from "./pages/reportes/TopProductos";
import InventarioReporte from "./pages/reportes/InventarioReporte";
import ProtectedRoute from "./components/ProtectedRoute";
import HistorialVentas from "./pages/ventas/HistorialVentas";
import PerfilUsuario from "./pages/perfil/PerfilUsuario";

import HomePage from "./public/pages/HomePage";
import CatalogoPage from "./public/pages/CatalogoPage";
import ProductDetailPage from "./public/pages/ProductDetailPage";
import ContactPage from "./public/pages/ContactPage";
import AboutPage from "./public/pages/AboutPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />
        <Route path="/producto/:id" element={<ProductDetailPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/nosotros" element={<AboutPage />} />

        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* RUTAS PROTEGIDAS */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/productos"
          element={
            <ProtectedRoute>
              <ProductosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/productos/crear"
          element={
            <ProtectedRoute>
              <CrearProducto />
            </ProtectedRoute>
          }
        />

        <Route
          path="/productos/editar/:id"
          element={
            <ProtectedRoute>
              <EditarProducto />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ventas"
          element={
            <ProtectedRoute>
              <RegistrarVenta />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ventas/historial"
          element={
            <ProtectedRoute>
              <HistorialVentas />
            </ProtectedRoute>
          }
        />

        {/* Reportes */}
        <Route
          path="/reportes"
          element={
            <ProtectedRoute>
              <ReportesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reportes/ventas-totales"
          element={
            <ProtectedRoute>
              <VentasTotales />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reportes/ventas-por-fecha"
          element={
            <ProtectedRoute>
              <VentasPorFecha />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reportes/top-productos"
          element={
            <ProtectedRoute>
              <TopProductos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reportes/inventario"
          element={
            <ProtectedRoute>
              <InventarioReporte />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <PerfilUsuario />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
