import { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineBarChart,
  AiOutlineAppstore,
  AiOutlineLogout,
} from "react-icons/ai";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-blue-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center gap-2">
          <AiOutlineAppstore size={28} className="text-white" />
          {sidebarOpen && (
            <h1 className="text-xl font-bold tracking-wide">NovaSalud</h1>
          )}
        </div>

        {/* Nav Items */}
        <nav className="mt-6 flex-1">
          <a
            href="/dashboard"
            className="flex items-center gap-3 p-3 hover:bg-blue-700 transition"
          >
            <AiOutlineDashboard size={22} />
            {sidebarOpen && <span>Dashboard</span>}
          </a>

          <a
            href="/productos"
            className="flex items-center gap-3 p-3 hover:bg-blue-700 transition"
          >
            <AiOutlineAppstore size={22} />
            {sidebarOpen && <span>Productos</span>}
          </a>
          <a
            href="/ventas/historial"
            className="flex items-center gap-3 p-3 hover:bg-blue-700 transition"
          >
            <AiOutlineBarChart size={22} />
            {sidebarOpen && <span>Historial de Ventas</span>}
          </a>

          <a
            href="/ventas"
            className="flex items-center gap-3 p-3 hover:bg-blue-700 transition"
          >
            <AiOutlineShoppingCart size={22} />
            {sidebarOpen && <span>Registrar Venta</span>}
          </a>

          <a
            href="/reportes"
            className="flex items-center gap-3 p-3 hover:bg-blue-700 transition"
          >
            <AiOutlineBarChart size={22} />
            {sidebarOpen && <span>Reportes</span>}
          </a>
          <a
            href="/perfil"
            className="flex items-center gap-3 p-3 hover:bg-blue-700 transition"
          >
            <AiOutlineAppstore size={22} />
            {sidebarOpen && <span>Mi Perfil</span>}
          </a>
        </nav>

        {/* Footer User */}
        <div className="p-4 border-t border-blue-700">
          {sidebarOpen && (
            <div className="mb-3">
              <p className="font-semibold">{user?.nombre}</p>
              <p className="text-sm text-gray-300 capitalize">{user?.rol}</p>
            </div>
          )}

          <button
            onClick={logout}
            className="flex items-center gap-3 p-2 bg-red-600 hover:bg-red-700 w-full text-left rounded"
          >
            <AiOutlineLogout size={20} />
            {sidebarOpen && <span>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <button
            onClick={toggleSidebar}
            className="text-blue-900 hover:scale-110 transition"
          >
            <AiOutlineMenu size={28} />
          </button>

          <h1 className="text-lg font-bold text-blue-900">
            Panel Administrativo
          </h1>
        </header>

        {/* CONTENT */}
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
