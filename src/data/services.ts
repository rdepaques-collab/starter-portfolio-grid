// Étapes du processus de travail — section « PROCESSUS ».
// Icônes disponibles : https://lucide.dev/icons/
import { ClipboardList, Search, Wand2, RefreshCcw, Rocket, type LucideIcon } from "lucide-react";

export interface ServiceStep {
  n: string;
  icon: LucideIcon;
  title: string;
  text: string;
}

export const services: ServiceStep[] = [
  { n: "01", icon: ClipboardList, title: "Analyse du besoin", text: "Compréhension profonde de votre marque, marché et objectifs." },
  { n: "02", icon: Search, title: "Recherche", text: "Benchmark, moodboards, direction artistique." },
  { n: "03", icon: Wand2, title: "Création", text: "Design, animation, montage — production premium." },
  { n: "04", icon: RefreshCcw, title: "Révisions", text: "Itérations précises jusqu'à la version parfaite." },
  { n: "05", icon: Rocket, title: "Livraison", text: "Assets optimisés, prêts à performer sur tous supports." },
];
