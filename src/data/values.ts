// « Mes valeurs » — chaque valeur affiche une icône Lucide.
// Voir la liste des icônes : https://lucide.dev/icons/
import { Layers, Compass, Package, Users, Eye, type LucideIcon } from "lucide-react";

export interface Value {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const values: Value[] = [
  { icon: Layers, title: "Créatif multidisciplinaire", text: "Obsédé par le détail et la qualité." },
  { icon: Compass, title: "Approche", text: "Cinématique, stratégique et exécutée avec soin." },
  { icon: Package, title: "Livrables", text: "Assets, vidéos, campagnes publicitaires et contenus prêts à performer." },
  { icon: Users, title: "Collaborations", text: "Marques, agences, startups et entrepreneurs." },
  { icon: Eye, title: "Vision", text: "Élever chaque projet à un standard international." },
];
