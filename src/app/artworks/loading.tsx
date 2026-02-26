export default function ArtworksLoading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 rounded-full border-2 border-secondary border-t-transparent animate-spin"
          aria-hidden
        />
        <p className="text-sm text-text-muted">Loading artworks…</p>
      </div>
    </div>
  );
}
