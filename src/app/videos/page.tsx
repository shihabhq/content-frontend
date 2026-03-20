import type { Metadata } from "next";
import Link from "next/link";
import { getAllVideos } from "@/lib/api";
import VideoCard from "@/components/Videocard";
import { Video } from "@/types";

export const metadata: Metadata = {
  title: "Videos",
  description: "Browse all civic tech videos",
};

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  const currentPage = Math.max(
    1,
    Number(resolvedSearchParams.page ?? "1") || 1,
  );

  let allVideos: Video[] = [];

  try {
    // Load all videos from the API in batches, then paginate locally.
    const apiPageSize = 50;
    let apiPage = 1;
    let res = await getAllVideos(apiPage, apiPageSize);
    allVideos = [...res.data];

    while (allVideos.length < res.total) {
      apiPage += 1;
      res = await getAllVideos(apiPage, apiPageSize);
      allVideos = [...allVideos, ...res.data];
    }
  } catch {
    allVideos = [];
  }

  const total = allVideos.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageVideos = allVideos.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0 py-10 md:py-14">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-text-main sm:text-3xl">
              Videos
            </h1>
            <p className="text-text-muted mt-1">
              Explore our civic tech video library
            </p>
          </div>
          {total > 0 && (
            <p className="text-xs text-text-muted">
              Page {currentPage} of {totalPages} · {total} video
              {total === 1 ? "" : "s"}
            </p>
          )}
        </div>

        {pageVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-border-subtle flex items-center justify-center mb-4">
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
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pageVideos.map((video, i) => (
                <VideoCard key={video.id} video={video} priority={i < 4} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
                <Link
                  href={
                    currentPage > 1
                      ? `/videos?page=${currentPage - 1}`
                      : "/videos?page=1"
                  }
                  className="px-4 py-2 rounded-lg text-sm font-medium text-secondary hover:text-secondary-dark transition-colors"
                >
                  Previous
                </Link>
                <span className="text-sm text-text-muted">
                  Page {currentPage} of {totalPages}
                </span>
                <Link
                  href={
                    currentPage < totalPages
                      ? `/videos?page=${currentPage + 1}`
                      : "/videos?page=1"
                  }
                  className="px-4 py-2 rounded-lg text-sm font-medium text-secondary hover:text-secondary-dark transition-colors"
                >
                  Next
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}