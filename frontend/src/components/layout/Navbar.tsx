import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";

import { initialWeddingDetails } from "../../config/geral";

const navLinks = [
  { to: "/", label: "Início" },
  { to: "/nossa-historia", label: "Nossa História" },
  { to: "/presentes", label: "Presentes" },
  { to: "/confirmar-presenca", label: "Confirmar Presença" },
];

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [scrolled, setScrolled] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    setScrolled(window.scrollY > 60);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? "navbar-blur shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            aria-label="Página inicial"
          >
            <Heart
              size={16}
              className={`transition-colors duration-300 fill-current ${
                scrolled || menuOpen
                  ? "text-primary-500"
                  : "text-white opacity-90"
              }`}
            />
            <span
              className={`font-script text-xl transition-colors duration-300 ${
                scrolled || menuOpen ? "text-primary-700" : "text-white"
              }`}
            >
              {initialWeddingDetails.coupleName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? scrolled
                      ? "text-primary-600 bg-primary-50"
                      : "text-white bg-white/20"
                    : scrolled
                      ? "text-neutral-600 hover:text-primary-600 hover:bg-primary-50"
                      : "text-white/90 hover:text-white hover:bg-white/15"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-md transition-colors duration-300 ${
              scrolled || menuOpen
                ? "text-neutral-700 hover:bg-gray-100"
                : "text-white hover:bg-white/20"
            }`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden navbar-blur border-t border-gray-100 animate-slide-down">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "text-primary-600 bg-primary-50"
                    : "text-neutral-700 hover:text-primary-600 hover:bg-primary-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
