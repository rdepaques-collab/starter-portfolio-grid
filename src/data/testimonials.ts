// Témoignages clients — section « TÉMOIGNAGES ».
export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Digital Marketing Academy",
    role: "Formation & Marketing Digital",
    text: "Rodriguez a su transformer nos idées en créations visuelles modernes et impactantes. Les supports réalisés correspondent parfaitement à notre image de marque.",
  },
  {
    name: "NAFA",
    role: "Solution digitale de paiement",
    text: "Une approche créative et professionnelle. Les visuels publicitaires réalisés nous ont permis de mieux présenter nos services auprès de notre audience.",
  },
  {
    name: "Résidence PASNEL CONFORT",
    role: "Hôtellerie & résidence meublée",
    text: "Un travail vidéo et graphique qui met véritablement en valeur nos espaces. Rodriguez comprend le besoin et livre un rendu haut de gamme, fidèle à notre positionnement.",
  },
  {
    name: "RAMA Cosmétique",
    role: "Marque cosmétique — client partenaire",
    text: "Excellente collaboration sur l'identité visuelle et les contenus digitaux. Chaque détail est pensé pour créer une communication plus forte et plus professionnelle.",
  },
];
