// src/layout/PublicLayout.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import CartFloatingButton from "../../components/CartFloatingButton";
// Importamos íconos para mejorar la interfaz (Lucide React)
import {
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  Settings,
  Phone,
  LogIn,
  Briefcase,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

export default function PublicLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = window.location.pathname;

  // Array de navegación
  const navItems = [
    { name: "Inicio", href: "/", icon: Home },
    { name: "Catálogo", href: "/catalogo", icon: BookOpen },
    { name: "Nosotros", href: "/nosotros", icon: Users },
    { name: "Servicios", href: "/servicios", icon: Settings },
    { name: "Contacto", href: "/contacto", icon: Phone },
  ];

  const NavLink = ({ item }) => {
    const isActive = currentPath === item.href;
    const baseClasses =
      "flex items-center gap-2 px-3 py-2 transition duration-200 rounded-lg";

    return (
      <Link
        to={item.href}
        className={`${baseClasses} ${
          isActive
            ? "text-white bg-blue-700 font-bold"
            : "text-slate-700 hover:bg-slate-100 hover:text-blue-600 font-medium"
        }`}
        onClick={() => setIsMenuOpen(false)} // Cerrar menú en móvil
      >
        <item.icon size={18} className="flex-shrink-0" />
        <span>{item.name}</span>
        {isActive && (
          <ChevronRight size={16} className="ml-auto flex-shrink-0" />
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm shadow-md border-b border-blue-100">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Botica NovaSalud"
              className="w-9 h-9 object-contain"
            />
            <div className="leading-tight hidden sm:block">
              <p className="font-extrabold text-lg text-slate-900">NovaSalud</p>
              <p className="text-xs text-slate-500 -mt-1">
                Tu salud, nuestra prioridad
              </p>
            </div>
          </Link>

          {/* MENÚ DE ESCRITORIO */}
          <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-lg transition duration-200 ${
                  currentPath === item.href
                    ? "text-blue-700 font-bold"
                    : "hover:bg-slate-100 hover:text-blue-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* BOTONES DE ACCIÓN (Derecha) */}
          <div className="flex items-center gap-3">
            {/* BOTÓN ADMIN (para ti) */}
            <Link
              to="/login"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-md"
            >
              <LogIn size={16} className="mr-1" />
              Acceso Admin
            </Link>

            {/* Botón de Menú Móvil */}
            <button
              className="md:hidden text-slate-700 p-2 rounded-lg hover:bg-slate-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* MENÚ MÓVIL (Colapsable) */}
      <div
        className={`md:hidden absolute top-[60px] left-0 right-0 z-20 bg-white shadow-xl transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100 p-4" : "max-h-0 opacity-0 p-0"
        }`}
      >
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
          <hr className="my-2 border-slate-100" />
          <Link
            to="/login"
            className="flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            <LogIn size={16} className="mr-2" />
            Acceso Administrador
          </Link>
        </nav>
      </div>

      {/* CONTENIDO */}
      <main className="flex-1 relative">{children}</main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-slate-300 bg-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 py-8 text-sm text-slate-600 flex flex-col md:flex-row justify-between gap-6">
          {/* Copyright y marca */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <p className="font-semibold text-slate-800">Botica NovaSalud</p>
            <p className="mt-1">
              © {new Date().getFullYear()}. Todos los derechos reservados.
            </p>
          </div>

          {/* Información de Contacto */}
          <div className="order-1 md:order-2 flex flex-col md:flex-row gap-6 md:gap-10 text-center md:text-left">
            <div>
              <p className="font-semibold text-slate-800">Horario</p>
              <p className="mt-1 text-slate-600">Lun–Sab: 8:00 a 22:00</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Llámanos</p>
              <p className="mt-1 text-slate-600">(01) 999-999-999</p>
            </div>
          </div>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE CARRITO */}
      <CartFloatingButton />

      {/* BOTÓN WHATSAPP FLOTANTE (Mejorado visualmente) */}
      <a
        href="https://wa.me/51999999999"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-20 md:bottom-8 md:right-20 w-14 h-14 rounded-full bg-emerald-500 shadow-xl flex items-center justify-center text-white text-2xl hover:bg-emerald-600 transition transform hover:scale-110 duration-200 z-40"
        aria-label="WhatsApp Botica NovaSalud"
      >
        <MessageSquare size={26} />
      </a>
    </div>
  );
}
