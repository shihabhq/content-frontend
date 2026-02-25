import type { Metadata } from "next";
import { getAllVideos } from "@/lib/api";
import VideoCard from "@/components/Videocard";
import { Video } from "@/types";

export const metadata: Metadata = {
  title: "Videos",
  description: "Browse all civic tech videos",
};

// export const revalidate = 3600;

export default async function VideosPage() {
  let videos: Video[] = [];
  try {
    const res = await getAllVideos(1, 24);
    videos = res.data;
  } catch {
    videos = [];
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-text-main sm:text-3xl">
            Videos
          </h1>
          <p className="text-text-muted mt-1">
            Explore our civic tech video library
          </p>
        </div>

        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--color-border-subtle)] flex items-center justify-center mb-4">
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
                  d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-text-muted">No videos yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video, i) => (
              <VideoCard key={video.id} video={video} priority={i < 4} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
