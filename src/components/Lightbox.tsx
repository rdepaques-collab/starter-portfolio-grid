import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import type { GalleryItem } from "@/data/projects";

interface LightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const [zoomed, setZoomed] = useState(false);
  const item = items[index];

  const prev = useCallback(() => {
    setZoomed(false);
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const next = useCallback(() => {
    setZoomed(false);
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow transition-transform hover:scale-110"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Précédent"
        className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow transition-transform hover:scale-110 sm:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Suivant"
        className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow transition-transform hover:scale-110 sm:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div
        className="flex max-h-[80vh] max-w-[92vw] items-center justify-center overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={item.src}
          src={item.src}
          alt={item.caption}
          onClick={() => setZoomed((z) => !z)}
          className={`animate-scale-in rounded-lg object-contain shadow-2xl transition-transform duration-300 ${
            zoomed ? "max-w-none scale-150 cursor-zoom-out" : "max-h-[80vh] max-w-[92vw] cursor-zoom-in"
          }`}
        />
      </div>

      <div
        className="mt-4 flex items-center gap-4 px-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setZoomed((z) => !z)}
          aria-label={zoomed ? "Dézoomer" : "Zoomer"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform hover:scale-110"
        >
          {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
        </button>
        <p className="max-w-xl text-sm text-muted-foreground">
          <span className="mr-2 font-medium text-foreground">
            {index + 1}/{items.length}
          </span>
          {item.caption}
        </p>
      </div>
    </div>
  );
}