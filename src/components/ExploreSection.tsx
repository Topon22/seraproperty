"use client";

import { motion } from "framer-motion";

const neighborhoods = ["Gulshan 1", "Gulshan 2", "Banani", "Baridhara", "Bashundhara", "Dhanmondi", "Uttara"];

const categories = [
  {
    label: "Brand New Apartments",
    prefix: "Brand New Apartments for Rent in",
  },
  {
    label: "Furnished Apartments",
    prefix: "Furnished Apartments for Rent in",
  },
  {
    label: "Unfurnished Apartments",
    prefix: "Unfurnished Apartments for Rent in",
  },
  {
    label: "Pet Friendly Apartments",
    prefix: "Pet Friendly Apartments for Rent in",
  },
  {
    label: "Luxury Apartments",
    prefix: "Luxury Apartments for Rent in",
  },
  {
    label: "Affordable Apartments",
    prefix: "Affordable Apartments for Rent in",
  },
  {
    label: "Independent Houses",
    prefix: "Houses for Rent in",
  },
  {
    label: "Office Spaces",
    prefix: "Office Spaces for Rent in",
  },
  {
    label: "Commercial Spaces",
    prefix: "Commercial Spaces for",
  },
  {
    label: "Ground Floor",
    prefix: "Ground Floor Commercial Spaces in",
  },
];

export default function ExploreSection() {
  return (
    <section className="py-16 md:py-24 bg-white" id="add-property" aria-label="Explore rental categories and neighborhoods">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-dark">
            Explore Rentals in Dhaka Neighborhoods
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Browse properties by category and location
          </p>
        </motion.div>

        <div className="space-y-6">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: catIndex * 0.05 }}
            >
              <h3 className="text-sm font-semibold text-dark mb-3">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {neighborhoods.map((area) => (
                  <a
                    key={`${category.label}-${area}`}
                    href="#"
                    className="text-xs text-gray-500 hover:text-sera bg-gray-50 hover:bg-sera-bg border border-gray-100 hover:border-sera/20 rounded-full px-3.5 py-1.5 transition-all duration-200"
                  >
                    {category.prefix} {area}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}