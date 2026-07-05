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

const locations = [
  "Gulshan 1",
  "Gulshan 2",
  "Banani",
  "Baridhara",
  "Bashundhara",
  "Dhanmondi",
  "Uttara",
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div>
            <img
              src="/images/logo.png"
              alt="Sera Property"
              className="h-12 w-auto object-contain mb-4"
            />
            <div className="space-y-3 text-sm text-gray-500">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                <span>
                  45 Kemal Ataturk Avenue
                  <br />
                  Banani, Dhaka-1213
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <a href="mailto:info@seraproperty.com" className="hover:text-sera transition-colors">
                  info@seraproperty.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span>09666 721 521</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
                <div>
                  <p>Weekdays - 10am to 8pm</p>
                  <p>Weekends - by appointment only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-dark text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-sera transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-semibold text-dark text-sm mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-sera transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold text-dark text-sm mb-4">Locations</h4>
            <ul className="space-y-2.5">
              {locations.map((loc) => (
                <li key={loc}>
                  <a
                    href="#"
                    className="text-sm text-gray-500 hover:text-sera transition-colors"
                  >
                    {loc}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Sera Property Ltd. | All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { Icon: Facebook, href: "#" },
              { Icon: Instagram, href: "#" },
              { Icon: Youtube, href: "#" },
              { Icon: Linkedin, href: "#" },
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                className="w-9 h-9 rounded-full bg-gray-200/60 hover:bg-sera flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <a
            href="#"
            className="text-xs font-medium text-sera hover:underline"
          >
            Make a Request — Rent with Sera Property, It&apos;s free!
          </a>
        </div>
      </div>
    </footer>
  );
}