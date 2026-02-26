import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Digital Democracy Content Library team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-text-main">
          Contact
        </h1>
        <p className="mt-2 text-text-muted">We’d love to hear from you</p>

        <div className="mt-10 rounded-xl border border-border-subtle bg-white p-6 space-y-6">
          <div>
            <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider">
              Email
            </h2>
            <a
              href="mailto:kashfulworld@gmail.com"
              className="mt-1 block text-text-main font-medium hover:text-secondary transition-colors"
            >
              kashfulworld@gmail.com
            </a>
          </div>
          <div>
            <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider">
              Phone
            </h2>
            <a
              href="tel:+1234567890"
              className="mt-1 block text-text-main font-medium hover:text-secondary transition-colors"
            >
              +880 1622-678890
            </a>
          </div>
          <div>
            <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider">
              Address
            </h2>
            <p className="mt-1 text-text-main">
              Kashful Foundation
              <br />
              392,Gulbagh,Dhaka, Dhaka,
              <br />
              Bangladesh, 1217
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider">
              General inquiries
            </h2>
            <p className="mt-1 text-text-muted text-sm leading-relaxed">
              For questions about the content library, partnerships, or how to
              contribute, reach out using the details above.
            </p>
          </div>
        </div>

        <p className="mt-10 text-sm text-text-muted">
          <Link href="/" className="text-secondary hover:underline">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
