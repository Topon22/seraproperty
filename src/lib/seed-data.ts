// Static seed data — used as fallback when Prisma/SQLite is unavailable (e.g. Vercel serverless)

export interface SeedProperty {
  id: string;
  title: string;
  location: string;
  area: string;
  price: number;
  priceUnit: string;
  bedrooms: number | null;
  bathrooms: number | null;
  sqft: number | null;
  type: string;
  category: string | null;
  spaceType: string | null;
  furnished: string;
  featured: boolean;
  hasView: boolean;
  imageUrl: string;
  imageUrls: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SeedBlogPost {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  author: string | null;
  readTime: string | null;
  publishedAt: string | null;
}

const now = new Date().toISOString();

export const seedProperties: SeedProperty[] = [
  // Residential
  {
    id: "res-1",
    title: "5 Bedroom Luxury Apartment in Gulshan",
    location: "Gulshan 2, Dhaka",
    area: "Gulshan 2",
    price: 45000,
    priceUnit: "per month",
    bedrooms: 5, bathrooms: 5, sqft: 3200,
    type: "residential", category: "Apartment", spaceType: null,
    furnished: "Furnished", featured: true, hasView: true,
    imageUrl: "/images/properties/apt1.png", imageUrls: "[]",
    description: "Stunning 5-bedroom luxury apartment with modern amenities in the heart of Gulshan 2.",
    createdAt: now, updatedAt: now,
  },
  {
    id: "res-2",
    title: "3 Bedroom Premium Apartment in Banani",
    location: "Banani, Dhaka",
    area: "Banani",
    price: 55000,
    priceUnit: "per month",
    bedrooms: 3, bathrooms: 3, sqft: 2100,
    type: "residential", category: "Apartment", spaceType: null,
    furnished: "Unfurnished", featured: true, hasView: true,
    imageUrl: "/images/properties/apt2.png", imageUrls: "[]",
    description: "Beautiful 3-bedroom apartment with panoramic city views and premium finishes.",
    createdAt: now, updatedAt: now,
  },
  {
    id: "res-3",
    title: "4 Bedroom Apartment in Dhanmondi",
    location: "Dhanmondi, Dhaka",
    area: "Dhanmondi",
    price: 20000,
    priceUnit: "per month",
    bedrooms: 4, bathrooms: 4, sqft: 2800,
    type: "residential", category: "Apartment", spaceType: null,
    furnished: "Semi-Furnished", featured: true, hasView: false,
    imageUrl: "/images/properties/apt3.png", imageUrls: "[]",
    description: "Spacious 4-bedroom apartment in a prime Dhanmondi location near the lake.",
    createdAt: now, updatedAt: now,
  },
  {
    id: "res-4",
    title: "2 Bedroom Modern Apartment in Uttara",
    location: "Uttara, Dhaka",
    area: "Uttara",
    price: 35000,
    priceUnit: "per month",
    bedrooms: 2, bathrooms: 2, sqft: 1250,
    type: "residential", category: "Apartment", spaceType: null,
    furnished: "Unfurnished", featured: true, hasView: false,
    imageUrl: "/images/properties/apt4.png", imageUrls: "[]",
    description: "Modern 2-bedroom apartment with contemporary design in Uttara Sector 7.",
    createdAt: now, updatedAt: now,
  },
  {
    id: "res-5",
    title: "3 Bedroom Apartment in Mohammadpur",
    location: "Mohammadpur, Dhaka",
    area: "Mohammadpur",
    price: 65000,
    priceUnit: "per month",
    bedrooms: 3, bathrooms: 3, sqft: 2200,
    type: "residential", category: "Apartment", spaceType: null,
    furnished: "Furnished", featured: true, hasView: false,
    imageUrl: "/images/properties/apt5.png", imageUrls: "[]",
    description: "Fully furnished 3-bedroom apartment with premium amenities and parking.",
    createdAt: now, updatedAt: now,
  },
  {
    id: "res-6",
    title: "4 Bedroom Apartment in Bashundhara R/A",
    location: "Bashundhara, Dhaka",
    area: "Bashundhara",
    price: 40000,
    priceUnit: "per month",
    bedrooms: 4, bathrooms: 4, sqft: 2500,
    type: "residential", category: "Apartment", spaceType: null,
    furnished: "Unfurnished", featured: true, hasView: false,
    imageUrl: "/images/properties/apt6.png", imageUrls: "[]",
    description: "Well-designed 4-bedroom apartment in Bashundhara Residential Area.",
    createdAt: now, updatedAt: now,
  },
  {
    id: "res-7",
    title: "3 Bedroom Apartment in Mirpur",
    location: "Mirpur, Dhaka",
    area: "Mirpur",
    price: 50000,
    priceUnit: "per month",
    bedrooms: 3, bathrooms: 3, sqft: 1800,
    type: "residential", category: "Apartment", spaceType: null,
    furnished: "Semi-Furnished", featured: true, hasView: true,
    imageUrl: "/images/properties/apt7.png", imageUrls: "[]",
    description: "Bright and airy 3-bedroom apartment near Mirpur DOHS with scenic views.",
    createdAt: now, updatedAt: now,
  },
  {
    id: "res-8",
    title: "2 Bedroom Studio in Banani",
    location: "Banani, Dhaka",
    area: "Banani",
    price: 25000,
    priceUnit: "per month",
    bedrooms: 2, bathrooms: 2, sqft: 1100,
    type: "residential", category: "Apartment", spaceType: null,
    furnished: "Furnished", featured: true, hasView: false,
    imageUrl: "/images/properties/apt8.png", imageUrls: "[]",
    description: "Compact yet stylish 2-bedroom furnished studio in central Banani.",
    createdAt: now, updatedAt: now,
  },
  // Commercial
  {
    id: "com-1",
    title: "8000 Sqft Commercial Space in Gulshan 2",
    location: "Gulshan 2, Dhaka",
    area: "Gulshan 2",
    price: 120000,
    priceUnit: "per month",
    bedrooms: null, bathrooms: null, sqft: 8000,
    type: "commercial", category: "Commercial Space", spaceType: "Enclosed Space",
    furnished: "Unfurnished", featured: true, hasView: false,
    imageUrl: "/images/properties/comm1.png", imageUrls: "[]",
    description: "Premium 8000 sqft commercial space ideal for corporate offices.",
    createdAt: now, updatedAt: now,
  },
  {
    id: "com-2",
    title: "3750 Sqft Office in Mohakhali",
    location: "Mohakhali C/A, Dhaka",
    area: "Mohakhali",
    price: 147,
    priceUnit: "per sqft",
    bedrooms: null, bathrooms: null, sqft: 3750,
    type: "commercial", category: "Office Space", spaceType: "Open Space",
    furnished: "Unfurnished", featured: true, hasView: false,
    imageUrl: "/images/properties/comm2.png", imageUrls: "[]",
    description: "Modern open-plan office space in Mohakhali Commercial Area.",
    createdAt: now, updatedAt: now,
  },
  {
    id: "com-3",
    title: "2623 Sqft Commercial Space in Banani",
    location: "Banani, Dhaka",
    area: "Banani",
    price: 362,
    priceUnit: "per sqft",
    bedrooms: null, bathrooms: null, sqft: 2623,
    type: "commercial", category: "Commercial Space", spaceType: "Open Space",
    furnished: "Unfurnished", featured: true, hasView: false,
    imageUrl: "/images/properties/comm3.png", imageUrls: "[]",
    description: "Prime commercial space in Banani, ideal for retail or showroom.",
    createdAt: now, updatedAt: now,
  },
  {
    id: "com-4",
    title: "2500 Sqft Office in Dhanmondi",
    location: "Dhanmondi, Dhaka",
    area: "Dhanmondi",
    price: 20000,
    priceUnit: "per month",
    bedrooms: null, bathrooms: null, sqft: 2500,
    type: "commercial", category: "Office Space", spaceType: "Enclosed Space",
    furnished: "Unfurnished", featured: true, hasView: true,
    imageUrl: "/images/properties/comm1.png", imageUrls: "[]",
    description: "Fully enclosed office space in Dhanmondi with dedicated parking.",
    createdAt: now, updatedAt: now,
  },
  {
    id: "com-5",
    title: "2250 Sqft Commercial Space in Gulshan 1",
    location: "Gulshan 1, Dhaka",
    area: "Gulshan 1",
    price: 20000,
    priceUnit: "per month",
    bedrooms: null, bathrooms: null, sqft: 2250,
    type: "commercial", category: "Commercial Space", spaceType: "Enclosed Space",
    furnished: "Unfurnished", featured: true, hasView: false,
    imageUrl: "/images/properties/comm2.png", imageUrls: "[]",
    description: "Versatile commercial space on Gulshan 1 main road.",
    createdAt: now, updatedAt: now,
  },
  {
    id: "com-6",
    title: "700 Sqft Compact Office in Banani",
    location: "Banani, Dhaka",
    area: "Banani",
    price: 45000,
    priceUnit: "per month",
    bedrooms: null, bathrooms: null, sqft: 700,
    type: "commercial", category: "Office Space", spaceType: "Enclosed Space",
    furnished: "Furnished", featured: true, hasView: false,
    imageUrl: "/images/properties/comm3.png", imageUrls: "[]",
    description: "Compact furnished office space suitable for startups.",
    createdAt: now, updatedAt: now,
  },
];

export const seedBlogPosts: SeedBlogPost[] = [
  {
    id: "blog-1",
    title: "Understanding Dhaka's Rental Market in 2026",
    excerpt: "A comprehensive look at how Dhaka's rental landscape is evolving with new trends, technology, and tenant expectations reshaping the market.",
    imageUrl: "/images/blog/blog1.png",
    author: "Sera Property Team",
    readTime: "5 mins read",
    publishedAt: "2026-04-30T00:00:00.000Z",
  },
  {
    id: "blog-2",
    title: "Living in Banani & Gulshan: The Best Neighborhoods",
    excerpt: "Explore what makes Banani and Gulshan the most sought-after neighborhoods in Dhaka for both living and working.",
    imageUrl: "/images/blog/blog2.png",
    author: "Sera Property Team",
    readTime: "4 mins read",
    publishedAt: "2026-03-15T00:00:00.000Z",
  },
  {
    id: "blog-3",
    title: "What Today's Renters Really Want",
    excerpt: "Recent surveys reveal what modern tenants prioritize when searching for their next rental property.",
    imageUrl: "/images/blog/blog1.png",
    author: "Sera Property Team",
    readTime: "3 mins read",
    publishedAt: "2026-02-20T00:00:00.000Z",
  },
  {
    id: "blog-4",
    title: "Rental Price Trends: What Tenants Need to Know",
    excerpt: "An analysis of rental price movements across Dhaka's premium areas and what it means for tenants.",
    imageUrl: "/images/blog/blog2.png",
    author: "Sera Property Team",
    readTime: "3 mins read",
    publishedAt: "2025-12-10T00:00:00.000Z",
  },
  {
    id: "blog-5",
    title: "The Future of Property Rentals in Bangladesh",
    excerpt: "How technology and professional letting agencies are transforming the rental experience.",
    imageUrl: "/images/blog/blog1.png",
    author: "Sera Property Team",
    readTime: "4 mins read",
    publishedAt: "2025-11-05T00:00:00.000Z",
  },
  {
    id: "blog-6",
    title: "Tips for First-Time Renters in Dhaka",
    excerpt: "Essential guide for anyone renting their first apartment in Dhaka, from documentation to negotiation.",
    imageUrl: "/images/blog/blog2.png",
    author: "Sera Property Team",
    readTime: "6 mins read",
    publishedAt: "2025-10-18T00:00:00.000Z",
  },
];