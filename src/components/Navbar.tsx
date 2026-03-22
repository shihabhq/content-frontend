"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const DEMOCRACY_LOGO = "/navbar/ddi.png";
const GAME_URL = "https://www.votekori.cloud/";
const BRAND_LOGO = "/navbar/logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Videos", href: "/videos" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 duration-300 ${
          isScrolled ? "bg-white shadow-sm" : ""
        }`}
      >
        <div className=" mx-auto px-4 sm:px-6 lg:px-10">
          {/* ─── ROW 1: Democracy logo (left) + Game (right) ─── */}
          <div className="flex max-w-[1400px] mx-auto items-center justify-between h-12 md:h-16">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <img
                src={DEMOCRACY_LOGO}
                alt="Digital Democracy Initiative"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <a
              href={GAME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 hover:text-secondary border border-gray-300 hover:border-secondary rounded-lg px-3 py-1.5 transition-colors"
            >
              Game
            </a>
          </div>
          <div className="border-b w-full border-gray-200"></div>
          {/* ─── ROW 2: Brand logo (left) + Nav (center) + Create (right) ─── */}
          <div className="flex max-w-[1400px] mx-auto items-center justify-between h-14 md:h-16 gap-4">
            {/* Left: brand logo */}
            <div className="flex items-center gap-16">
              <Link href="/" className="shrink-0 flex items-center">
                <img
                  src={BRAND_LOGO}
                  alt="Rights Content"
                  className="h-12 md:h-16 w-auto object-contain"
                />
              </Link>
              {/* Center: nav links (desktop) */}
              <nav className="hidden md:flex flex-1 justify-center gap-8 lg:gap-10">
                {navLinks.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="relative group py-1"
                    >
                      <span
                        className={`text-sm lg:text-base font-medium tracking-wide transition-colors duration-200 ${
                          isActive
                            ? "text-secondary"
                            : "text-gray-600 group-hover:text-secondary"
                        }`}
                      >
                        {item.label}
                      </span>
                      {/* <span
                        className={`absolute left-0 -bottom-1 h-[2px] w-full bg-secondary transition-transform duration-300 origin-left ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      /> */}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right: Create button + hamburger (mobile) */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/add-content"
                className="hidden md:inline-flex items-center justify-center rounded-lg bg-secondary text-white text-sm font-medium px-4 py-2 hover:opacity-90 transition-opacity"
              >
                Add Content
              </Link>
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <span className="text-xl leading-none">✕</span>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay + drawer */}
      <div
        className={`fixed inset-0 z-60 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 flex flex-col ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="font-semibold text-gray-900">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-3 px-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-secondary/10 text-secondary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/add-content"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center rounded-lg bg-secondary text-white font-medium py-3"
            >
              Add Content
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
