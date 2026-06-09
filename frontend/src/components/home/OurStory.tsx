import { Link } from "react-router-dom";

import PreWedding001 from "../../assets/img/DSC06800.jpg";
import PreWedding002 from "../../assets/img/DSC06834.jpg";
import PreWedding003 from "../../assets/img/DSC06876.jpg";
import Photo001 from "../../assets/img/PHO05377.jpeg";

import { initialWeddingDetails } from "../../config/geral";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

import Button from "../ui/Button";

export default function OurStory() {
  const textRef = useScrollAnimation<HTMLDivElement>();
  const photosRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      className="py-20 md:py-28 bg-neutral-50"
      aria-labelledby="our-story-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text side */}
            <div ref={textRef} className="reveal reveal-left">
              <p className="font-script text-2xl text-primary-500 mb-2">
                Um amor especial
              </p>
              <h2
                id="our-story-heading"
                className="text-3xl md:text-4xl font-serif text-neutral-800 mb-6 leading-snug"
              >
                Nossa História
              </h2>

              <div className="h-0.5 w-12 bg-primary-300 mb-6 rounded-full" />

              <p className="text-neutral-600 mb-6 leading-relaxed text-base md:text-lg">
                {initialWeddingDetails.story}
              </p>

              <Link to="/nossa-historia">
                <Button
                  variant="outline"
                  className="border-primary-400 text-primary-600 hover:bg-primary-50 hover:border-primary-500"
                >
                  Ler mais →
                </Button>
              </Link>
            </div>

            {/* Photos side */}
            <div ref={photosRef} className="reveal reveal-right">
              <div className="grid grid-cols-2 gap-3">
                <div className="img-zoom col-span-2 rounded-2xl overflow-hidden shadow-md aspect-[16/9]">
                  <img
                    src={PreWedding002}
                    alt="Pre-wedding dos noivos"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="img-zoom rounded-2xl overflow-hidden shadow-md aspect-square">
                  <img
                    src={PreWedding003}
                    alt="Pre-wedding dos noivos"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="img-zoom rounded-2xl overflow-hidden shadow-md aspect-square">
                  <img
                    src={Photo001}
                    alt="Namorados"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="img-zoom col-span-2 rounded-2xl overflow-hidden shadow-md aspect-[16/9]">
                  <img
                    src={PreWedding001}
                    alt="Pre-wedding dos noivos"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
