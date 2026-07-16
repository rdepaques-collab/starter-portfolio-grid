// Articles / journal — section « JOURNAL ».
export interface Article {
  tag: string;
  date: string;
  title: string;
  text: string;
}

export const articles: Article[] = [
  {
    tag: "BRANDING",
    date: "12 FÉV 2026",
    title: "Construire une identité de marque qui dure 10 ans",
    text: "Les fondamentaux d'un branding solide, au-delà des tendances éphémères.",
  },
  {
    tag: "MARKETING DIGITAL",
    date: "28 JAN 2026",
    title: "Meta Ads en 2026 : ce qui fonctionne vraiment",
    text: "Créatifs, ciblage, budgets — mes leçons de +200 campagnes.",
  },
  {
    tag: "MOTION DESIGN",
    date: "5 JAN 2026",
    title: "L'art du timing en motion design",
    text: "Pourquoi les meilleures animations sont d'abord une question de rythme.",
  },
];
