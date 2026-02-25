export default function SectionDivider() {
  return (
    <div className="flex items-center gap-4 my-2" aria-hidden>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--color-border-subtle)] to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-text-secondary opacity-60" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--color-border-subtle)] to-transparent" />
    </div>
  );
}
