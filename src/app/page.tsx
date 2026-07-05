"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PropertyCarousel from "@/components/PropertyCarousel";
import WhyChooseSection from "@/components/WhyChooseSection";
import SeraViewSection from "@/components/SeraViewSection";
import BlogSection from "@/components/BlogSection";
import ExploreSection from "@/components/ExploreSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  const [residentialProperties, setResidentialProperties] = useState<Property[]>([]);
  const [commercialProperties, setCommercialProperties] = useState<Property[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen flex flex-col">
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
  );
}