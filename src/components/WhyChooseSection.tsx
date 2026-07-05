"use client";

import { Monitor, ShieldCheck, UserCheck, ClipboardCheck, Layers, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Monitor,
    title: "Best in Class Digital Experience",
    description:
      "Superior image quality and a step-by-step flow offer a seamless, user-friendly experience — whether you're renting your next home or buying an investment property, from discovery to deal.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    description:
      "Every rental listing and property for sale is verified for accuracy and authenticity, ensuring you see only real, trustworthy properties with clear documentation.",
  },
  {
    icon: UserCheck,
    title: "Tenant & Buyer Screening",
    description:
      "Secured transactions by verifying tenant documents and buyer credentials, protecting homeowners and sellers while providing a smoother approval process for all parties.",
  },
  {
    icon: ClipboardCheck,
    title: "Property Inspection",
    description:
      "A fair, photo-documented inspection to protect tenants, buyers, homeowners, and sellers from future disputes — giving everyone confidence before signing.",
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description:
      "Get expert guidance on property appreciation, rental yields, and market trends across Dhaka's top neighborhoods. Make data-driven decisions whether you're renting, buying, or investing.",
  },
  {
    icon: Layers,
    title: "End to End Solution",
    description:
      "The entire process — from listing to move-in or handover — is managed seamlessly. Whether renting, buying, or selling, we ensure a hassle-free experience for both parties.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function WhyChooseSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark">
            Why Choose <span className="text-sera">Sera Property</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-lg mx-auto">
            We combine technology, transparency, and trust to deliver a property experience — whether you&apos;re renting, buying, or selling — that&apos;s truly hassle-free.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-sera/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-sera-bg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-sera" />
              </div>
              <h3 className="font-semibold text-dark text-base mb-2 leading-snug">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}