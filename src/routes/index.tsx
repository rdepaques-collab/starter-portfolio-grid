import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, useMemo, type FormEvent } from "react";
import {
  ImageIcon,
  ArrowRight,
  Sparkles,
  Plus,
  Star,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { values } from "@/data/values";
import { skills } from "@/data/skills";
import { stats } from "@/data/stats";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { articles } from "@/data/articles";
import { socials } from "@/data/socials";
import profilPhoto from "@/assets/rodriguez-profil.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const FILTERS = ["TOUS", "GRAPHISME", "MOTION DESIGN", "MONTAGE VIDÉO", "MARKETING DIGITAL"] as const;
type Filter = typeof FILTERS[number];

function matchFilter(project: { category: string; videos?: unknown[]; video?: string }, f: Filter) {
  if (f === "TOUS") return true;
  const c = project.category.toLowerCase();
  if (f === "GRAPHISME") return c.includes("graphisme") || c.includes("identité") || c.includes("visuelle");
  if (f === "MOTION DESIGN") return c.includes("motion");
  if (f === "MONTAGE VIDÉO") return c.includes("montage") || c.includes("vidéo") || !!project.video || !!project.videos;
  if (f === "MARKETING DIGITAL") return c.includes("marketing") || c.includes("publicitaire");
  return true;
}

function scrollToPortfolio() {
  document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
}


// -- Hooks -------------------------------------------------------------
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options ?? { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [inView, options]);
  return { ref, inView };
}

function CountUp({ target, suffix = "", duration = 1400 }: { target: number; suffix?: string; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return (
    <span ref={ref}>
      +{n}
      {suffix}
    </span>
  );
}

function SkillBar({ name, value }: { name: string; value: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{name}</span>
        <span className="text-sm font-medium text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-[1400ms] ease-out"
          style={{ width: inView ? `${value}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

// -- WhatsApp icon -----------------------------------------------------
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// -- Contact form ------------------------------------------------------
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanPhone = site.phone.replace(/\D/g, "");
    const text = `Nom : ${form.name}\nEmail : ${form.email}\nTéléphone : ${form.phone}\nSujet : ${form.subject}\nMessage : ${form.message}`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 w-full max-w-2xl space-y-5 rounded-2xl border border-border bg-card p-6 text-left shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">Nom complet</label>
          <input id="name" required value={form.name} onChange={handleChange("name")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Adresse e-mail</label>
          <input id="email" type="email" required value={form.email} onChange={handleChange("email")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-foreground">Numéro de téléphone</label>
        <input id="phone" type="tel" value={form.phone} onChange={handleChange("phone")}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">Sujet</label>
        <input id="subject" required value={form.subject} onChange={handleChange("subject")}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
        <textarea id="message" required rows={5} value={form.message} onChange={handleChange("message")}
          className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2" />
      </div>
      <button type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#128C7E] sm:w-auto">
        <WhatsAppIcon className="h-4 w-4" />
        Envoyer via WhatsApp
      </button>
    </form>
  );
}


// -- Page --------------------------------------------------------------
function Index() {
  const [filter, setFilter] = useState<Filter>("TOUS");
  const [showAddInfo, setShowAddInfo] = useState(false);

  const filteredProjects = useMemo(
    () => projects.filter((p) => matchFilter(p, filter)),
    [filter],
  );

  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 sm:py-24 md:grid-cols-2">
          <div className="animate-fade-in space-y-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              {site.headline}
            </h1>
            <div>
              <p className="text-2xl font-semibold text-foreground">{site.name}</p>
              <p className="mt-1 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {site.tagline}
              </p>
            </div>
            <button onClick={scrollToPortfolio}
              className="hover-scale inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              <Sparkles className="h-4 w-4" aria-hidden />
              Découvrir mon univers
            </button>
          </div>
          <div className="animate-scale-in flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-full bg-primary/10 blur-3xl" aria-hidden />
              <img src={profilPhoto.url} alt={site.name}
                className="w-64 rounded-2xl object-cover shadow-lg sm:w-80" />
            </div>
          </div>
        </div>
      </section>

      {/* À PROPOS */}
      <section id="about" className="mx-auto max-w-4xl px-6 py-16 scroll-mt-20">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">À propos de moi</h2>
        <div className="mt-6 space-y-4 text-muted-foreground">
          <p>Je suis Rodriguez Depaques, graphiste, motion designer, monteur vidéo et spécialiste en marketing digital.</p>
          <p>J'aide les entreprises, les marques et les entrepreneurs à développer leur image grâce à des créations visuelles modernes, des vidéos professionnelles et des stratégies digitales efficaces.</p>
        </div>
      </section>

      {/* MES VALEURS */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Mes valeurs</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="hover-scale rounded-xl border border-border bg-card p-6 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <v.icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Projets sélectionnés</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-foreground">PORTFOLIO</h2>
          </header>

          <div className="mb-8 flex flex-wrap items-center gap-3">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button key={f} onClick={() => setFilter(f)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/60 hover:text-primary"
                  }`}>
                  {f}
                </button>
              );
            })}
            <button onClick={() => setShowAddInfo((v) => !v)}
              className="ml-auto inline-flex items-center gap-2 rounded-full border border-dashed border-primary/60 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary transition-colors hover:bg-primary/10">
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Ajouter un projet
            </button>
          </div>

          {showAddInfo && (
            <div className="animate-fade-in mb-8 rounded-xl border border-dashed border-primary/50 bg-primary/5 p-5 text-sm text-foreground">
              Pour ajouter un projet, ouvrez <code className="rounded bg-muted px-1 py-0.5 text-xs">src/data/projects.ts</code> et
              ajoutez une entrée dans le tableau <code className="rounded bg-muted px-1 py-0.5 text-xs">projects</code> (titre, catégorie, description, image de couverture, galerie ou vidéo). Il apparaîtra automatiquement ici.
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const filled = Boolean(project.cover);
              return (
                <article key={project.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-muted">
                    {filled ? (
                      <img src={project.cover} alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy" />
                    ) : (
                      <ImageIcon className="h-10 w-10 text-muted-foreground/50" aria-hidden />
                    )}
                    <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow">
                      {project.id}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 p-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{project.category}</p>
                    <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                    <p className="line-clamp-3 text-sm text-muted-foreground">{project.description}</p>
                    {filled && (
                      <div className="pt-3">
                        {project.video ? (
                          <a href={project.video} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                            Voir le projet
                            <ArrowRight className="h-4 w-4" aria-hidden />
                          </a>
                        ) : (
                          <Link to="/projet/$id" params={{ id: String(project.id) }}
                            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                            Voir le projet
                            <ArrowRight className="h-4 w-4" aria-hidden />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPÉTENCES */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <header className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Outils & expertises</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-foreground">COMPÉTENCES</h2>
          </header>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((s) => (
              <SkillBar key={s.name} name={s.name} value={s.value} />
            ))}
          </div>
        </div>
      </section>

      {/* MON EXPÉRIENCE */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Chiffres clés</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-foreground">MON EXPÉRIENCE</h2>
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="text-4xl font-bold tracking-tight text-primary">
                  <CountUp target={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-base italic text-muted-foreground">
          « Chaque projet est une opportunité de transformer une idée en une expérience visuelle forte et mémorable. »
        </p>
      </section>

      {/* PROCESSUS */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <header className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Comment je travaille</p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight text-foreground">PROCESSUS</h2>
          </header>
          <ol className="relative space-y-6 md:space-y-8">
            <span className="absolute left-5 top-2 bottom-2 hidden w-px bg-border md:block" aria-hidden />
            {services.map((step, i) => (
              <Reveal key={step.n} delay={i * 100}>
                <li className="relative flex gap-5 rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                    <step.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{step.n}</p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Ce que disent mes collaborations</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-foreground">TÉMOIGNAGES</h2>
        </header>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex gap-0.5 text-primary" aria-label="Note 5 sur 5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                  « {t.text} »
                </blockquote>
                <figcaption className="mt-6">
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* JOURNAL */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Idées, essais & coulisses</p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-foreground">JOURNAL</h2>
            </div>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Tous les articles <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </header>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.title} delay={i * 100}>
                <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {a.tag} · {a.date}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground">{a.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.text}</p>
                  <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:underline">
                    Lecture · 4 min <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border scroll-mt-20">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Travaillons ensemble</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-foreground">CONTACT</h2>

          <div className="mt-8 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" aria-hidden /> Email
              </div>
              <a href={`mailto:${site.email}`} className="mt-2 block break-all text-sm font-medium text-foreground hover:text-primary">
                {site.email}
              </a>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" aria-hidden /> Téléphone
              </div>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-2 block text-sm font-medium text-foreground hover:text-primary">
                {site.phone}
              </a>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" aria-hidden /> Localisation
              </div>
              <p className="mt-2 text-sm font-medium text-foreground">{site.location}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                <s.icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>

          <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer"
            className="hover-scale mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            <MessageCircle className="h-4 w-4" aria-hidden />
            Discutons de votre projet
          </a>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
