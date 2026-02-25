"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import type { Video } from "@/types";
import VideoCard from "./Videocard";

import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface RecentSliderProps {
  videos: Video[];
}

export default function RecentSlider({ videos }: RecentSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <section>
      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="text-4xl font-semibold text-text-main tracking-tight">
              Recent Videos
            </h2>
            <p className="text-base text-text-muted mt-0.5">
              Latest videos from our collection
            </p>
          </div>
          <Link
            href="/videos?sort=recent"
            className="text-sm font-medium text-secondary hover:underline"
          >
            View all
          </Link>
        </div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          slidesPerGroup={4}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-bullet",
            bulletActiveClass: "swiper-bullet-active",
          }}
          navigation={{
            nextEl: ".swiper-next",
            prevEl: ".swiper-prev",
          }}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={videos.length > 4}
        >
          {videos.map((video, i) => (
            <SwiperSlide key={video.id}>
              <VideoCard video={video} priority={i < 4} />
            </SwiperSlide>
          ))}
          <div className="custom-pagination flex justify-center items-center gap-2 mt-10 md:invisible md:h-0 md:overflow-hidden"></div>
        </Swiper>
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="swiper-prev absolute -left-5 top-[45%] -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 rounded-full bg-white border border-border-subtle shadow-md flex items-center justify-center text-text-main hover:bg-white/90 cursor-pointer transition-colors disabled:opacity-40"
          aria-label="Previous"
        >
          <svg
            className="w-5 h-5"
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
        </button>
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="swiper-next absolute -right-5 top-[45%] -translate-y-1/2 translate-x-2 z-10 w-10 h-10 rounded-full bg-white border border-border-subtle shadow-md flex items-center justify-center text-text-main hover:bg-white/90 cursor-pointer transition-colors disabled:opacity-40"
          aria-label="Next"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
