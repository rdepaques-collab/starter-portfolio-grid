// Compétences affichées dans la section « COMPÉTENCES ».
// value = pourcentage de maîtrise (0-100).
export interface Skill {
  name: string;
  value: number;
}

export const skills: Skill[] = [
  { name: "Adobe Photoshop", value: 95 },
  { name: "Adobe Illustrator", value: 92 },
  { name: "Adobe After Effects", value: 88 },
  { name: "Adobe Premiere Pro", value: 90 },
  { name: "CapCut", value: 94 },
  { name: "Canva", value: 96 },
  { name: "Figma", value: 85 },
  { name: "Meta Ads", value: 90 },
  { name: "Google Ads", value: 82 },
  { name: "Marketing Digital", value: 88 },
];
