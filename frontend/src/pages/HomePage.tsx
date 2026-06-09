import { Helmet } from "react-helmet-async";

import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import WeddingInfo from "../components/home/WeddingInfo";
import OurStory from "../components/home/OurStory";
import Timeline from "../components/home/Timeline";

export default function HomePage() {
  return (
    <Layout>
      <Helmet>
        <title>Robert & Millena — Nosso Casamento | 19 de Julho de 2026</title>
        <meta
          name="description"
          content="Robert e Millena se casam no dia 19 de julho de 2026 no Cerimonial Fina Estampa, Serra - ES. Confirme sua presença e veja a lista de presentes."
        />
      </Helmet>
      <Hero />
      <WeddingInfo />
      <OurStory />
      <Timeline />
    </Layout>
  );
}
