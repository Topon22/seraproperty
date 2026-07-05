"use client";

import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 4.5, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 5, duration: 0.3 }}
        className="absolute right-16 top-1/2 -translate-y-1/2 bg-dark text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap pointer-events-none"
      >
        Chat with us!
        <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-dark rotate-45" />
      </motion.div>

      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

      <a
        href="https://wa.me/8801535009008?text=Hi%20Sera%20Property%2C%20I%27m%20interested%20in%20renting%20a%20property."
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#1ebe57] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          fill="white"
          className="w-7 h-7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.914 15.914 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.314 22.61c-.39 1.1-1.932 2.014-3.17 2.28-.846.18-1.95.324-5.66-1.216-4.748-1.97-7.804-6.81-8.04-7.13-.228-.318-1.928-2.568-1.928-4.9s1.22-3.48 1.654-3.954c.434-.474.948-.594 1.264-.594.316 0 .632.002.908.016.292.016.684-.11 1.07.818.39.94 1.33 3.25 1.448 3.484.118.236.196.512.04.828-.158.316-.236.512-.472.788-.236.276-.498.616-.71.828-.236.236-.482.492-.206.964.276.472 1.226 2.024 2.632 3.278 1.808 1.614 3.332 2.114 3.806 2.35.472.236.748.198 1.024-.118.276-.316 1.186-1.382 1.502-1.856.316-.472.632-.394 1.066-.236.434.158 2.748 1.296 3.222 1.532.472.236.788.354.906.55.118.196.118 1.124-.272 2.224z" />
        </svg>
      </a>
    </motion.div>
  );
}