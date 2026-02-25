"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll background effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Artworks", href: "/artworks" },
    { label: "Videos", href: "/videos" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md  border-gray-200 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20 md:items-center">
            {/* LEFT SECTION (Mobile: hamburger + logo) */}
            <div className="flex items-center gap-3">
              {/* Hamburger */}
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="md:hidden p-2 rounded-lg hover:bg-black/5 transition"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? "✕" : "☰"}
              </button>

              {/* Left Logo */}
              <Link href="/">
                <img
                  src="https://ik.imagekit.io/bua2b1x6j/kashful/democracy.png"
                  alt="Left Logo"
                  className="h-12 md:h-12 w-auto object-contain"
                />
              </Link>
            </div>

            {/* CENTER NAV (Desktop Only) */}
            <nav className="hidden md:flex flex-1 justify-center gap-10">
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

                    {/* Active Indicator */}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] w-full bg-secondary transition-transform duration-300 origin-left ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT SECTION (Desktop Logo) */}
            <div className="hidden md:flex justify-end">
              <Link href={"/"}>
                <img
                  src="/navbar/logo.png"
                  alt="Right Logo"
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col mt-20 px-8 gap-4">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium py-3 border-b transition ${
                    isActive
                      ? "text-black border-black"
                      : "text-gray-600 border-gray-200 hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-8">
              <img
                src="/navbar/logo.png"
                alt="Right Logo"
                className="h-10 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
