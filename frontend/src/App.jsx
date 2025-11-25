import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./admin/pages/LoginPage";
import Dashboard from "./admin/pages/Dashboard";
import ProductosPage from "./admin/pages/productos/ProductosPage";
import CrearProducto from "./admin/pages/productos/CrearProducto";
import EditarProducto from "./admin/pages/productos/EditarProducto";
import RegistrarVenta from "./admin/pages/ventas/RegistrarVenta";
import ReportesPage from "./admin/pages/reportes/ReportesPage";
import VentasTotales from "./admin/pages/reportes/VentasTotales";
import VentasPorFecha from "./admin/pages/reportes/VentasPorFecha";
import TopProductos from "./admin/pages/reportes/TopProductos";
import InventarioReporte from "./admin/pages/reportes/InventarioReporte";
import ProtectedRoute from "./components/ProtectedRoute";
import HistorialVentas from "./admin/pages/ventas/HistorialVentas";
import PerfilUsuario from "./admin/pages/perfil/PerfilUsuario";
import HomePage from "./public/pages/HomePage";
import CatalogoPage from "./public/pages/CatalogoPage";
import ProductDetailPage from "./public/pages/ProductDetailPage";
import ContactPage from "./public/pages/ContactPage";
import AboutPage from "./public/pages/AboutPage";
import ServicesPage from "./public/pages/ServicesPage";
import { CartProvider } from "./context/CartContext";
import CartPage from "./public/pages/CartPage";
import CheckoutPage from "./public/pages/CheckoutPage";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* RUTAS PÚBLICAS */}
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

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
    </CartProvider>
  );
}

export default App;
