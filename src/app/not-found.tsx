import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl sm:text-7xl font-bold text-secondary">404</p>
        <h1 className="mt-4 text-xl sm:text-2xl font-semibold text-text-main">
          Page not found
        </h1>
        <p className="mt-2 text-text-muted">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Go home
          </Link>
          <Link
            href="/videos"
            className="inline-flex items-center justify-center rounded-lg border border-border-subtle bg-white px-5 py-2.5 text-sm font-medium text-text-main hover:bg-black/5 transition-colors"
          >
            Browse videos
          </Link>
        </div>
      </div>
    </div>
  );
}
