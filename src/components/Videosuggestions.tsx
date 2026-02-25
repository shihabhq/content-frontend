import Link from "next/link";
import type { Video } from "@/types";
import { getYoutubeThumbnail, formatViews, timeAgo } from "@/lib/utils";

interface VideoSuggestionsProps {
  suggestions: Video[];
}

export default function VideoSuggestions({
  suggestions,
}: VideoSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div>
      <h2 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2">
        Up Next
      </h2>

      <div className="space-y-1">
        {suggestions.map((video) => (
          <Link
            key={video.id}
            href={`/videos/${video.slug}`}
            className="group flex gap-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <div className="relative w-44 shrink-0 aspect-video rounded-lg overflow-hidden bg-gray-200">
              <img
                src={video.thumbnail || getYoutubeThumbnail(video.youtubeId)}
                alt={video.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-text-main text-sm font-medium leading-snug line-clamp-2 group-hover:text-secondary transition-colors duration-200">
                {video.title}
              </h3>
              {video.tags.length > 0 && (
                <p className="text-secondary text-xs mt-1">
                  {video.tags[0].tag.name}
                </p>
              )}
              <p className="text-text-muted text-xs mt-0.5">
                {timeAgo(video.publishedAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
