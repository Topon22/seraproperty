"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";

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

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [residentialProperties, setResidentialProperties] = useState<Property[]>([]);
  const [commercialProperties, setCommercialProperties] = useState<Property[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [propsRes, blogsRes] = await Promise.all([
          fetch("/api/properties"),
          fetch("/api/blogs"),
        ]);

        const propsData = await propsRes.json();
        const blogsData = await blogsRes.json();

        const allProps = propsData.properties || [];
        setResidentialProperties(
          allProps.filter((p: Property) => p.type === "residential")
        );
        setCommercialProperties(
          allProps.filter((p: Property) => p.type === "commercial")
        );
        setBlogPosts(blogsData.posts || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleLoaderComplete} />}

      <div
        className={`min-h-screen flex flex-col transition-opacity duration-500 ${
          showLoader ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <main className="flex-1">
          <HeroSection />

          {!loading && residentialProperties.length > 0 && (
            <PropertyCarousel
              title="Explore Properties"
              properties={residentialProperties}
              browseText="Browse All Residential Properties"
            />
          )}

          {!loading && commercialProperties.length > 0 && (
            <div className="bg-gray-50">
              <PropertyCarousel
                title="Featured Commercial Spaces"
                properties={commercialProperties}
                browseText="Browse All Commercial Properties"
              />
            </div>
          )}

          <WhyChooseSection />
          <SeraViewSection />

          {!loading && blogPosts.length > 0 && (
            <BlogSection posts={blogPosts} />
          )}

          <ExploreSection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}