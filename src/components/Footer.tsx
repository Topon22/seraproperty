"use client";

import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const companyLinks = [
  { label: "About Sera Property", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Careers", href: "#" },
];

const serviceLinks = [
  { label: "Home Inspection", href: "#" },
  { label: "PropertySnapper", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Blogs", href: "#" },
  { label: "SeraVIEW", href: "#" },
  { label: "Rental Report", href: "#" },
];

const socialLinks = [
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Youtube, href: "#", label: "Youtube" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
];

const locations = [
  "Gulshan 1",
  "Gulshan 2",
  "Banani",
  "Baridhara",
  "Bashundhara",
  "Dhanmondi",
  "Uttara",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
  }),
};

export default function Footer() {
  return (
    <footer id="contact" className="bg-dark text-white relative overflow-hidden">
      {/* Decorative gradient top border */}
      <div className="h-1 bg-gradient-to-r from-sera-dark via-sera-light to-sera-dark" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-sera-dark to-sera rounded-2xl p-8 sm:p-10 mb-14 text-center relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              Find Your Perfect Rental Today
            </h3>
            <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
              Explore thousands of verified properties across Dhaka. Your next home
              is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#properties"
                className="inline-flex items-center justify-center bg-white text-sera-dark font-semibold rounded-full px-8 py-3 text-sm hover:bg-gray-50 transition-colors hover:scale-105 active:scale-95 transform"
              >
                Browse Properties
              </a>
              <a
                href="https://wa.me/8801535009008"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold rounded-full px-8 py-3 text-sm hover:bg-white/10 transition-colors hover:scale-105 active:scale-95 transform"
              >
                <svg viewBox="0 0 32 32" fill="white" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.914 15.914 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.314 22.61c-.39 1.1-1.932 2.014-3.17 2.28-.846.18-1.95.324-5.66-1.216-4.748-1.97-7.804-6.81-8.04-7.13-.228-.318-1.928-2.568-1.928-4.9s1.22-3.48 1.654-3.954c.434-.474.948-.594 1.264-.594.316 0 .632.002.908.016.292.016.684-.11 1.07.818.39.94 1.33 3.25 1.448 3.484.118.236.196.512.04.828-.158.316-.236.512-.472.788-.236.276-.498.616-.71.828-.236.236-.482.492-.206.964.276.472 1.226 2.024 2.632 3.278 1.808 1.614 3.332 2.114 3.806 2.35.472.236.748.198 1.024-.118.276-.316 1.186-1.382 1.502-1.856.316-.472.632-.394 1.066-.236.434.158 2.748 1.296 3.222 1.532.472.236.788.354.906.55.118.196.118 1.124-.272 2.224z" />
                </svg>
                WhatsApp: 01535 009 008
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <Image
                src="/images/logo.png"
                alt="Sera Property"
                width={48}
                height={48}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
              <div className="flex flex-col -space-y-0.5">
                <span className="text-xl font-extrabold tracking-tight leading-none">
                  <span className="text-white">Sera</span>
                  <span className="text-[#5dade2]"> Property</span>
                </span>
                <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-white/40">
                  Renting Made Simple
                </span>
              </div>
            </div>
            <div className="space-y-3.5 text-sm text-white/50">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-sera-light/60 flex-shrink-0" />
                <span>
                  45 Kemal Ataturk Avenue
                  <br />
                  Banani, Dhaka-1213
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sera-light/60 flex-shrink-0" />
                <a
                  href="mailto:info@seraproperty.com"
                  className="hover:text-sera-light transition-colors"
                >
                  info@seraproperty.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sera-light/60 flex-shrink-0" />
                <a
                  href="tel:+8801535009008"
                  className="hover:text-sera-light transition-colors"
                >
                  +880 1535 009 008
                </a>
              </div>
              <a
                href="https://wa.me/8801535009008"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#25D366] transition-colors"
              >
                <svg viewBox="0 0 32 32" fill="currentColor" className="w-4 h-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.914 15.914 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.314 22.61c-.39 1.1-1.932 2.014-3.17 2.28-.846.18-1.95.324-5.66-1.216-4.748-1.97-7.804-6.81-8.04-7.13-.228-.318-1.928-2.568-1.928-4.9s1.22-3.48 1.654-3.954c.434-.474.948-.594 1.264-.594.316 0 .632.002.908.016.292.016.684-.11 1.07.818.39.94 1.33 3.25 1.448 3.484.118.236.196.512.04.828-.158.316-.236.512-.472.788-.236.276-.498.616-.71.828-.236.236-.482.492-.206.964.276.472 1.226 2.024 2.632 3.278 1.808 1.614 3.332 2.114 3.806 2.35.472.236.748.198 1.024-.118.276-.316 1.186-1.382 1.502-1.856.316-.472.632-.394 1.066-.236.434.158 2.748 1.296 3.222 1.532.472.236.788.354.906.55.118.196.118 1.124-.272 2.224z" />
                </svg>
                WhatsApp: 01535 009 008
              </a>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-sera-light/60 flex-shrink-0" />
                <div>
                  <p>Weekdays — 10am to 8pm</p>
                  <p>Weekends — by appointment only</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Company */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white text-sm mb-5">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-sera-light transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our Services */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white text-sm mb-5">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-sera-light transition-colors duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Locations */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-white text-sm mb-5">Locations</h4>
            <ul className="space-y-2.5">
              {locations.map((loc) => (
                <li key={loc}>
                  <a
                    href="#"
                    className="text-sm text-white/50 hover:text-sera-light transition-colors duration-200 inline-block"
                  >
                    {loc}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Sera Property Ltd. | All rights
            reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            {socialLinks.map(({ Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-sera flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          <a
            href="#"
            className="text-xs font-medium text-sera-light hover:underline hover:text-white transition-colors"
          >
            Make a Request — Rent with Sera Property, It&apos;s free!
          </a>
        </div>
      </div>
    </footer>
  );
}