"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, ChevronDown, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Find Properties", href: "#properties" },
  { label: "Add a Property", href: "#add-property" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Learn More", href: "#learn-more", hasDropdown: true },
  { label: "Contact Us", href: "#contact" },
];

const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.25, 1, 0.5, 1] as const },
  }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showContactBar, setShowContactBar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowContactBar(window.scrollY < 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top contact bar - slides away on scroll */}
      <AnimatePresence>
        {showContactBar && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-dark text-white text-xs"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
              <div className="flex items-center gap-4">
                <a
                  href="tel:+8801535009008"
                  className="flex items-center gap-1.5 hover:text-sera-light transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>+880 1535 009 008</span>
                </a>
                <span className="hidden sm:inline text-white/30">|</span>
                <a
                  href="mailto:info@seraproperty.com"
                  className="hidden sm:inline hover:text-sera-light transition-colors"
                >
                  info@seraproperty.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/50 hidden sm:inline">Weekdays 10am - 8pm</span>
                <a
                  href="https://wa.me/8801535009008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe57] text-white px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors"
                >
                  <svg viewBox="0 0 32 32" fill="white" className="w-3 h-3" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.914 15.914 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.314 22.61c-.39 1.1-1.932 2.014-3.17 2.28-.846.18-1.95.324-5.66-1.216-4.748-1.97-7.804-6.81-8.04-7.13-.228-.318-1.928-2.568-1.928-4.9s1.22-3.48 1.654-3.954c.434-.474.948-.594 1.264-.594.316 0 .632.002.908.016.292.016.684-.11 1.07.818.39.94 1.33 3.25 1.448 3.484.118.236.196.512.04.828-.158.316-.236.512-.472.788-.236.276-.498.616-.71.828-.236.236-.482.492-.206.964.276.472 1.226 2.024 2.632 3.278 1.808 1.614 3.332 2.114 3.806 2.35.472.236.748.198 1.024-.118.276-.316 1.186-1.382 1.502-1.856.316-.472.632-.394 1.066-.236.434.158 2.748 1.296 3.222 1.532.472.236.788.354.906.55.118.196.118 1.124-.272 2.224z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Nav */}
      <nav
        className={`fixed top-9 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-0 bg-white/95 backdrop-blur-md shadow-sm"
            : showContactBar
            ? "top-9 bg-transparent"
            : "top-0 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo + Branded Text */}
            <motion.a
              href="#"
              className="flex items-center gap-2.5 shrink-0 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              <motion.img
                src="/images/logo.png"
                alt="Sera Property"
                className={`h-10 md:h-12 w-auto object-contain transition-all duration-300 ${
                  scrolled
                    ? ""
                    : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              />
              <div className="hidden sm:flex flex-col -space-y-0.5">
                <span
                  className={`text-lg md:text-xl font-extrabold tracking-tight leading-none transition-colors duration-300`}
                  style={{
                    fontFamily: "'Urbanist', sans-serif",
                    textShadow: scrolled ? "none" : "0 2px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  <span className={scrolled ? "text-dark" : "text-white"}>Sera</span>
                  <span className="text-[#5dade2]"> Property</span>
                </span>
                <span
                  className={`text-[9px] md:text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                    scrolled ? "text-gray-400" : "text-white/50"
                  }`}
                >
                  Renting Made Simple
                </span>
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  custom={i}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-1 group ${
                    scrolled
                      ? "text-gray-700 hover:text-sera hover:bg-sera-bg/50"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                  <span
                    className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                      scrolled ? "bg-sera" : "bg-white"
                    } w-0 group-hover:w-5`}
                  />
                </motion.a>
              ))}
            </div>

            {/* Right Side: Contact + Login + Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop phone CTA */}
              <motion.a
                href="tel:+8801535009008"
                className="hidden md:inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${
                    scrolled
                      ? "bg-sera-bg text-sera"
                      : "bg-white/15 text-white"
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <span
                  className={`hidden lg:inline transition-colors duration-300 ${
                    scrolled ? "text-dark" : "text-white/90"
                  }`}
                >
                  01535 009 008
                </span>
              </motion.a>

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
                    {/* Mobile header with logo + branded text */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="/images/logo.png"
                          alt="Sera Property"
                          className="h-10 w-auto object-contain"
                        />
                        <div className="flex flex-col -space-y-0.5">
                          <span className="text-lg font-extrabold tracking-tight leading-none">
                            <span className="text-dark">Sera</span>
                            <span className="text-sera"> Property</span>
                          </span>
                          <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-gray-400">
                            Renting Made Simple
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setMobileOpen(false)}
                        className="text-gray-400 hover:text-gray-600 p-1"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Mobile contact card */}
                    <div className="p-4 mx-4 mt-4 bg-sera-bg rounded-xl border border-sera/10">
                      <a
                        href="tel:+8801535009008"
                        className="flex items-center gap-3 text-dark"
                      >
                        <span className="w-9 h-9 rounded-full bg-sera/10 flex items-center justify-center">
                          <Phone className="w-4 h-4 text-sera" />
                        </span>
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Call Us</p>
                          <p className="text-sm font-semibold">+880 1535 009 008</p>
                        </div>
                      </a>
                    </div>

                    {/* Nav links */}
                    <div className="flex-1 overflow-y-auto py-4">
                      {navLinks.map((link, i) => (
                        <motion.a
                          key={link.label}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                          className="flex items-center justify-between px-6 py-3.5 text-gray-700 hover:bg-sera-bg/50 hover:text-sera transition-colors"
                        >
                          <span className="font-medium">{link.label}</span>
                          {link.hasDropdown && (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </motion.a>
                      ))}
                    </div>

                    {/* Mobile bottom */}
                    <div className="p-4 space-y-3 border-t border-gray-100">
                      <a
                        href="https://wa.me/8801535009008"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full py-3 text-sm font-semibold transition-colors"
                      >
                        <svg viewBox="0 0 32 32" fill="white" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.914 15.914 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.314 22.61c-.39 1.1-1.932 2.014-3.17 2.28-.846.18-1.95.324-5.66-1.216-4.748-1.97-7.804-6.81-8.04-7.13-.228-.318-1.928-2.568-1.928-4.9s1.22-3.48 1.654-3.954c.434-.474.948-.594 1.264-.594.316 0 .632.002.908.016.292.016.684-.11 1.07.818.39.94 1.33 3.25 1.448 3.484.118.236.196.512.04.828-.158.316-.236.512-.472.788-.236.276-.498.616-.71.828-.236.236-.482.492-.206.964.276.472 1.226 2.024 2.632 3.278 1.808 1.614 3.332 2.114 3.806 2.35.472.236.748.198 1.024-.118.276-.316 1.186-1.382 1.502-1.856.316-.472.632-.394 1.066-.236.434.158 2.748 1.296 3.222 1.532.472.236.788.354.906.55.118.196.118 1.124-.272 2.224z" />
                        </svg>
                        WhatsApp Us
                      </a>
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
    </>
  );
}