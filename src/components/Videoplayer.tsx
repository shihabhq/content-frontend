"use client";

import { useEffect, useRef } from "react";
import { incrementView } from "@/lib/api";

interface VideoPlayerProps {
  youtubeId: string;
  slug: string;
  title: string;
}

export default function VideoPlayer({
  youtubeId,
  slug,
  title,
}: VideoPlayerProps) {
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (!hasIncremented.current) {
      hasIncremented.current = true;
      incrementView(slug).catch(() => {
        // silently fail — view count is non-critical
      });
    }
  }, [slug]);

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-sm shadow-black/50">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
