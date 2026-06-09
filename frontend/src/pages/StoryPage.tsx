import { Helmet } from "react-helmet-async";

import Layout from "../components/layout/Layout";

import Colheita001 from "../assets/img/COL05679.jpeg";
import Colheita002 from "../assets/img/COL05746.jpeg";
import PreWedding001 from "../assets/img/DSC06766.jpg";
import PreWedding002 from "../assets/img/DSC06879.jpg";
import Photo001 from "../assets/img/PHO05377.jpeg";

import { initialWeddingDetails } from "../config/geral";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function StoryPage() {
  const headerRef = useScrollAnimation<HTMLDivElement>();
  const para1Ref = useScrollAnimation<HTMLDivElement>();
  const gridRef = useScrollAnimation<HTMLDivElement>();
  const para2Ref = useScrollAnimation<HTMLDivElement>();

  return (
    <Layout>
      <Helmet>
        <title>Nossa História — Robert & Millena</title>
        <meta
          name="description"
          content="Conheça a história de amor de Robert e Millena — como se conheceram, o pedido de noivado em Domingos Martins, e a jornada até o casamento."
        />
      </Helmet>

      <div className="bg-neutral-50 pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div ref={headerRef} className="reveal reveal-up text-center mb-12">
              <p className="font-script text-3xl text-primary-500 mb-2">
                Uma história de amor
              </p>
              <h1 className="text-4xl md:text-5xl font-serif text-neutral-800">
                Nossa História
              </h1>
              <div className="flex items-center justify-center gap-3 mt-4 text-neutral-400">
                <div className="h-px w-12 bg-current opacity-30" />
                <span className="text-primary-400">♥</span>
                <div className="h-px w-12 bg-current opacity-30" />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
              {/* First text block with photo */}
              <div ref={para1Ref} className="reveal reveal-up p-8 md:p-12">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="img-zoom flex-shrink-0 w-full sm:w-64 rounded-2xl overflow-hidden shadow-md aspect-[9/16]">
                    <img
                      src={PreWedding001}
                      alt="Casal apaixonado"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-neutral-600 leading-relaxed text-base md:text-lg mb-4">
                      {initialWeddingDetails.story}
                    </p>
                    <p className="text-neutral-600 leading-relaxed">
                      Estamos noivos! E mal podemos esperar para começar a nossa
                      vida juntos com Deus. Em breve celebraremos esse momento
                      tão especial com vocês!
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo grid */}
              <div ref={gridRef} className="reveal reveal-up px-8 md:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="img-zoom rounded-2xl overflow-hidden shadow-sm aspect-[3/4]">
                    <img
                      src={Photo001}
                      alt="Banco no lavandário"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="img-zoom rounded-2xl overflow-hidden shadow-sm aspect-[3/4]">
                    <img
                      src={PreWedding002}
                      alt="Lavandário"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="img-zoom rounded-2xl overflow-hidden shadow-sm aspect-[3/4]">
                    <img
                      src={Colheita001}
                      alt="Colheita de morangos"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Second text block with photo */}
              <div ref={para2Ref} className="reveal reveal-up p-8 md:p-12">
                <div className="flex flex-col sm:flex-row-reverse gap-6 items-start">
                  <div className="img-zoom flex-shrink-0 w-full sm:w-64 rounded-2xl overflow-hidden shadow-md aspect-[9/14]">
                    <img
                      src={Colheita002}
                      alt="Momentos do casal"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-neutral-600 leading-relaxed text-base md:text-lg mb-4">
                      Em um passeio inesquecível a Domingos Martins, nossa
                      jornada ganhou um novo e belo significado. Desfrutamos da
                      colheita de morangos e nos perdemos na beleza do
                      lavandário, com seus campos roxos e perfume adocicado. Foi
                      debaixo de uma árvore, com a natureza como nossa
                      testemunha, que fiz a pergunta que mudaria nossas vidas
                      para sempre.
                    </p>

                    <p className="text-neutral-600 leading-relaxed">
                      O "sim" dela fez daquele momento a memória mais linda que
                      levaremos para sempre. Agora, com o coração cheio de
                      alegria, compartilhamos o nosso noivado e em breve
                      celebraremos essa jornada!
                    </p>
                  </div>
                </div>

                {/* Closing signature */}
                <div className="text-center mt-10 pt-8 border-t border-neutral-100">
                  <p className="font-script text-3xl text-primary-600">
                    {initialWeddingDetails.coupleName}
                  </p>
                  <p className="text-neutral-400 text-sm mt-1">
                    {initialWeddingDetails.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
