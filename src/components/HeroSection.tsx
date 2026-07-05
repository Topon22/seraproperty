"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface FilterState {
  listingType: "rent" | "sale";
  propertyType: string;
  bedrooms: string;
  priceRange: string;
  searchQuery: string;
}

export const defaultFilters: FilterState = {
  listingType: "rent",
  propertyType: "all",
  bedrooms: "all",
  priceRange: "all",
  searchQuery: "",
};

interface HeroSectionProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function HeroSection({ filters, onFilterChange }: HeroSectionProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleListingTypeChange = (type: "rent" | "sale") => {
    onFilterChange({ ...filters, listingType: type });
  };

  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, searchQuery: value });
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleReset = () => {
    onFilterChange(defaultFilters);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt="Dhaka city skyline — premium properties for rent and sale"
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
              Trusted by 10,000+ clients in Dhaka
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
            {filters.listingType === "rent" ? (
              <>Renting Made{" "}
                <motion.span
                  key="rent-simple"
                  className="text-[#5dade2] inline-block"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                  Simple
                </motion.span>
              </>
            ) : (
              <>Find Your{" "}
                <motion.span
                  key="sale-dream"
                  className="text-[#5dade2] inline-block"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                  Dream Property
                </motion.span>
              </>
            )}
          </h1>
          <motion.p
            key={filters.listingType}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/60 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed"
          >
            {filters.listingType === "rent"
              ? "Discover your perfect home or commercial space across Dhaka with verified listings and a seamless rental experience."
              : "Explore premium apartments, commercial spaces, and investment-grade properties for sale across Dhaka's best neighborhoods."}
          </motion.p>
        </motion.div>

        {/* Rent / Sale Toggle + Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          {/* Rent / Sale Toggle Pills */}
          <div className="flex items-center justify-center gap-1 mb-4">
            <div className="inline-flex bg-white/10 backdrop-blur-sm border border-white/15 rounded-full p-1">
              <button
                onClick={() => handleListingTypeChange("rent")}
                className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 min-h-[40px] ${
                  filters.listingType === "rent"
                    ? "bg-[#5dade2] text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                aria-pressed={filters.listingType === "rent"}
              >
                For Rent
              </button>
              <button
                onClick={() => handleListingTypeChange("sale")}
                className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 min-h-[40px] ${
                  filters.listingType === "sale"
                    ? "bg-[#5dade2] text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                aria-pressed={filters.listingType === "sale"}
              >
                For Sale
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <label htmlFor="hero-search" className="sr-only">Search properties by area, landmarks, or location</label>
              <Input
                id="hero-search"
                placeholder={filters.listingType === "rent" ? "Search Rentals by Area or Location" : "Search Properties for Sale by Area or Location"}
                value={filters.searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-12 pr-4 py-4 sm:py-5 border-0 text-base rounded-none focus-visible:ring-0 h-auto"
              />
            </div>
            <div className="flex items-center border-t sm:border-t-0 sm:border-l border-gray-100">
              <Button
                variant="ghost"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 text-gray-600 hover:text-sera hover:bg-sera-bg/50 rounded-none h-full py-4 sm:py-5 relative"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Filters</span>
                {(filters.propertyType !== "all" || filters.bedrooms !== "all" || filters.priceRange !== "all") && (
                  <span className="absolute top-2 right-2 sm:top-2 sm:right-2 w-2 h-2 bg-sera rounded-full" />
                )}
              </Button>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="#properties"
                  className="bg-sera hover:bg-sera-dark text-white rounded-none px-6 sm:px-8 h-auto py-4 sm:py-5 text-sm font-semibold transition-colors flex items-center justify-center"
                >
                  Search
                </a>
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
                  <h3 className="text-sm font-semibold text-dark">
                    Filters
                    {(filters.propertyType !== "all" || filters.bedrooms !== "all" || filters.priceRange !== "all") && (
                      <span className="ml-2 text-xs font-normal text-gray-400">
                        (Active)
                      </span>
                    )}
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close filters"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="filter-type" className="text-xs font-medium text-gray-500 mb-1.5 block">
                      Property Type
                    </label>
                    <div className="relative">
                      <select
                        id="filter-type"
                        aria-label="Property type"
                        value={filters.propertyType}
                        onChange={(e) => handleFilterChange("propertyType", e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm appearance-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sera/20 focus:border-sera"
                      >
                        <option value="all">All Types</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="filter-beds" className="text-xs font-medium text-gray-500 mb-1.5 block">
                      Bedrooms
                    </label>
                    <div className="relative">
                      <select
                        id="filter-beds"
                        aria-label="Number of bedrooms"
                        value={filters.bedrooms}
                        onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm appearance-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sera/20 focus:border-sera"
                      >
                        <option value="all">Any</option>
                        <option value="1">1 Bed</option>
                        <option value="2">2 Beds</option>
                        <option value="3">3 Beds</option>
                        <option value="4">4 Beds</option>
                        <option value="5">5+ Beds</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="filter-price" className="text-xs font-medium text-gray-500 mb-1.5 block">
                      {filters.listingType === "rent" ? "Rent Range" : "Price Range"}
                    </label>
                    <div className="relative">
                      <select
                        id="filter-price"
                        aria-label="Price range"
                        value={filters.priceRange}
                        onChange={(e) => handleFilterChange("priceRange", e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm appearance-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sera/20 focus:border-sera"
                      >
                        <option value="all">Any Price</option>
                        {filters.listingType === "rent" ? (
                          <>
                            <option value="0-40000">Under ৳40,000/mo</option>
                            <option value="40000-60000">৳40,000 - ৳60,000/mo</option>
                            <option value="60000-100000">৳60,000 - ৳1,00,000/mo</option>
                            <option value="100000-999999999">৳1,00,000+/mo</option>
                          </>
                        ) : (
                          <>
                            <option value="0-15000000">Under ৳1.5 Crore</option>
                            <option value="15000000-30000000">৳1.5 - ৳3 Crore</option>
                            <option value="30000000-50000000">৳3 - ৳5 Crore</option>
                            <option value="50000000-999999999">৳5 Crore+</option>
                          </>
                        )}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="text-xs text-gray-500"
                  >
                    Reset all
                  </Button>
                  <a
                    href="#properties"
                    className="inline-flex items-center bg-sera hover:bg-sera-dark text-white rounded-lg px-4 py-1.5 text-xs font-medium transition-colors"
                  >
                    Apply
                  </a>
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
          className="mt-6"
        >
          <a
            href="#properties"
            className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white/80 transition-colors group"
          >
            <span>Explore {filters.listingType === "rent" ? "Rental" : "Sale"} Properties</span>
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