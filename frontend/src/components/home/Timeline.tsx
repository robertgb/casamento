import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { events } from "../../config/geral";

export default function Timeline() {
  const titleRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      className="py-20 md:py-28 bg-white"
      aria-labelledby="timeline-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div ref={titleRef} className="reveal reveal-up text-center mb-16">
            <h2
              id="timeline-heading"
              className="text-3xl md:text-4xl font-serif text-primary-800 section-heading"
            >
              Programação
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[21px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-200 via-primary-300 to-primary-200" />

            {events.map((event, index) => (
              <TimelineItem key={index} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  event,
  index,
}: {
  event: (typeof events)[number];
  index: number;
}) {
  const ref = useScrollAnimation<HTMLDivElement>();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`reveal ${isEven ? "reveal-left" : "reveal-right"} relative flex flex-col md:flex-row ${
        isEven ? "md:flex-row-reverse" : ""
      } mb-12 last:mb-0`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Icon */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-[21px] w-[42px] h-[42px] rounded-full bg-white shadow-md border-2 border-primary-200 flex items-center justify-center z-10 timeline-dot">
        {event.icon}
      </div>

      {/* Spacer */}
      <div className="hidden md:block md:w-1/2" />

      {/* Card */}
      <div className="pl-14 md:pl-0 md:w-1/2 md:px-8">
        <div
          className={`bg-neutral-50 border border-neutral-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 ${
            isEven ? "md:mr-8" : "md:ml-8"
          }`}
        >
          <span className="text-sm font-semibold text-primary-600 tracking-widest uppercase">
            {event.time}
          </span>
          <h3 className="text-lg font-semibold text-neutral-800 mt-1 mb-1">
            {event.title}
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}
