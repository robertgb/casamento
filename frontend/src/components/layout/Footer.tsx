import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

import { initialWeddingDetails } from "../../config/geral";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Couple name in script font */}
          <div>
            <p className="font-script text-4xl text-primary-300 mb-1">
              {initialWeddingDetails.coupleName}
            </p>
            <p className="text-neutral-400 text-sm">
              {initialWeddingDetails.date}
            </p>
            <p className="text-neutral-500 text-xs mt-1">
              {initialWeddingDetails.venue}
            </p>
          </div>

          {/* Ornament */}
          <div className="flex items-center gap-3 text-neutral-600">
            <div className="h-px w-12 bg-neutral-700" />
            <Heart size={12} className="fill-primary-400 text-primary-400" />
            <div className="h-px w-12 bg-neutral-700" />
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-neutral-400">
            <Link
              to="/"
              className="hover:text-primary-300 transition-colors"
            >
              Início
            </Link>
            <Link
              to="/nossa-historia"
              className="hover:text-primary-300 transition-colors"
            >
              Nossa História
            </Link>
            <Link
              to="/presentes"
              className="hover:text-primary-300 transition-colors"
            >
              Presentes
            </Link>
            <Link
              to="/confirmar-presenca"
              className="hover:text-primary-300 transition-colors"
            >
              Confirmar Presença
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-neutral-600 text-xs flex items-center gap-1">
            &copy; {year} • Feito com{" "}
            <Heart size={12} className="fill-primary-500 text-primary-500" />{" "}
            para o nosso casamento
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
