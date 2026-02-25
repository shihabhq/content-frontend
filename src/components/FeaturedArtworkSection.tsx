import Link from "next/link";
import type { Artwork } from "@/types";
import ArtworkCard from "./Artworkcard";

interface FeaturedArtworksSectionProps {
  artworks: Artwork[];
}

export default function FeaturedArtworksSection({
  artworks,
}: FeaturedArtworksSectionProps) {
  if (artworks.length === 0) return null;

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h2 className="text-4xl font-semibold text-text-main tracking-tight">
            Artworks
          </h2>
          <p className="text-base text-text-muted mt-0.5">
            Artworks of democracy is presented to you.
          </p>
        </div>
        <Link
          href="/artworks"
          className="text-sm font-medium text-text-secondary hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artworks.map((artwork, i) => (
          <ArtworkCard key={artwork.id} artwork={artwork} priority={i < 4} />
        ))}
      </div>
    </section>
  );
}
