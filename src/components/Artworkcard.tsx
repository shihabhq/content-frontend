import Link from "next/link";
import type { Artwork } from "@/types";

interface ArtworkCardProps {
  artwork: Artwork;
  priority?: boolean;
}

export default function ArtworkCard({
  artwork,
  priority = false,
}: ArtworkCardProps) {
  return (
    <Link href={`/artworks/${artwork.slug}`} className="group block">
      <div className="relative w-full aspect-[16/9] overflow-hidden  bg-[#0d0d0d]">
        <img
          src={artwork.imageUrl}
          alt=""
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
          <span className="px-4 py-2 rounded-lg bg-white/95 text-text-main text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            View
          </span>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-[15px] font-medium text-text-main leading-snug line-clamp-2 group-hover:text-text-secondary transition-colors">
          {artwork.title}
        </h3>
        {artwork.tags.length > 0 && (
          <p className="text-[13px] text-text-muted mt-0.5">
            {artwork.tags[0].tag.name}
          </p>
        )}
      </div>
    </Link>
  );
}
