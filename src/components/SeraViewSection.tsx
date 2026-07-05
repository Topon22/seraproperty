"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface SeraViewSectionProps {
  listingType: string;
}

export default function SeraViewSection({ listingType }: SeraViewSectionProps) {
  const isSale = listingType === "sale";

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/seraview.png"
                alt="SeraVIEW virtual property tour interface"
                width={800}
                height={600}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-sera/10 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-sera/5 rounded-2xl -z-10" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-sera font-semibold text-sm mb-3 tracking-wide uppercase">
              Introducing
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4 leading-tight">
              Sera<span className="text-sera">VIEW</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              {isSale
                ? "SeraVIEW is our proprietary property showcase feature that provides an immersive and high-definition viewing experience of properties for sale. Explore every corner of your prospective purchase from the comfort of your screen before scheduling an in-person visit — saving you time and helping you shortlist with confidence."
                : "SeraVIEW is our proprietary property showcase feature that provides an immersive and high-definition viewing experience of rental properties. Explore every corner of your prospective home from the comfort of your screen before scheduling an in-person visit."}
            </p>
            <Button className="bg-sera hover:bg-sera-dark text-white rounded-full px-8 text-sm font-medium group">
              See More
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}