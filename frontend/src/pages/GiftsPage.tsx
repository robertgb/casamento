import { Helmet } from "react-helmet-async";

import GiftList from "../components/gifts/GiftList";
import Layout from "../components/layout/Layout";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function GiftsPage() {
  const headerRef = useScrollAnimation<HTMLDivElement>();

  return (
    <Layout>
      <Helmet>
        <title>Lista de Presentes — Robert & Millena</title>
        <meta
          name="description"
          content="Veja a lista de presentes de Robert e Millena. Reserve um presente para o casal ou contribua com um PIX."
        />
      </Helmet>

      <div className="bg-neutral-50 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div ref={headerRef} className="reveal reveal-up text-center mb-12">
              <p className="font-script text-3xl text-primary-500 mb-2">
                Celebre conosco
              </p>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-800 mb-4">
                Lista de Presentes
              </h1>
              <p className="text-neutral-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Sua presença no nosso casamento já é um presente! Mas se você
                deseja nos presentear, selecionamos alguns itens que nos
                ajudarão a começar nossa vida juntos.
              </p>
              <div className="flex items-center justify-center gap-3 mt-6 text-neutral-400">
                <div className="h-px w-12 bg-current opacity-30" />
                <span className="text-primary-400">♥</span>
                <div className="h-px w-12 bg-current opacity-30" />
              </div>
            </div>

            <GiftList />
          </div>
        </div>
      </div>
    </Layout>
  );
}
