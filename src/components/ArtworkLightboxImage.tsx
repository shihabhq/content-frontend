"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type ArtworkLightboxImageProps = {
  src: string;
  alt: string;
};

export default function ArtworkLightboxImage({
  src,
  alt,
}: ArtworkLightboxImageProps) {
  const [open, setOpen] = useState(false);
  

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative w-full aspect-video rounded-lg overflow-hidden bg-background-surface shadow-xl shadow-black/10 cursor-zoom-in"
        aria-label="Open artwork image in lightbox"
      >
        {/* Image with scale */}
        <img
          src={src}
          alt={alt}
          loading="eager"
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-400 ease-out" />

        {/* Zoom icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 scale-75 group-hover:scale-100 transition-transform duration-300 ease-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 8v6M8 11h6"
              />
            </svg>
          </div>
        </div>
      </button>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src, alt }]}
        carousel={{ finite: true }}
      />
    </>
  );
}

