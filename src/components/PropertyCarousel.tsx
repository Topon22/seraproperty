"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  priceUnit: string;
  bedrooms: number | null;
  bathrooms: number | null;
  sqft: number | null;
  type: string;
  category: string | null;
  spaceType: string | null;
  hasView: boolean;
  imageUrl: string;
}

function formatPrice(price: number, unit: string) {
  const formatted = price.toLocaleString("en-BD");
  return unit === "per sqft" ? `৳${formatted} per sqft` : `৳${formatted} per month`;
}

function PropertyCard({ property }: { property: Property }) {
  const isResidential = property.type === "residential";
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[300px] group cursor-pointer">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div className="relative h-[200px] overflow-hidden">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {property.hasView && (
            <div className="absolute top-3 right-3 bg-dark/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Eye className="w-3 h-3" />
              SeraVIEW
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
            <span className="text-white font-bold text-sm">
              {formatPrice(property.price, property.priceUnit)}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm text-dark leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
            {property.title}
          </h3>
          <p className="text-xs text-gray-500 mb-3">{property.location}</p>
          <div className="flex items-center gap-3 text-[11px] text-gray-400">
            {isResidential && property.bedrooms && (
              <span>{property.bedrooms} Beds</span>
            )}
            {isResidential && property.bathrooms && (
              <span>{property.bathrooms} Baths</span>
            )}
            {property.sqft && <span>{property.sqft.toLocaleString()} sqft</span>}
            {!isResidential && property.spaceType && (
              <span>{property.spaceType}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertyCarousel({
  title,
  properties,
  browseText,
}: {
  title: string;
  properties: Property[];
  browseText: string;
}) {
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
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <section id="properties" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-dark">
              {title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Featured {properties[0]?.type === "residential" ? "Residential Flats and Houses" : "Commercial Spaces"}
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
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="rounded-full px-8 text-sera border-sera/30 hover:bg-sera-bg hover:border-sera/50 text-sm font-medium"
          >
            {browseText}
          </Button>
        </div>
      </div>
    </section>
  );
}