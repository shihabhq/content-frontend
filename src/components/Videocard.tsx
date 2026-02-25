"use client";

import Link from "next/link";
import { useState } from "react";
import { Play } from "lucide-react";
import type { Video } from "@/types";
import {
  getYoutubeThumbnail,
  getYoutubeFallbackThumbnail,
  timeAgo,
} from "@/lib/utils";

interface VideoCardProps {
  video: Video;
  priority?: boolean;
}

export default function VideoCard({ video, priority = false }: VideoCardProps) {
  const [imgSrc, setImgSrc] = useState(
    video.thumbnail || getYoutubeThumbnail(video.youtubeId),
  );

  return (
    <Link href={`/videos/${video.slug}`} className="group block">
      {/*, 16:9, hover scale */}
      <div className="relative w-full aspect-video overflow-hidden rounded-sm bg-[#0d0d0d]">
        <img
          src={imgSrc}
          alt=""
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          onError={() =>
            setImgSrc(getYoutubeFallbackThumbnail(video.youtubeId))
          }
        />
        {/* Hover overlay + play icon */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
            <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Meta — YouTube-like: title then views · time */}
      <div className="flex gap-3 mt-3">
        {/* Optional avatar placeholder (YouTube has channel avatar) */}
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] flex-1 font-medium text-text-main leading-snug line-clamp-2 group-hover:text-text-secondary transition-colors">
            {video.title}
          </h3>
          <p className="text-[13px] text-text-muted mt-0.5">
            {timeAgo(video.publishedAt)}
          </p>
          {video.tags.length > 0 && (
            <p className="text-[12px] text-text-muted mt-0.5">
              {video.tags[0].tag.name}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
