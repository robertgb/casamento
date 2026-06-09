import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Heart, HomeIcon } from "lucide-react";

import { initialWeddingDetails } from "../config/geral";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Página não encontrada — Robert & Millena</title>
      </Helmet>

      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center px-4 text-center">
        <Heart
          size={48}
          className="text-primary-300 fill-primary-300 mb-6 animate-pulse-soft"
        />
        <p className="font-script text-3xl text-primary-500 mb-2">
          {initialWeddingDetails.coupleName}
        </p>
        <h1 className="text-5xl font-serif font-bold text-neutral-800 mb-2">
          404
        </h1>
        <p className="text-neutral-500 mb-8 max-w-sm">
          Essa página não existe, mas nossa história de amor existe! Volte para
          o início.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors shadow-md shadow-primary-900/20"
        >
          <HomeIcon size={18} />
          Voltar para o início
        </Link>
      </div>
    </>
  );
}
