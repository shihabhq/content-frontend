import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the Kashful Content Library and our civic tech initiative.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-text-main">
          About
        </h1>
        <p className="mt-2 text-text-muted">
          Kashful Content Library
        </p>

        <div className="mt-10 prose prose-gray max-w-none">
          <p className="text-text-main leading-relaxed">
            This is a civic tech content library built to share videos and artworks
            from our community. Our goal is to make civic education and creative
            expression more accessible and discoverable.
          </p>
          <p className="mt-4 text-text-main leading-relaxed">
            Content is curated by our team and partners. We focus on clarity,
            impact, and diverse perspectives that support democratic engagement
            and accountability.
          </p>
          <p className="mt-4 text-text-main leading-relaxed">
            This project is implemented under the{" "}
            <a
              href="https://ddisouthasia.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline font-medium"
            >
              DDI South Asia
            </a>{" "}
            initiative.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle">
          <h2 className="text-xl font-semibold text-text-main">
            Get in touch
          </h2>
          <p className="mt-2 text-text-muted">
            Have questions or want to contribute? Visit our{" "}
            <a href="/contact" className="text-secondary hover:underline font-medium">
              Contact
            </a>{" "}
            page.
          </p>
        </div>
      </div>
    </div>
  );
}
