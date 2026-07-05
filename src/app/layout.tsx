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
  title: "Sera Property — Renting Made Simple",
  description:
    "Find, rent, and manage properties effortlessly with Sera Property. Discover Dhaka's best apartments and commercial spaces with verified listings, virtual tours, and more.",
  keywords: [
    "Sera Property",
    "property rental Dhaka",
    "rent homes",
    "verified listings",
    "letting agency",
    "Bangladesh property",
    "apartments for rent",
    "commercial spaces",
  ],
  openGraph: {
    title: "Sera Property — Renting Made Simple",
    description:
      "Find, rent, and manage properties effortlessly with Sera Property.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${urbanist.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}