import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarHeart, Gift } from "lucide-react";

import Photo from "../../assets/img/DSC06805.jpg";
import { initialWeddingDetails } from "../../config/geral";

import Button from "../ui/Button";
import ScrollDown from "../ui/ScrollDown";

function getTimeLeft(targetDate: string) {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl md:text-3xl font-serif font-bold tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs uppercase tracking-widest opacity-70 mt-1">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeLeft("2026-07-19T15:30:00-03:00"),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft("2026-07-19T15:30:00-03:00"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center"
      aria-label="Hero — Casamento Robert & Millena"
    >
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Photo})`,
          filter: "brightness(0.65)",
        }}
        role="presentation"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

      <ScrollDown positionY={90} />

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* Script tagline */}
          <p className="font-script text-3xl md:text-4xl mb-3 animate-fadeIn opacity-0 animation-delay-200 text-primary-200">
            Estamos nos casando
          </p>

          {/* Couple name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold mb-4 animate-fadeIn opacity-0 animation-delay-400 leading-tight">
            {initialWeddingDetails.coupleName}
          </h1>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mb-5 animate-fadeIn opacity-0 animation-delay-600">
            <div className="h-px w-16 bg-white/40" />
            <span className="text-primary-300 text-lg">♥</span>
            <div className="h-px w-16 bg-white/40" />
          </div>

          {/* Date and venue */}
          <p className="text-lg md:text-xl mb-2 animate-fadeIn opacity-0 animation-delay-600 font-medium tracking-wide">
            {initialWeddingDetails.date}
          </p>
          <p className="text-sm md:text-base mb-10 animate-fadeIn opacity-0 animation-delay-800 text-white/80 tracking-wide">
            {initialWeddingDetails.venue} • Serra, ES
          </p>

          {/* Countdown */}
          <div className="flex justify-center gap-6 sm:gap-10 mb-10 animate-fadeIn opacity-0 animation-delay-800">
            <CountdownUnit value={timeLeft.days} label="dias" />
            <div className="text-white/40 text-2xl font-light self-start pt-1">
              :
            </div>
            <CountdownUnit value={timeLeft.hours} label="horas" />
            <div className="text-white/40 text-2xl font-light self-start pt-1">
              :
            </div>
            <CountdownUnit value={timeLeft.minutes} label="minutos" />
            <div className="text-white/40 text-2xl font-light self-start pt-1">
              :
            </div>
            <CountdownUnit value={timeLeft.seconds} label="segundos" />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn opacity-0 animation-delay-1000">
            <Link to="/confirmar-presenca">
              <Button
                variant="primary"
                size="lg"
                className="min-w-[180px] gap-2 bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-900/30"
              >
                <CalendarHeart size={18} />
                Confirmar Presença
              </Button>
            </Link>

            <Link to="/presentes">
              <Button
                variant="outline"
                size="lg"
                className="min-w-[180px] gap-2 border-white/70 text-white hover:bg-white/15 hover:border-white"
              >
                <Gift size={18} />
                Lista de Presentes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
