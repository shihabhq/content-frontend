import type { Video, Artwork, PaginatedResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function fetcher<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// ─── Videos ───────────────────────────────────────────────

export const getRecommendedVideos = () =>
  fetcher<PaginatedResponse<Video>>("/api/videos?recommended=true&pageSize=12");

export const getFeaturedVideos = () =>
  fetcher<PaginatedResponse<Video>>("/api/videos?featured=true&pageSize=16");

export const getRecentVideos = () =>
  fetcher<PaginatedResponse<Video>>("/api/videos?sort=recent&pageSize=16");

export const getAllVideos = (page = 1, pageSize = 20) =>
  fetcher<PaginatedResponse<Video>>(
    `/api/videos?page=${page}&pageSize=${pageSize}`,
  );

export const getVideo = (slug: string) => fetcher<Video>(`/api/videos/${slug}`);

export const getVideoSuggestions = (slug: string) =>
  fetcher<Video[]>(`/api/videos/${slug}/suggestions`);

export const incrementView = (slug: string) =>
  fetch(`${API_URL}/api/videos/${slug}/view`, { method: "POST" });

export const submitVideo = (payload: {
  title: string;
  youtubeUrl: string;
  description?: string;
  tags?: string[];
  creatorName?: string;
}) =>
  fetcher<{ success: boolean }>("/api/videos/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const submitArtwork = async (payload: {
  title: string;
  content?: string;
  tags?: string[];
  creatorName?: string;
  image: File;
}) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  if (payload.content) formData.append("content", payload.content);
  if (payload.creatorName) formData.append("creatorName", payload.creatorName);
  formData.append("tags", JSON.stringify(payload.tags ?? []));
  formData.append("image", payload.image);

  const res = await fetch(`${API_URL}/api/artworks/submit`, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json() as Promise<{ success: boolean }>;
};

// ─── Artworks ─────────────────────────────────────────────

export const getFeaturedArtworks = () =>
  fetcher<PaginatedResponse<Artwork>>(
    "/api/artworks?featured=true&pageSize=12",
  );

export const getAllArtworks = (page = 1, pageSize = 12) =>
  fetcher<PaginatedResponse<Artwork>>(
    `/api/artworks?page=${page}&pageSize=${pageSize}`,
  );

export const getArtwork = (slug: string) =>
  fetcher<Artwork>(`/api/artworks/${slug}`);

export const getArtworkSuggestions = (slug: string) =>
  fetcher<Artwork[]>(`/api/artworks/${slug}/suggestions`);
