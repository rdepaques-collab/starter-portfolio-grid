import { useEffect } from "react";
import { X } from "lucide-react";
import type { VideoItem } from "@/data/projects";

function toDrivePreviewUrl(url: string) {
  return url.replace(/\/view(\?.*)?$/, "/preview");
}

export function VideoModal({ video, onClose }: { video: VideoItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <h3 className="text-base font-semibold text-foreground">{video.title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-transform hover:scale-110"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="aspect-video w-full bg-black">
          <iframe
            src={toDrivePreviewUrl(video.url)}
            title={video.title}
            className="h-full w-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
        <p className="px-5 py-4 text-sm leading-relaxed text-muted-foreground">{video.description}</p>
      </div>
    </div>
  );
}
