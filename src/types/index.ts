export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface VideoTag {
  tagId: string;
  videoId: string;
  tag: Tag;
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  youtubeUrl: string;
  youtubeId: string;
  description?: string | null;
  thumbnail?: string | null;
  isFeatured: boolean;
  isRecommended: boolean;
  viewCount: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  tags: VideoTag[];
}

export interface ArtworkTag {
  tagId: string;
  artworkId: string;
  tag: Tag;
}

export interface Artwork {
  id: string;
  title: string;
  slug: string;
  content?: string | null;
  imageUrl: string;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  tags: ArtworkTag[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
