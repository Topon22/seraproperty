"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import { AlertTriangle, RefreshCw } from "lucide-react";
import HeroSection, { type FilterState, defaultFilters } from "@/components/HeroSection";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const PropertyCarousel = dynamic(() => import("@/components/PropertyCarousel"), { ssr: false });
const WhyChooseSection = dynamic(() => import("@/components/WhyChooseSection"), { ssr: false });
const SeraViewSection = dynamic(() => import("@/components/SeraViewSection"), { ssr: false });
const BlogSection = dynamic(() => import("@/components/BlogSection"), { ssr: false });
const ExploreSection = dynamic(() => import("@/components/ExploreSection"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });

interface Property {
  id: string;
  title: string;
  location: string;
  area: string;
  price: number;
  priceUnit: string;
  listingType: string;
  bedrooms: number | null;
  bathrooms: number | null;
  sqft: number | null;
  type: string;
  category: string | null;
  spaceType: string | null;
  furnished: string;
  featured: boolean;
  hasView: boolean;
  imageUrl: string;
  imageUrls: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  author: string | null;
  readTime: string | null;
  publishedAt: string | null;
}

function ErrorBanner({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center" role="alert">
      <AlertTriangle className="w-12 h-12 text-amber-400 mb-4" aria-hidden="true" />
      <h2 className="text-lg font-semibold text-dark mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-gray-500 mb-6 max-w-md">
        We couldn&apos;t load the latest properties. Please check your connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 bg-sera hover:bg-sera-dark text-white rounded-full px-6 py-2.5 text-sm font-medium transition-colors"
        aria-label="Retry loading properties"
      >
        <RefreshCw className="w-4 h-4" aria-hidden="true" />
        Try Again
      </button>
    </div>
  );
}

function PropertySkeleton() {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[300px]" aria-hidden="true">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
        <div className="h-[200px] bg-gray-100 animate-pulse" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse" />
          <div className="flex gap-3">
            <div className="h-3 bg-gray-100 rounded w-16 animate-pulse" />
            <div className="h-3 bg-gray-100 rounded w-16 animate-pulse" />
            <div className="h-3 bg-gray-100 rounded w-20 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogSkeleton() {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[360px]" aria-hidden="true">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
        <div className="h-48 bg-gray-100 animate-pulse" />
        <div className="p-5 space-y-3">
          <div className="h-3 bg-gray-100 rounded w-24 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
          <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function applyFilters(properties: Property[], filters: FilterState): Property[] {
  let result = properties;

  // Filter by listing type
  result = result.filter((p) => p.listingType === filters.listingType);

  // Filter by property type
  if (filters.propertyType !== "all") {
    result = result.filter((p) => p.type === filters.propertyType);
  }

  // Filter by bedrooms
  if (filters.bedrooms !== "all") {
    const bedNum = parseInt(filters.bedrooms, 10);
    if (filters.bedrooms === "5") {
      result = result.filter((p) => p.bedrooms !== null && p.bedrooms >= 5);
    } else {
      result = result.filter((p) => p.bedrooms === bedNum);
    }
  }

  // Filter by price range
  if (filters.priceRange !== "all") {
    const [min, max] = filters.priceRange.split("-").map(Number);
    result = result.filter((p) => p.price >= min && p.price <= max);
  }

  // Filter by search query
  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.area.toLowerCase().includes(query)
    );
  }

  return result;
}

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const abortRef = useRef<AbortController | null>(null);

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false);
  }, []);

  const fetchData = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const [propsRes, blogsRes] = await Promise.all([
        fetch("/api/properties", { signal: controller.signal }),
        fetch("/api/blogs", { signal: controller.signal }),
      ]);

      if (!propsRes.ok || !blogsRes.ok) {
        throw new Error(`API error: ${propsRes.status} / ${blogsRes.status}`);
      }

      const propsData = await propsRes.json();
      const blogsData = await blogsRes.json();

      setAllProperties(propsData.properties || []);
      setBlogPosts(blogsData.posts || []);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    return () => abortRef.current?.abort();
  }, [fetchData]);

  // Apply filters
  const filteredProperties = useMemo(
    () => applyFilters(allProperties, filters),
    [allProperties, filters]
  );

  // Split filtered by type
  const filteredResidential = filteredProperties.filter((p) => p.type === "residential");
  const filteredCommercial = filteredProperties.filter((p) => p.type === "commercial");

  const isRent = filters.listingType === "rent";

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleLoaderComplete} />}

      <div
        className={`min-h-screen flex flex-col transition-opacity duration-500 ${
          showLoader ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <main className="flex-1" id="main-content">
          <HeroSection filters={filters} onFilterChange={setFilters} />

          {error ? (
            <ErrorBanner onRetry={fetchData} />
          ) : (
            <>
              {/* Filtered Properties based on listing type */}
              {loading ? (
                <>
                  <div className="py-16 md:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="h-8 bg-gray-100 rounded w-64 mb-8 animate-pulse" />
                      <div className="flex gap-5 overflow-hidden">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <PropertySkeleton key={`skel-a-${i}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="py-16 md:py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="h-8 bg-gray-100 rounded w-64 mb-8 animate-pulse" />
                      <div className="flex gap-5 overflow-hidden">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <PropertySkeleton key={`skel-b-${i}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <section aria-label={isRent ? "Featured residential rentals" : "Residential properties for sale"}>
                    <PropertyCarousel
                      title={isRent ? "Residential Rentals" : "Apartments for Sale"}
                      subtitle={isRent ? "Verified flats and houses for rent" : "Premium apartments and homes for purchase"}
                      properties={filteredResidential}
                      browseText={isRent ? "Browse All Rentals" : "Browse All Properties for Sale"}
                    />
                  </section>

                  <section aria-label={isRent ? "Featured commercial rentals" : "Commercial properties for sale"}>
                    {filteredCommercial.length > 0 && (
                      <div className="bg-gray-50">
                        <PropertyCarousel
                          title={isRent ? "Commercial Spaces for Rent" : "Commercial Spaces for Sale"}
                          subtitle={isRent ? "Offices, showrooms, and workspaces" : "Investment-grade commercial properties"}
                          properties={filteredCommercial}
                          browseText={isRent ? "Browse All Commercial Rentals" : "Browse All Commercial Sales"}
                        />
                      </div>
                    )}
                  </section>

                  {/* No results message */}
                  {filteredProperties.length === 0 && !loading && (
                    <div className="py-16 text-center">
                      <p className="text-gray-500 text-sm">
                        No properties found matching your filters.
                      </p>
                      <button
                        onClick={() => setFilters(defaultFilters)}
                        className="mt-3 text-sera text-sm font-medium hover:underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </>
              )}

              <WhyChooseSection />
              <SeraViewSection listingType={filters.listingType} />

              {/* Blog Posts */}
              <section aria-label="Blog posts and articles">
                {loading ? (
                  <div className="py-16 md:py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="h-8 bg-gray-100 rounded w-48 mb-8 animate-pulse" />
                      <div className="flex gap-5 overflow-hidden">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <BlogSkeleton key={`blog-skel-${i}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : blogPosts.length > 0 ? (
                  <BlogSection posts={blogPosts} />
                ) : null}
              </section>

              <ExploreSection listingType={filters.listingType} />
            </>
          )}
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}