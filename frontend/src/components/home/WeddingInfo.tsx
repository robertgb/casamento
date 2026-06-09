import { CalendarClock, Heart, MapPin } from "lucide-react";

import { initialWeddingDetails } from "../../config/geral";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function WeddingInfo() {
  const titleRef = useScrollAnimation<HTMLDivElement>();
  const cardsRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-20 md:py-28 bg-white" aria-labelledby="wedding-info-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div ref={titleRef} className="reveal reveal-up text-center mb-16">
            <h2
              id="wedding-info-heading"
              className="text-3xl md:text-4xl font-serif text-primary-800 section-heading"
            >
              Nosso Grande Dia
            </h2>
          </div>

          <div
            ref={cardsRef}
            className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {/* Data e Hora */}
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-neutral-50 border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors duration-300">
                <CalendarClock className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                Data e Hora
              </h3>
              <p className="text-neutral-600 font-medium">
                {initialWeddingDetails.date}
              </p>
              <p className="text-neutral-500 text-sm mt-1">
                A partir das 15:30
              </p>
            </div>

            {/* Local */}
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-neutral-50 border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors duration-300">
                <MapPin className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                Local
              </h3>
              <p className="text-neutral-600 font-medium">
                {initialWeddingDetails.venue}
              </p>
              <p className="text-neutral-500 text-sm mt-1">
                {initialWeddingDetails.address}
              </p>
            </div>

            {/* Celebração */}
            <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-neutral-50 border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors duration-300">
                <Heart className="w-7 h-7 text-primary-600 fill-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                Celebração
              </h3>
              <p className="text-neutral-600 font-medium">
                Cerimônia e Recepção
              </p>
              <p className="text-neutral-500 text-sm mt-1">
                Traje: Esporte Fino
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
