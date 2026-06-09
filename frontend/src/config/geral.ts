import React from "react";

import { CakeSlice, Clock, Heart, Music } from "lucide-react";

import { Event, WeddingDetails } from "../types";

export const initialWeddingDetails: WeddingDetails = {
  coupleName: "Robert & Millena",
  date: "19 de julho de 2026",
  venue: "Cerimonial Fina Estampa",
  address: "Rua Colibris, nº 146, Bicanga, Serra - ES",
  rsvpDeadline: "10 de Novembro de 2025",
  story:
    "Nossa história começou em julho de 2024, quando o destino nos uniu através de uma rede social. Desde aquele primeiro contato, sabíamos que algo especial estava prestes a acontecer. Os meses se transformaram em uma jornada incrível, onde cada risada e cada desafio superado apenas fortaleceram a conexão entre nós. Juntos, construímos um alicerce de amor e cumplicidade, e agora, com o coração transbordando de felicidade, estamos prontos para o nosso próximo capítulo.",
};

export const events: Event[] = [
  {
    time: "15:30",
    title: "Recepção dos convidados",
    description: "Chegada e acomodação dos convidados no local da cerimônia",
    icon: React.createElement(Clock, {
      className: "w-6 h-6 text-primary-600",
    }),
  },
  {
    time: "16:00",
    title: "Cerimônia",
    description: "Momento especial da troca de votos e alianças",
    icon: React.createElement(Heart, {
      className: "w-6 h-6 text-primary-600",
    }),
  },
  {
    time: "18:00",
    title: "Jantar",
    description: "Buffet completo com opções para todos os gostos",
    icon: React.createElement(CakeSlice, {
      className: "w-6 h-6 text-primary-600",
    }),
  },
  {
    time: "19:00",
    title: "Festa",
    description: "Música e dança para celebrar essa união",
    icon: React.createElement(Music, {
      className: "w-6 h-6 text-primary-600",
    }),
  },
];
