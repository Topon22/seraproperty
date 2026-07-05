"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import { AlertTriangle, RefreshCw } from "lucide-react";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const HeroSection = dynamic(() => import("@/components/HeroSection"), { ssr: false });
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

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [residentialProperties, setResidentialProperties] = useState<Property[]>([]);
  const [commercialProperties, setCommercialProperties] = useState<Property[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

      const allProps: Property[] = propsData.properties || [];
      setResidentialProperties(allProps.filter((p) => p.type === "residential"));
      setCommercialProperties(allProps.filter((p) => p.type === "commercial"));
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
          <HeroSection />

          {error ? (
            <ErrorBanner onRetry={fetchData} />
          ) : (
            <>
              {/* Residential Properties */}
              <section aria-label="Featured residential properties">
                {loading ? (
                  <div className="py-16 md:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="h-8 bg-gray-100 rounded w-64 mb-8 animate-pulse" />
                      <div className="flex gap-5 overflow-hidden">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <PropertySkeleton key={`res-skel-${i}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : residentialProperties.length > 0 ? (
                  <PropertyCarousel
                    title="Explore Properties"
                    properties={residentialProperties}
                    browseText="Browse All Residential Properties"
                  />
                ) : null}
              </section>

              {/* Commercial Properties */}
              <section aria-label="Featured commercial properties">
                {loading ? (
                  <div className="py-16 md:py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="h-8 bg-gray-100 rounded w-64 mb-8 animate-pulse" />
                      <div className="flex gap-5 overflow-hidden">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <PropertySkeleton key={`com-skel-${i}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : commercialProperties.length > 0 ? (
                  <div className="bg-gray-50">
                    <PropertyCarousel
                      title="Featured Commercial Spaces"
                      properties={commercialProperties}
                      browseText="Browse All Commercial Properties"
                    />
                  </div>
                ) : null}
              </section>

              <WhyChooseSection />
              <SeraViewSection />

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

              <ExploreSection />
            </>
          )}
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}