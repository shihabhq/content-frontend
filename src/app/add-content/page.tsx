"use client";

import { useState, useCallback, useRef } from "react";
import { X } from "lucide-react";
import { submitArtwork, submitVideo } from "@/lib/api";

export default function AddContentPage() {
  const [contentType, setContentType] = useState<"artwork" | "video">("artwork");

  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tagsString, setTagsString] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [artworkImage, setArtworkImage] = useState<File | null>(null);
  const [artworkPreview, setArtworkPreview] = useState<string | null>(null);
  const artworkInputRef = useRef<HTMLInputElement>(null);
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

        if (contentType === "video") {
          await submitVideo({
            title,
            youtubeUrl,
            description: description || undefined,
            creatorName: creatorName || undefined,
            tags,
          });
          setSuccessMessage("Submitted successfully. Your content is under review.");
        } else {
          if (!artworkImage) {
            setErrorMessage("Please upload an artwork image.");
            setSubmitting(false);
            return;
          }
          await submitArtwork({
            title,
            content: description || undefined,
            creatorName: creatorName || undefined,
            tags,
            image: artworkImage,
          });
          setSuccessMessage(
            "Artworks submitted successfully. Your submission is under review and you will get update soon.",
          );
        }

        setTitle("");
        setYoutubeUrl("");
        setDescription("");
        setTagsString("");
        setCreatorName("");
        setArtworkImage(null);
        setArtworkPreview(null);
      } catch {
        setErrorMessage(
          "Something went wrong. Please check the fields and try again.",
        );
      } finally {
        setSubmitting(false);
      }
    },
    [contentType, title, youtubeUrl, description, tagsString, creatorName, artworkImage],
  );

  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-[1000px] rounded-xl border border-border-subtle bg-background-surface mx-auto px-4 sm:px-6 py-10 md:py-16 my-16">
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-lg border border-border-subtle bg-background-light p-1">
            <button
              type="button"
              onClick={() => setContentType("artwork")}
              className={`px-4 py-2 text-sm rounded-md transition ${
                contentType === "artwork"
                  ? "bg-secondary text-white"
                  : "text-text-main hover:bg-background-surface"
              }`}
            >
              Upload artwork
            </button>
            <button
              type="button"
              onClick={() => setContentType("video")}
              className={`px-4 py-2 text-sm rounded-md transition ${
                contentType === "video"
                  ? "bg-secondary text-white"
                  : "text-text-main hover:bg-background-surface"
              }`}
            >
              Upload video
            </button>
          </div>
        </div>

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
              {contentType === "video" ? "Video info" : "Artwork info"}
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
              {contentType === "video" ? (
                <>
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
                </>
              ) : (
                <>
                  <label className="block text-xs font-medium text-text-main mb-1.5">
                    Artwork image <span className="text-secondary">*</span>
                  </label>
                  <input
                    ref={artworkInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      setArtworkImage(file);
                      setArtworkPreview(file ? URL.createObjectURL(file) : null);
                    }}
                  />
                  {!artworkImage && (
                    <button
                      type="button"
                      onClick={() => artworkInputRef.current?.click()}
                      className="inline-flex items-center cursor-pointer justify-center rounded-lg border border-border-subtle bg-background-surface px-4 py-2.5 text-sm font-medium text-text-main hover:border-secondary hover:text-secondary transition-colors"
                    >
                      Upload image
                    </button>
                  )}
                  {artworkPreview && (
                    <div className="relative mt-2 h-40 w-full sm:w-72 overflow-hidden rounded-lg border border-border-subtle bg-background-light">
                      <button
                        type="button"
                        onClick={() => {
                          setArtworkImage(null);
                          setArtworkPreview(null);
                          if (artworkInputRef.current) artworkInputRef.current.value = "";
                        }}
                        className="absolute right-2 cursor-pointer top-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-text-main shadow-sm hover:bg-white"
                        aria-label="Remove selected image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <img
                        src={artworkPreview}
                        alt="Artwork preview"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                </>
              )}
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
                placeholder={
                  contentType === "video"
                    ? "What is this video about? Why should people watch it?"
                    : "Describe this artwork and its context."
                }
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
                {submitting ? "Submitting…" : contentType === "video" ? "Submit video" : "Submit artwork"}
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
              {(
                contentType === "video"
                  ? [
                      "Videos must be publicly available on YouTube",
                      "Content should relate to rights, democracy, or civic education",
                      "Our team reviews all submissions — this may take 1–3 days",
                      "You'll be credited if you provide your name",
                    ]
                  : [
                      "Upload clear artwork images (JPG/PNG/WEBP).",
                      "Artwork should relate to rights, democracy, or civic education.",
                      "Our team reviews all submissions before publishing.",
                      "You'll be credited if you provide your name.",
                    ]
              ).map((item) => (
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
                <a href="/contact" className="text-secondary font-medium hover:underline">
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
