"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt="Dhaka city skyline — premium rental properties"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Brand badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#5dade2] animate-pulse" />
            <span className="text-white/70 text-xs font-medium tracking-wide">
              Trusted by 10,000+ tenants in Dhaka
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
            Renting Made{" "}
            <motion.span
              className="text-[#5dade2] inline-block"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              Simple
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/60 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Discover your perfect home or commercial space across Dhaka with
            verified listings and seamless experience.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <label htmlFor="hero-search" className="sr-only">Search properties by area, landmarks, or location</label>
              <Input
                id="hero-search"
                placeholder="Search by Area, Landmarks, or Location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 sm:py-5 border-0 text-base rounded-none focus-visible:ring-0 h-auto"
              />
            </div>
            <div className="flex items-center border-t sm:border-t-0 sm:border-l border-gray-100">
              <Button
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 text-gray-600 hover:text-sera hover:bg-sera-bg/50 rounded-none h-full py-4 sm:py-5"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Filters</span>
              </Button>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-sera hover:bg-sera-dark text-white rounded-none px-6 sm:px-8 h-auto py-4 sm:py-5 text-sm font-semibold transition-colors">
                  Search
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-2xl shadow-2xl mt-3 max-w-2xl mx-auto p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-dark">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                      Property Type
                    </label>
                    <div className="relative">
                      <select aria-label="Property type" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm appearance-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sera/20 focus:border-sera">
                        <option>Residential</option>
                        <option>Commercial</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                      Bedrooms
                    </label>
                    <div className="relative">
                      <select aria-label="Number of bedrooms" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm appearance-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sera/20 focus:border-sera">
                        <option>Select</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5+</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                      Price Range
                    </label>
                    <div className="relative">
                      <select aria-label="Price range" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm appearance-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sera/20 focus:border-sera">
                        <option>Select Range</option>
                        <option>Under 25,000</option>
                        <option>25,000 - 50,000</option>
                        <option>50,000 - 100,000</option>
                        <option>100,000+</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs text-gray-500"
                  >
                    Reset all
                  </Button>
                  <Button
                    size="sm"
                    className="bg-sera hover:bg-sera-dark text-white text-xs"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Explore Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8"
        >
          <a
            href="#properties"
            className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white/80 transition-colors group"
          >
            <span>Explore Properties</span>
            <svg
              className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}