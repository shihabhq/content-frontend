import {
  getRecommendedVideos,
  getFeaturedVideos,
  getFeaturedArtworks,
  getRecentVideos,
  getAllArtworks,
} from "@/lib/api";
import RecommendedSlider from "@/components/Recommendedslider";
import FeaturedVideosSection from "@/components/FeaturedVideoSection";
import FeaturedArtworksSection from "@/components/FeaturedArtworkSection";
import RecentSlider from "@/components/RecentSlider";

// export const revalidate = 3600;

export default async function HomePage() {
  const [
    recommendedRes,
    featuredVideosRes,
    featuredArtworksRes,
    recentVideosRes,
    allArtworksRes,
  ] = await Promise.allSettled([
    getRecommendedVideos(),
    getFeaturedVideos(),
    getFeaturedArtworks(),
    getRecentVideos(),
    getAllArtworks(1, 12),
  ]);

  const recommended =
    recommendedRes.status === "fulfilled" ? recommendedRes.value.data : [];
  const featuredVideos =
    featuredVideosRes.status === "fulfilled"
      ? featuredVideosRes.value.data
      : [];
  const featuredArtworks =
    featuredArtworksRes.status === "fulfilled"
      ? featuredArtworksRes.value.data
      : [];
  const recentVideos =
    recentVideosRes.status === "fulfilled" ? recentVideosRes.value.data : [];
  const allArtworks =
    allArtworksRes.status === "fulfilled" ? allArtworksRes.value.data : [];

  const sliderVideos = recommended.length > 0 ? recommended : recentVideos;
  const sectionVideos =
    featuredVideos.length > 0 ? featuredVideos : recentVideos;
  const sectionArtworks =
    featuredArtworks.length > 0 ? featuredArtworks : allArtworks;

  return (
    <div className="min-h-screen bg-background-light">
      {/* Content sections */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 space-y-12">
        {sliderVideos.length > 0 && <RecommendedSlider videos={sliderVideos} />}

        {sectionVideos.length > 0 && (
          <FeaturedVideosSection videos={sectionVideos} />
        )}

        {recentVideos.length > 0 && <RecentSlider videos={recentVideos} />}

        {sectionArtworks.length > 0 && (
          <FeaturedArtworksSection artworks={sectionArtworks} />
        )}
      </div>
    </div>
  );
}
