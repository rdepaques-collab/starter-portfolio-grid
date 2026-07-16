// Liens réseaux sociaux affichés dans la section « CONTACT ».
import { Instagram, Facebook, Linkedin, Music2, Palette, type LucideIcon } from "lucide-react";

export interface Social {
  icon: LucideIcon;
  label: string;
  url: string;
}

export const socials: Social[] = [
  { icon: Instagram, label: "Instagram", url: "https://instagram.com/" },
  { icon: Facebook, label: "Facebook", url: "https://facebook.com/" },
  { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/" },
  { icon: Music2, label: "TikTok", url: "https://tiktok.com/" },
  { icon: Palette, label: "Behance", url: "https://behance.net/" },
];
