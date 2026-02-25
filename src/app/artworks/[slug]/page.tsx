import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getArtwork, getArtworkSuggestions } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import ArtworkCard from "@/components/Artworkcard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const artwork = await getArtwork(slug);
    return {
      title: artwork.title,
      description: artwork.content || undefined,
      openGraph: {
        title: artwork.title,
        images: [artwork.imageUrl],
      },
    };
  } catch {
    return { title: "Artwork Not Found" };
  }
}

export default async function ArtworkPage({ params }: PageProps) {
  const { slug } = await params;

  let artwork, suggestions;

  try {
    [artwork, suggestions] = await Promise.all([
      getArtwork(slug),
      getArtworkSuggestions(slug),
    ]);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background-light">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Back link */}
        <Link
          href="/artworks"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-secondary transition-colors duration-200 mb-8"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Artworks
        </Link>

        {/* Main artwork — large, window-filling image */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-background-surface shadow-xl shadow-black/10">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            loading="eager"
            className="absolute inset-0 w-full rounded-lg h-full object-contain"
          />
        </div>

        {/* Title & meta */}
        <div className="mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-main leading-tight">
            {artwork.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className="text-text-muted text-sm">
              {formatDate(artwork.createdAt)}
            </span>

            {artwork.tags.length > 0 && (
              <>
                <span className="text-text-muted">·</span>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((at) => (
                    <span
                      key={at.tagId}
                      className="px-2.5 py-0.5 text-xs rounded-full bg-white text-secondary border border-color-border-subtle"
                    >
                      {at.tag.name}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Description */}
          {artwork.content && (
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-text-muted text-base leading-relaxed whitespace-pre-line">
                {artwork.content}
              </p>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-text-main mb-6">
              More Artworks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {suggestions.map((a) => (
                <ArtworkCard key={a.id} artwork={a} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
