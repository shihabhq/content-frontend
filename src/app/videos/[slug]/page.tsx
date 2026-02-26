import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getVideo, getVideoSuggestions } from "@/lib/api";
import VideoPlayer from "@/components/Videoplayer";
import VideoSuggestions from "@/components/Videosuggestions";
import CollapsibleDescription from "@/components/CollapsibleDescription";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const video = await getVideo(slug);
    return {
      title: video.title,
      description: video.description || undefined,
      openGraph: {
        title: video.title,
        description: video.description || undefined,
        images: video.thumbnail
          ? [video.thumbnail]
          : [`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`],
      },
    };
  } catch {
    return { title: "Video Not Found" };
  }
}

export default async function VideoPage({ params }: PageProps) {
  const { slug } = await params;

  let video, suggestions;

  try {
    [video, suggestions] = await Promise.all([
      getVideo(slug),
      getVideoSuggestions(slug),
    ]);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background-light">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Player + Info */}
          <div className="flex-1 min-w-0">
            {/* Player */}
            <VideoPlayer
              youtubeId={video.youtubeId}
              slug={slug}
              title={video.title}
            />

            {/* Title & meta */}
            <div className="mt-5">
              <h1 className="text-xl sm:text-2xl font-bold text-text-main leading-snug">
                {video.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="text-text-muted text-sm">
                  {formatDate(video.publishedAt)}
                </span>

                {/* Tags */}
                {video.tags.length > 0 && (
                  <>
                    <span className="text-text-muted">·</span>
                    <div className="flex flex-wrap gap-2">
                      {video.tags.map((vt) => (
                        <span
                          key={vt.tagId}
                          className="px-2.5 py-0.5 text-xs rounded-full bg-white text-secondary border border-color-border-subtle"
                        >
                          {vt.tag.name}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Description — collapsible when > 50 words */}
              {video.description && (
                <div className="mt-2 pt-2 border-t border-border-subtle">
                  <CollapsibleDescription description={video.description} />
                </div>
              )}
            </div>
          </div>

          {/* Right: Suggestions */}
          <aside className="w-full lg:w-[340px] xl:w-[380px] shrink-0">
            <VideoSuggestions suggestions={suggestions} />
          </aside>
        </div>
      </div>
    </div>
  );
}
