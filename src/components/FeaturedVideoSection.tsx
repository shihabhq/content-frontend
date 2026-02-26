import Link from "next/link";
import type { Video } from "@/types";
import VideoCard from "./Videocard";

interface FeaturedVideosSectionProps {
  videos: Video[];
}

export default function FeaturedVideosSection({
  videos,
}: FeaturedVideosSectionProps) {
  if (videos.length === 0) return null;

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl lg:text-4xl font-semibold text-text-main tracking-tight">
            Featured Videos For You
          </h2>
          <p className="text-base text-text-muted mt-0.5">
            Handpicked content from our curators
          </p>
        </div>
        <Link
          href="/videos?featured=true"
          className="text-sm font-medium text-secondary hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video, i) => (
          <VideoCard key={video.id} video={video} priority={i < 4} />
        ))}
      </div>
    </section>
  );
}
