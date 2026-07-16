# Contenu du portfolio — Guide d'édition

Tout le contenu affiché sur le site est centralisé dans ce dossier `src/data/`.
Tu peux modifier n'importe quel fichier depuis GitHub (bouton crayon ✏️) — les
changements se déploient automatiquement.

## Fichiers

| Fichier            | Section du site                | Contenu |
|--------------------|--------------------------------|---------|
| `site.ts`          | En-tête, contact               | Nom, tagline, email, téléphone, WhatsApp, localisation |
| `projects.ts`      | Portfolio + pages projet       | Liste des projets (titre, image, galerie, vidéos…) |
| `values.ts`        | « Mes valeurs »                | Cartes de valeurs avec icônes |
| `skills.ts`        | « Compétences »                | Outils & niveaux de maîtrise (%) |
| `stats.ts`         | « Mon expérience »             | Chiffres clés (années, projets, clients…) |
| `services.ts`      | « Processus »                  | Étapes du processus de travail |
| `testimonials.ts`  | « Témoignages »                | Avis clients |
| `articles.ts`      | « Journal »                    | Aperçus d'articles |
| `socials.ts`       | « Contact »                    | Liens réseaux sociaux |

## Ajouter une image / vidéo

1. Dépose l'image dans `src/assets/` (via GitHub → *Add file* → *Upload files*).
2. Dans le fichier de données concerné, importe-la :
   ```ts
   import monImage from "@/assets/mon-image.jpg";
   // puis utilise : cover: monImage
   ```
3. Pour une vidéo, colle simplement l'URL (Google Drive, YouTube, Vimeo…).

## Icônes

Les icônes proviennent de [Lucide](https://lucide.dev/icons/).
Pour changer une icône, importe-la depuis `lucide-react` en haut du fichier :
```ts
import { Rocket } from "lucide-react";
```

## Règles importantes

- Ne supprime pas les virgules `,` en fin de ligne.
- Garde les guillemets autour du texte : `"mon texte"`.
- Ne renomme pas les clés (`title`, `text`, `url`…) — seul le contenu se modifie.
