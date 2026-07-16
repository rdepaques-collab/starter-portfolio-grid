// Chiffres clés (section « MON EXPÉRIENCE »).
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 5, suffix: " années", label: "D'expérience en création visuelle et communication digitale." },
  { value: 100, suffix: " projets", label: "Réalisés en graphisme, motion design, montage vidéo et marketing digital." },
  { value: 30, suffix: " clients", label: "Accompagnés dans leurs besoins de communication et de création de contenu." },
  { value: 100, suffix: " créations", label: "Visuels, vidéos, logos, campagnes publicitaires et contenus digitaux." },
];
