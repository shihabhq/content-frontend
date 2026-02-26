export default function VideoSlugLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full max-w-[900px] aspect-video rounded-xl bg-border-subtle animate-pulse" />
        <div className="h-10 w-10 rounded-full border-2 border-secondary border-t-transparent animate-spin" />
        <p className="text-sm text-text-muted">Loading video…</p>
      </div>
    </div>
  );
}
