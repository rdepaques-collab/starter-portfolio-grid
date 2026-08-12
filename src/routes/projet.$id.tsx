import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Check, Maximize2, Play } from "lucide-react";
import { getProject } from "@/data/projects";
import { Lightbox } from "@/components/Lightbox";
import { VideoModal } from "@/components/VideoModal";
import type { VideoItem } from "@/data/projects";

function toDrivePreviewUrl(url: string) {
  return url.replace(/\/view(\?.*)?$/, "/preview");
}

export const Route = createFileRoute("/projet/$id")({
  head: ({ params }) => {
    const project = getProject(Number(params.id));
    if (!project) return {};
    return {
      meta: [
        { title: `${project.title} | Portfolio` },
        { name: "description", content: project.description.slice(0, 155) },
        { property: "og:title", content: project.title },
        { property: "og:description", content: project.description.slice(0, 155) },
        { property: "og:type", content: "article" },
        ...(project.cover ? [{ property: "og:image", content: project.cover }] : []),
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: NotFound,
  errorComponent: ErrorView,
});

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Projet introuvable</h1>
        <Link to="/" className="mt-4 inline-block text-sm text-primary hover:underline">
          Retour au portfolio
        </Link>
      </div>
    </div>
  );
}

function ErrorView({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Une erreur est survenue</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-4 inline-block text-sm text-primary hover:underline"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}

function ProjectDetail() {
  const { id } = Route.useParams();
  const project = getProject(Number(id));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"logos" | "affiches">("logos");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  if (!project || !project.cover) return <NotFound />;

  const categories = project.categories ?? [];
  const selectedCategory = categories.find((c) => c.slug === activeCategory) ?? null;
  const gallery = selectedCategory ? selectedCategory.items : project.gallery ?? [];
  const logos = project.logos ?? [];
  const hasCategories = categories.length > 0;
  const videos = selectedCategory
    ? selectedCategory.videos ?? []
    : hasCategories
      ? []
      : project.videos ?? [];
  const hasTabs = logos.length > 0 && gallery.length > 0;
  const lightboxItems = hasTabs ? (activeTab === "logos" ? logos : gallery) : gallery;
  const useModal = project.id === 8;


  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Retour au portfolio
        </Link>

        <header className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {project.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {project.title}
          </h1>
          {project.client && (
            <p className="mt-2 text-muted-foreground">
              Client : <span className="font-medium text-foreground">{project.client}</span>
            </p>
          )}
        </header>

        <div className="mt-8 overflow-hidden rounded-xl border border-border shadow-sm">
          <img src={project.cover} alt={project.title} className="w-full object-cover" />
        </div>

        {project.video && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-foreground">Vidéo du projet</h2>
            <div className="mt-3 aspect-video overflow-hidden rounded-xl border border-border shadow-sm">
              <iframe
                src={toDrivePreviewUrl(project.video)}
                title={`Vidéo – ${project.title}`}
                className="h-full w-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <section className="mt-10 grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-foreground">Description</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{project.description}</p>

            {project.goals && project.goals.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground">Objectifs de la création</h2>
                <ul className="mt-3 space-y-2">
                  {project.goals.map((goal) => (
                    <li key={goal} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="md:col-span-1">
            <div className="rounded-xl border border-border bg-card p-5 text-card-foreground">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Logiciels utilisés
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.software?.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>

        {categories.length > 0 && (
          <section className="mt-14">
            {selectedCategory ? (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory(null);
                    setLightboxIndex(null);
                  }}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Retour aux catégories
                </button>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                  {selectedCategory.name}
                </h2>
                <p className="mt-2 text-muted-foreground">{selectedCategory.description}</p>
                {selectedCategory.items.length === 0 && (selectedCategory.videos?.length ?? 0) === 0 && (
                  <p className="mt-6 rounded-xl border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
                    Les affiches de cette catégorie seront ajoutées prochainement.
                  </p>
                )}
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-foreground">Catégories de contenu</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sélectionnez une catégorie pour voir uniquement ses affiches.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat.slug);
                        setLightboxIndex(null);
                      }}
                      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                        {cat.cover ? (
                          <img
                            src={cat.cover}
                            alt={cat.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-wide text-muted-foreground">
                            Image à venir
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-base font-semibold text-foreground">{cat.name}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                          {cat.description}
                        </p>
                        <span className="mt-4 text-sm font-medium text-primary">
                          Voir les affiches →
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {!(categories.length > 0 && !selectedCategory) && (hasTabs ? (
          <section className="mt-14">

            <div className="flex flex-wrap gap-2 rounded-xl border border-border bg-card p-1.5 sm:w-fit">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("logos");
                  setLightboxIndex(null);
                }}
                className={`rounded-lg px-5 py-2 text-sm font-medium transition-colors ${
                  activeTab === "logos"
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Logos ({logos.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("affiches");
                  setLightboxIndex(null);
                }}
                className={`rounded-lg px-5 py-2 text-sm font-medium transition-colors ${
                  activeTab === "affiches"
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Affiches publicitaires ({gallery.length})
              </button>
            </div>

            <h2 className="mt-8 text-lg font-semibold text-foreground">
              {activeTab === "logos" ? "Galerie des logos" : "Galerie des affiches"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Cliquez sur une création ou sur « Agrandir » pour l'ouvrir en grand. Utilisez « Précédent » et « Suivant » pour naviguer.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(activeTab === "logos" ? logos : gallery).map((item, i) => (
                <figure
                  key={item.src}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className="block w-full"
                      aria-label={`Ouvrir ${item.caption}`}
                    >
                      <img
                        src={item.src}
                        alt={item.caption}
                        loading="lazy"
                        className={`w-full transition-transform duration-500 group-hover:scale-105 ${
                          activeTab === "logos"
                            ? "aspect-square bg-white object-contain p-6"
                            : "aspect-[3/4] object-cover"
                        }`}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow backdrop-blur transition-all hover:bg-background sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <Maximize2 className="h-3.5 w-3.5" aria-hidden />
                      Agrandir
                    </button>
                  </div>
                  <figcaption className="p-4 text-sm text-muted-foreground">{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : (
          gallery.length > 0 && (
            <section className="mt-14">
              <h2 className="text-lg font-semibold text-foreground">Galerie des affiches</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Cliquez sur une affiche ou sur « Agrandir » pour l'ouvrir en grand.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((item, i) => (
                  <figure
                    key={item.src}
                    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(i)}
                        className="block w-full"
                        aria-label={`Ouvrir l'affiche ${i + 1}`}
                      >
                        <img
                          src={item.src}
                          alt={item.caption}
                          loading="lazy"
                          className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(i)}
                        className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow backdrop-blur transition-all hover:bg-background sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <Maximize2 className="h-3.5 w-3.5" aria-hidden />
                        Agrandir
                      </button>
                    </div>
                    <figcaption className="p-4 text-sm text-muted-foreground">{item.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )
        ))}


        {videos.length > 0 && (
          <section className="mt-14">
            <h2 className="text-lg font-semibold text-foreground">Nos réalisations vidéo</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Découvrez nos vidéos publicitaires. Cliquez sur « Voir la vidéo » pour l'ouvrir dans un
              nouvel onglet.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <article
                  key={video.url}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {useModal ? (
                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    aria-label={`Voir la vidéo : ${video.title}`}
                    className="relative block aspect-video w-full overflow-hidden bg-secondary"
                  >
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={`Miniature – ${video.title}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-secondary" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                    <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-0.5 h-6 w-6" aria-hidden />
                    </span>
                  </button>
                  ) : (
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Voir la vidéo : ${video.title}`}
                    className="relative block aspect-video overflow-hidden bg-secondary"
                  >
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={`Miniature – ${video.title}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-secondary" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                    <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-0.5 h-6 w-6" aria-hidden />
                    </span>
                  </a>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-semibold text-foreground">{video.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{video.description}</p>
                    {useModal ? (
                    <button
                      type="button"
                      onClick={() => setActiveVideo(video)}
                      className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <Play className="h-4 w-4" aria-hidden />
                      Voir la vidéo
                    </button>
                    ) : (
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <Play className="h-4 w-4" aria-hidden />
                      Regarder la vidéo
                    </a>
                    )}
                  </div>
                </article>
              ))}
             </div>
          </section>
        )}

        <div className="mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Retour au Portfolio
          </Link>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </main>
  );
}