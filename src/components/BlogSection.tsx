"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  author: string | null;
  readTime: string | null;
  publishedAt: string | null;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogSection({ posts }: { posts: BlogPost[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-dark">
              From People Like You
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Insights, tips, and stories from our community
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="rounded-full w-9 h-9 border-gray-200 hover:border-sera hover:text-sera disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="rounded-full w-9 h-9 border-gray-200 hover:border-sera hover:text-sera disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-5 overflow-x-auto no-scrollbar pb-2"
        >
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex-shrink-0 w-[320px] sm:w-[360px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-5">
                <p className="text-[11px] text-gray-400 mb-2">
                  {formatDate(post.publishedAt)}
                  {post.readTime && (
                    <>
                      {" — "}
                      <span>{post.readTime}</span>
                    </>
                  )}
                </p>
                <h3 className="font-semibold text-dark text-sm leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sera text-xs font-medium group-hover:gap-2 transition-all">
                  Read More
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="rounded-full px-8 text-sera border-sera/30 hover:bg-sera-bg hover:border-sera/50 text-sm font-medium"
          >
            View All
          </Button>
        </div>
      </div>
    </section>
  );
}