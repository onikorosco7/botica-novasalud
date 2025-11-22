// src/layout/PublicLayout.jsx
import { Link } from "react-router-dom";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center text-white font-bold shadow-sm">
              BN
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-slate-900">Botica NovaSalud</p>
              <p className="text-xs text-slate-500">
                Cuidamos tu bienestar
              </p>
            </div>
          </Link>

          {/* MENÚ */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link to="/" className="hover:text-blue-700 transition">
              Inicio
            </Link>
            <Link to="/catalogo" className="hover:text-blue-700 transition">
              Catálogo
            </Link>
            <Link to="/nosotros" className="hover:text-blue-700 transition">
              Nosotros
            </Link>
            <Link to="/contacto" className="hover:text-blue-700 transition">
              Contacto
            </Link>
          </div>

          {/* BOTÓN ADMIN (para ti) */}
          <Link
            to="/login"
            className="hidden md:inline-flex px-4 py-2 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition shadow-sm"
          >
            Administrador
          </Link>
        </nav>
      </header>

      {/* CONTENIDO */}
      <main className="flex-1">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-600 flex flex-col md:flex-row justify-between gap-3">
          <p>© {new Date().getFullYear()} Botica NovaSalud. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <span>Horario: Lun–Sab 8:00 a 22:00</span>
            <span>Tel: (01) 999-999-999</span>
          </div>
        </div>
      </footer>

      {/* BOTÓN WHATSAPP FLOTANTE */}
      <a
        href="https://wa.me/51999999999"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 rounded-full bg-emerald-500 shadow-lg flex items-center justify-center text-white text-2xl hover:bg-emerald-600 transition"
        aria-label="WhatsApp Botica NovaSalud"
      >
        ✉
      </a>
    </div>
  );
}
