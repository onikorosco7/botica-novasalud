import { useState } from "react";
// Importamos los íconos Lucide React (Mejora de UI)
import {
  Menu,
  LayoutDashboard,
  Package,
  History,
  ShoppingCart,
  BarChart4,
  User,
  LogOut,
  Briefcase, // Nuevo ícono para el logo/appstore
  Zap, // Ícono para Reportes
  ChevronRight, // Para indicar estado activo
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  // Obtenemos la ruta actual para el estado activo
  const currentPath = window.location.pathname;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // Array de navegación (Mejora: Simplifica la estructura y manejo de rutas)
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Productos", href: "/productos", icon: Package },
    { name: "Historial de Ventas", href: "/ventas/historial", icon: History },
    { name: "Registrar Venta", href: "/ventas", icon: ShoppingCart },
    { name: "Reportes", href: "/reportes", icon: BarChart4 },
    // El ítem Mi Perfil se moverá al footer, pero lo dejamos aquí si quieres que siga en el nav
    // { name: "Mi Perfil", href: "/perfil", icon: User },
  ];

  // Componente auxiliar para el ítem de navegación
  const NavItem = ({ name, href, icon: Icon }) => {
    // Determinar si la ruta actual coincide con el href
    const isActive =
      currentPath === href || (currentPath.startsWith(href) && href !== "/");

    return (
      <a
        href={href}
        className={`flex items-center gap-3 p-3 transition duration-150 relative ${
          isActive
            ? "bg-blue-700 font-semibold border-l-4 border-white/80 text-white"
            : "hover:bg-blue-700/70 text-blue-100"
        }`}
      >
        <Icon size={20} className="flex-shrink-0" />
        {sidebarOpen && <span className="text-sm">{name}</span>}

        {/* Indicador de Activo (Mejora visual) */}
        {isActive && sidebarOpen && (
          <ChevronRight size={18} className="absolute right-3 text-white" />
        )}
      </a>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* SIDEBAR */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-blue-900 text-white transition-all duration-300 flex flex-col flex-shrink-0 z-10`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center gap-3 border-b border-blue-800 h-16">
          <Briefcase size={28} className="text-white flex-shrink-0" />
          {sidebarOpen && (
            <h1 className="text-2xl font-extrabold tracking-wider">
              NovaSalud
            </h1>
          )}
        </div>

        {/* Nav Items */}
        <nav className="mt-4 flex-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </nav>

        {/* Footer User & Logout (Separado para mejor UX) */}
        <div className="p-4 border-t border-blue-700">
          {/* Item Perfil (Movido al Footer) */}
          <a
            href="/perfil"
            className={`flex items-center gap-3 p-3 mb-2 rounded-xl transition ${
              currentPath === "/perfil"
                ? "bg-blue-700 font-semibold text-white"
                : "hover:bg-blue-700/70 text-blue-100"
            }`}
          >
            <User size={20} className="flex-shrink-0" />
            {sidebarOpen && (
              <div className="truncate">
                <p className="font-semibold text-sm truncate">
                  {user?.nombre || "Cajero"}
                </p>
                <p className="text-xs text-gray-300 capitalize">
                  {user?.rol || "Invitado"}
                </p>
              </div>
            )}
          </a>

          {/* Botón de Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-3 p-3 bg-red-600 hover:bg-red-700 w-full text-left text-white rounded-xl font-semibold transition shadow-lg"
            title="Cerrar sesión"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* NAVBAR */}
        <header className="h-16 bg-white shadow-md flex items-center justify-between px-6 flex-shrink-0">
          <button
            onClick={toggleSidebar}
            className="text-blue-900 hover:scale-110 transition p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            title={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <Menu size={28} />
          </button>

          <h1 className="text-lg font-bold text-gray-800">
            Panel Administrativo
          </h1>
        </header>

        {/* CONTENT */}
        {/* Se ajustó el padding para asegurar el correcto flujo del dashboard */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
