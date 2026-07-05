import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sera Property — Rent & Buy Properties in Dhaka | Bangladesh's Trusted Real Estate Agency",
  description:
    "Find, rent, buy, and sell properties effortlessly with Sera Property. Discover Dhaka's best apartments and commercial spaces for rent and sale with verified listings, virtual tours, and transparent pricing.",
  keywords: [
    "Sera Property",
    "property rental Dhaka",
    "property for sale Dhaka",
    "rent homes Dhaka",
    "buy apartment Dhaka",
    "verified listings",
    "real estate agency Bangladesh",
    "Bangladesh property",
    "apartments for rent Dhaka",
    "apartments for sale Dhaka",
    "commercial spaces Dhaka",
    "Bashundhara apartment",
    "Gulshan rent",
    "Gulshan property for sale",
    "Banani flat",
    "Baridhara office space",
    "invest in Dhaka real estate",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://seraproperty.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sera Property — Rent & Buy Properties in Dhaka",
    description:
      "Find, rent, buy, and sell properties effortlessly with Sera Property. Discover Dhaka's best apartments and commercial spaces for rent and sale.",
    type: "website",
    locale: "en_BD",
    url: "https://seraproperty.com",
    siteName: "Sera Property",
    images: [
      {
        url: "/images/hero-bg.png",
        width: 1920,
        height: 1080,
        alt: "Sera Property — Premium properties for rent and sale in Dhaka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sera Property — Rent & Buy Properties in Dhaka",
    description:
      "Find, rent, buy, and sell properties effortlessly with Sera Property.",
    images: ["/images/hero-bg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Sera Property",
              description: "Dhaka's trusted real estate agency for rent and sale. Verified listings, virtual tours, and seamless property experience.",
              url: "https://seraproperty.com",
              logo: "https://seraproperty.com/images/logo.png",
              image: "https://seraproperty.com/images/hero-bg.png",
              telephone: "+8801535009008",
              email: "info@seraproperty.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "45 Kemal Ataturk Avenue",
                addressLocality: "Banani, Dhaka",
                postalCode: "1213",
                addressCountry: "BD",
              },
              areaServed: [
                { "@type": "City", name: "Dhaka" },
              ],
              priceRange: "৳35,000 - ৳6.2 Crore",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "10:00",
                closes: "20:00",
              },
              sameAs: [
                "https://www.facebook.com/SeraPropertyBD/",
              ],
            }),
          }}
        />
      </head>
      <body className={`${urbanist.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-4 focus:left-4 focus:bg-sera focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}