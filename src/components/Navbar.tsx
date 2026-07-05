"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Find Properties", href: "#properties" },
  { label: "Add a Property", href: "#add-property" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Learn More", href: "#learn-more", hasDropdown: true },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center">
            {scrolled ? (
              <img
                src="/images/logo.png"
                alt="Sera Property"
                className="h-9 md:h-10 w-auto rounded-lg"
              />
            ) : (
              <img
                src="/images/logo.png"
                alt="Sera Property"
                className="h-9 md:h-10 w-auto rounded-lg shadow-lg shadow-black/20"
              />
            )}
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-1 hover:bg-white/10 ${
                  scrolled
                    ? "text-gray-700 hover:text-dark hover:bg-gray-100"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
                {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
              </a>
            ))}
          </div>

          {/* Login Button + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              variant={scrolled ? "outline" : "ghost"}
              className={`hidden md:inline-flex rounded-full px-6 text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? "border-gray-300 text-dark hover:bg-gray-50"
                  : "border-white/40 text-white hover:bg-white/10"
              }`}
            >
              Login
            </Button>

            {/* Mobile Hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`lg:hidden ${scrolled ? "text-dark" : "text-white"}`}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <img
                      src="/images/logo.png"
                      alt="Sera Property"
                      className="h-8 w-auto"
                    />
                  </div>
                  <div className="flex-1 overflow-y-auto py-4">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between px-6 py-3.5 text-gray-700 hover:bg-gray-50 hover:text-sera transition-colors"
                      >
                        <span className="font-medium">{link.label}</span>
                        {link.hasDropdown && (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </a>
                    ))}
                  </div>
                  <div className="p-6 border-t border-gray-100">
                    <Button className="w-full bg-sera hover:bg-sera-dark text-white rounded-full py-3">
                      Login
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}