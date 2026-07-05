"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, ChevronDown, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const navLinks = [
  { label: "Find Properties", href: "#properties" },
  { label: "Add a Property", href: "#add-property" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Learn More", href: "#learn-more" },
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
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] as const }}
            className="fixed top-0 left-0 right-0 z-50 bg-dark text-white text-xs"
            role="banner"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
              <div className="flex items-center gap-4">
                <a
                  href="tel:+8801535009008"
                  className="flex items-center gap-1.5 hover:text-sera-light transition-colors min-h-[28px]"
                >
                  <Phone className="w-3 h-3" aria-hidden="true" />
                  <span>+880 1535 009 008</span>
                </a>
                <span className="hidden sm:inline text-white/30" aria-hidden="true">|</span>
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
                  className="inline-flex items-center gap-1.5 bg-whatsapp hover:bg-whatsapp-dark text-white px-3 py-1.5 rounded-full text-[10px] font-semibold transition-colors min-h-[28px]"
                >
                  <WhatsAppIcon className="w-3 h-3" />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Nav */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-0 bg-white/95 backdrop-blur-md shadow-sm"
            : showContactBar
            ? "top-9 bg-transparent"
            : "top-0 bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo + Branded Text */}
            <motion.a
              href="#"
              className="flex items-center gap-2.5 shrink-0 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] as const }}
              aria-label="Sera Property - Home"
            >
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                <Image
                  src="/images/logo.png"
                  alt=""
                  width={48}
                  height={48}
                  className={`h-10 md:h-12 w-auto object-contain transition-all duration-300 ${
                    scrolled ? "" : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                  }`}
                  aria-hidden="true"
                />
              </motion.div>
              <div className="hidden sm:flex flex-col -space-y-0.5">
                <span
                  className="text-lg md:text-xl font-extrabold tracking-tight leading-none transition-colors duration-300"
                  style={{
                    fontFamily: "'Urbanist', sans-serif",
                    textShadow: scrolled ? "none" : "0 2px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  <span className={scrolled ? "text-dark" : "text-white"}>Sera</span>
                  <span className="text-sera-light"> Property</span>
                </span>
                <span
                  className={`text-[9px] md:text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                    scrolled ? "text-gray-400" : "text-white/50"
                  }`}
                >
                  Rent & Sale Made Simple
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
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 flex items-center gap-1 group min-h-[44px] ${
                    scrolled
                      ? "text-gray-700 hover:text-sera hover:bg-sera-bg/50"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Right Side: Contact + Login + Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop phone CTA */}
              <motion.a
                href="tel:+8801535009008"
                className="hidden md:inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3 min-h-[44px]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 1, 0.5, 1] as const }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Call us: 01535 009 008"
              >
                <span
                  className={`flex items-center justify-center w-11 h-11 rounded-full transition-colors duration-300 ${
                    scrolled
                      ? "bg-sera-bg text-sera"
                      : "bg-white/15 text-white"
                  }`}
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
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
                className={`hidden md:inline-flex rounded-full px-6 text-sm font-medium transition-all duration-300 min-h-[44px] ${
                  scrolled
                    ? "border-gray-300 text-dark hover:bg-gray-50"
                    : "border-white/40 text-white hover:bg-white/10"
                }`}
                disabled
                aria-disabled="true"
                title="Coming soon"
              >
                Login
              </Button>

              {/* Mobile Hamburger */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`lg:hidden min-w-[44px] min-h-[44px] ${scrolled ? "text-dark" : "text-white"}`}
                    aria-label="Open navigation menu"
                  >
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex flex-col h-full">
                    {/* Mobile header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                      <div className="flex items-center gap-2.5">
                        <Image
                          src="/images/logo.png"
                          alt=""
                          width={40}
                          height={40}
                          className="h-10 w-auto object-contain"
                          aria-hidden="true"
                        />
                        <div className="flex flex-col -space-y-0.5">
                          <span className="text-lg font-extrabold tracking-tight leading-none">
                            <span className="text-dark">Sera</span>
                            <span className="text-sera"> Property</span>
                          </span>
                          <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-gray-400">
                            Rent & Sale Made Simple
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setMobileOpen(false)}
                        className="text-gray-400 hover:text-gray-600 p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label="Close navigation menu"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Mobile contact card */}
                    <div className="p-4 mx-4 mt-4 bg-sera-bg rounded-xl border border-sera/10">
                      <a
                        href="tel:+8801535009008"
                        className="flex items-center gap-3 text-dark min-h-[44px]"
                      >
                        <span className="w-11 h-11 rounded-full bg-sera/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-4 h-4 text-sera" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Call Us</p>
                          <p className="text-sm font-semibold">+880 1535 009 008</p>
                        </div>
                      </a>
                    </div>

                    {/* Nav links */}
                    <nav className="flex-1 overflow-y-auto py-4" aria-label="Mobile navigation">
                      {navLinks.map((link, i) => (
                        <motion.a
                          key={link.label}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                          className="flex items-center justify-between px-6 py-3.5 text-gray-700 hover:bg-sera-bg/50 hover:text-sera transition-colors min-h-[44px]"
                        >
                          <span className="font-medium">{link.label}</span>
                        </motion.a>
                      ))}
                    </nav>

                    {/* Mobile bottom */}
                    <div className="p-4 space-y-3 border-t border-gray-100">
                      <a
                        href="https://wa.me/8801535009008"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-whatsapp hover:bg-whatsapp-dark text-white rounded-full py-3.5 text-sm font-semibold transition-colors min-h-[44px]"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        WhatsApp Us
                      </a>
                      <Button
                        className="w-full bg-sera hover:bg-sera-dark text-white rounded-full py-3.5 min-h-[44px]"
                        disabled
                        aria-disabled="true"
                      >
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