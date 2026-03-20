"use client";

import { useState, useCallback } from "react";
import { submitVideo } from "@/lib/api";

export default function AddContentPage() {
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tagsString, setTagsString] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage("");
      setSuccessMessage("");
      setSubmitting(true);
      try {
        const tags = tagsString
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        await submitVideo({
          title,
          youtubeUrl,
          description: description || undefined,
          creatorName: creatorName || undefined,
          tags,
        });
        setSuccessMessage(
          "Submitted successfully. Your content is under review.",
        );
        setTitle("");
        setYoutubeUrl("");
        setDescription("");
        setTagsString("");
        setCreatorName("");
      } catch {
        setErrorMessage(
          "Something went wrong. Please check the fields and try again.",
        );
      } finally {
        setSubmitting(false);
      }
    },
    [title, youtubeUrl, description, tagsString, creatorName],
  );

  return (
    <div className="min-h-screen font-sans">
      {/* Header strip */}
      {/* <div className="bg-primary px-6 py-10 md:py-12">
        <div className="max-w-[780px] mx-auto">
          <span className="inline-flex items-center gap-2 bg-secondary text-white text-[11px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded mb-4">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1v14M1 8h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Submit content
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white leading-tight mb-3">
            Add a video resource
          </h1>
          <p className="text-[#9ca8b4] text-sm leading-relaxed max-w-lg">
            Share a YouTube video that helps people learn about rights,
            democracy, or civic engagement. Our team reviews every submission
            before it goes live.
          </p>
        </div>
      </div> */}

      {/* Body */}
      <div className="max-w-[1000px] rounded-xl border border-border-subtle bg-background-surface mx-auto px-4 sm:px-6 py-10 md:py-16 my-16">
        {successMessage && (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">
          {/* Left: form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-secondary mb-4">
              Video info
            </p>

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Video title <span className="text-secondary">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={200}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. How Elections Work in a Democracy"
                className="w-full rounded-lg border-[1.5px] border-border-subtle bg-background-surface px-3 py-2.5 text-sm text-text-main outline-none focus:border-secondary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                YouTube link <span className="text-secondary">*</span>
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="url"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-border-subtle bg-background-surface pl-9 pr-3 py-2.5 text-sm text-text-main outline-none focus:border-secondary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-main mb-1.5">
                Description <span className="text-secondary">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this video about? Why should people watch it?"
                className="w-full rounded-lg border-[1.5px] border-border-subtle bg-background-surface px-3 py-2.5 text-sm text-text-main outline-none focus:border-secondary transition-colors resize-y"
              />
            </div>

            <div className="border-t border-border-subtle pt-5">
              <p className="text-[11px] font-semibold tracking-widest uppercase text-secondary mb-4">
                About the submission
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-text-main mb-1.5">
                    Creator Name <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Creator Name"
                    required
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    className="w-full rounded-lg border-[1.5px] border-border-subtle bg-background-surface px-3 py-2.5 text-sm text-text-main outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-main mb-1.5">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="elections, youth, civic tech"
                    value={tagsString}
                    onChange={(e) => setTagsString(e.target.value)}
                    className="w-full rounded-lg border-[1.5px] border-border-subtle bg-background-surface px-3 py-2.5 text-sm text-text-main outline-none focus:border-secondary transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="bg-secondary text-white rounded-lg px-5 py-2.5 text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity"
              >
                {submitting ? "Submitting…" : "Submit video"}
              </button>
              <span className="text-xs text-text-muted">
                Fields marked <span className="text-secondary">*</span> are
                required
              </span>
            </div>
          </form>

          {/* Right: guidelines */}
          <aside className="lg:sticky lg:top-6 bg-background-light rounded-xl border border-border-subtle p-5">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-text-muted mb-4">
              Submission guidelines
            </p>
            <ul className="space-y-3">
              {[
                "Videos must be publicly available on YouTube",
                "Content should relate to rights, democracy, or civic education",
                "Our team reviews all submissions — this may take 1–3 days",
                "You'll be credited if you provide your name",
              ].map((item) => (
                <li key={item} className="flex gap-2.5 items-start">
                  <span className="mt-0.5 w-4 h-4 min-w-[1rem] rounded-full bg-primary flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2.5 2.5L8 2.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-xs text-text-muted leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-border-subtle">
              <p className="text-xs text-text-muted">
                Questions?{" "}
                <a
                  href="/contact"
                  className="text-secondary font-medium hover:underline"
                >
                  Contact us →
                </a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
