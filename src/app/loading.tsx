export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 rounded-full border-2 border-secondary border-t-transparent animate-spin"
          aria-hidden
        />
        <p className="text-sm text-text-muted">Loading…</p>
      </div>
    </div>
  );
}
