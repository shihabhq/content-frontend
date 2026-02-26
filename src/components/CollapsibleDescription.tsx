"use client";

import { useState } from "react";

const WORD_LIMIT = 50;

function getWords(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

interface CollapsibleDescriptionProps {
  description: string;
  className?: string;
}

export default function CollapsibleDescription({
  description,
  className = "",
}: CollapsibleDescriptionProps) {
  const words = getWords(description);
  const isLong = words.length > WORD_LIMIT;
  const [expanded, setExpanded] = useState(false);

  if (!description?.trim()) return null;

  const displayText = isLong && !expanded
    ? words.slice(0, WORD_LIMIT).join(" ") + (words.length > WORD_LIMIT ? "…" : "")
    : description;

  return (
    <div className={className}>
      <p className="text-text-muted text-sm leading-relaxed whitespace-pre-line">
        {displayText}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-sm font-medium text-secondary hover:underline"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}
