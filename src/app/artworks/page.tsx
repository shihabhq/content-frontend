import type { Metadata } from "next";
import { getAllArtworks } from "@/lib/api";
import ArtworkCard from "@/components/Artworkcard";
import { Artwork } from "@/types";

export const metadata: Metadata = {
  title: "Artworks",
  description: "Browse artworks from our community",
};

// export const revalidate = 3600;

export default async function ArtworksPage() {
  let artworks: Artwork[] = [];
  try {
    const res = await getAllArtworks(1, 24);
    artworks = res.data;
  } catch {
    artworks = [];
  }

  return (
    <div className="min-h-screen bg-background-light">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-text-main">Artworks</h1>
          <p className="text-text-muted mt-2">
            Visual expressions from our civic tech community
          </p>
        </div>

        {artworks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-white border border-color-border-subtle flex items-center justify-center mb-4 shadow-sm">
              <svg
                className="w-8 h-8 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-text-muted">No artworks yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {artworks.map((artwork, i) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                priority={i < 4}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
