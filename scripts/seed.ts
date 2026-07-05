import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

  await db.property.deleteMany();
  await db.blogPost.deleteMany();
  await db.testimonial.deleteMany();

  const residentialProperties = [
    {
      title: "5 Bedroom Luxury Apartment in Gulshan",
      location: "Gulshan 2, Dhaka",
      area: "Gulshan 2",
      price: 45000,
      priceUnit: "per month",
      bedrooms: 5,
      bathrooms: 5,
      sqft: 3200,
      type: "residential",
      category: "Apartment",
      furnished: "Furnished",
      featured: true,
      hasView: true,
      imageUrl: "/images/properties/apt1.png",
      description: "Stunning 5-bedroom luxury apartment with modern amenities in the heart of Gulshan 2.",
    },
    {
      title: "3 Bedroom Premium Apartment in Banani",
      location: "Banani, Dhaka",
      area: "Banani",
      price: 55000,
      priceUnit: "per month",
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2100,
      type: "residential",
      category: "Apartment",
      furnished: "Unfurnished",
      featured: true,
      hasView: true,
      imageUrl: "/images/properties/apt2.png",
      description: "Beautiful 3-bedroom apartment with panoramic city views and premium finishes.",
    },
    {
      title: "4 Bedroom Apartment in Dhanmondi",
      location: "Dhanmondi, Dhaka",
      area: "Dhanmondi",
      price: 20000,
      priceUnit: "per month",
      bedrooms: 4,
      bathrooms: 4,
      sqft: 2800,
      type: "residential",
      category: "Apartment",
      furnished: "Semi-Furnished",
      featured: true,
      hasView: false,
      imageUrl: "/images/properties/apt3.png",
      description: "Spacious 4-bedroom apartment in a prime Dhanmondi location near the lake.",
    },
    {
      title: "2 Bedroom Modern Apartment in Uttara",
      location: "Uttara, Dhaka",
      area: "Uttara",
      price: 35000,
      priceUnit: "per month",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1250,
      type: "residential",
      category: "Apartment",
      furnished: "Unfurnished",
      featured: true,
      hasView: false,
      imageUrl: "/images/properties/apt4.png",
      description: "Modern 2-bedroom apartment with contemporary design in Uttara Sector 7.",
    },
    {
      title: "3 Bedroom Apartment in Mohammadpur",
      location: "Mohammadpur, Dhaka",
      area: "Mohammadpur",
      price: 65000,
      priceUnit: "per month",
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2200,
      type: "residential",
      category: "Apartment",
      furnished: "Furnished",
      featured: true,
      hasView: false,
      imageUrl: "/images/properties/apt5.png",
      description: "Fully furnished 3-bedroom apartment with premium amenities and parking.",
    },
    {
      title: "4 Bedroom Apartment in Bashundhara R/A",
      location: "Bashundhara, Dhaka",
      area: "Bashundhara",
      price: 40000,
      priceUnit: "per month",
      bedrooms: 4,
      bathrooms: 4,
      sqft: 2500,
      type: "residential",
      category: "Apartment",
      furnished: "Unfurnished",
      featured: true,
      hasView: false,
      imageUrl: "/images/properties/apt6.png",
      description: "Well-designed 4-bedroom apartment in Bashundhara Residential Area.",
    },
    {
      title: "3 Bedroom Apartment in Mirpur",
      location: "Mirpur, Dhaka",
      area: "Mirpur",
      price: 50000,
      priceUnit: "per month",
      bedrooms: 3,
      bathrooms: 3,
      sqft: 1800,
      type: "residential",
      category: "Apartment",
      furnished: "Semi-Furnished",
      featured: true,
      hasView: true,
      imageUrl: "/images/properties/apt7.png",
      description: "Bright and airy 3-bedroom apartment near Mirpur DOHS with scenic views.",
    },
    {
      title: "2 Bedroom Studio in Banani",
      location: "Banani, Dhaka",
      area: "Banani",
      price: 25000,
      priceUnit: "per month",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1100,
      type: "residential",
      category: "Apartment",
      furnished: "Furnished",
      featured: true,
      hasView: false,
      imageUrl: "/images/properties/apt8.png",
      description: "Compact yet stylish 2-bedroom furnished studio in central Banani.",
    },
  ];

  const commercialProperties = [
    {
      title: "8000 Sqft Commercial Space in Gulshan 2",
      location: "Gulshan 2, Dhaka",
      area: "Gulshan 2",
      price: 120000,
      priceUnit: "per month",
      sqft: 8000,
      type: "commercial",
      category: "Commercial Space",
      spaceType: "Enclosed Space",
      furnished: "Unfurnished",
      featured: true,
      hasView: false,
      imageUrl: "/images/properties/comm1.png",
      description: "Premium 8000 sqft commercial space ideal for corporate offices.",
    },
    {
      title: "3750 Sqft Office in Mohakhali",
      location: "Mohakhali C/A, Dhaka",
      area: "Mohakhali",
      price: 147,
      priceUnit: "per sqft",
      sqft: 3750,
      type: "commercial",
      category: "Office Space",
      spaceType: "Open Space",
      furnished: "Unfurnished",
      featured: true,
      hasView: false,
      imageUrl: "/images/properties/comm2.png",
      description: "Modern open-plan office space in Mohakhali Commercial Area.",
    },
    {
      title: "2623 Sqft Commercial Space in Banani",
      location: "Banani, Dhaka",
      area: "Banani",
      price: 362,
      priceUnit: "per sqft",
      sqft: 2623,
      type: "commercial",
      category: "Commercial Space",
      spaceType: "Open Space",
      furnished: "Unfurnished",
      featured: true,
      hasView: false,
      imageUrl: "/images/properties/comm3.png",
      description: "Prime commercial space in Banani, ideal for retail or showroom.",
    },
    {
      title: "2500 Sqft Office in Dhanmondi",
      location: "Dhanmondi, Dhaka",
      area: "Dhanmondi",
      price: 20000,
      priceUnit: "per month",
      sqft: 2500,
      type: "commercial",
      category: "Office Space",
      spaceType: "Enclosed Space",
      furnished: "Unfurnished",
      featured: true,
      hasView: true,
      imageUrl: "/images/properties/comm1.png",
      description: "Fully enclosed office space in Dhanmondi with dedicated parking.",
    },
    {
      title: "2250 Sqft Commercial Space in Gulshan 1",
      location: "Gulshan 1, Dhaka",
      area: "Gulshan 1",
      price: 20000,
      priceUnit: "per month",
      sqft: 2250,
      type: "commercial",
      category: "Commercial Space",
      spaceType: "Enclosed Space",
      furnished: "Unfurnished",
      featured: true,
      hasView: false,
      imageUrl: "/images/properties/comm2.png",
      description: "Versatile commercial space on Gulshan 1 main road.",
    },
    {
      title: "700 Sqft Compact Office in Banani",
      location: "Banani, Dhaka",
      area: "Banani",
      price: 45000,
      priceUnit: "per month",
      sqft: 700,
      type: "commercial",
      category: "Office Space",
      spaceType: "Enclosed Space",
      furnished: "Furnished",
      featured: true,
      hasView: false,
      imageUrl: "/images/properties/comm3.png",
      description: "Compact furnished office space suitable for startups.",
    },
  ];

  const blogPosts = [
    {
      title: "Understanding Dhaka's Rental Market in 2026",
      excerpt: "A comprehensive look at how Dhaka's rental landscape is evolving with new trends, technology, and tenant expectations reshaping the market.",
      imageUrl: "/images/blog/blog1.png",
      author: "Sera Property Team",
      readTime: "5 mins read",
      publishedAt: new Date("2026-04-30"),
    },
    {
      title: "Living in Banani & Gulshan: The Best Neighborhoods",
      excerpt: "Explore what makes Banani and Gulshan the most sought-after neighborhoods in Dhaka for both living and working.",
      imageUrl: "/images/blog/blog2.png",
      author: "Sera Property Team",
      readTime: "4 mins read",
      publishedAt: new Date("2026-03-15"),
    },
    {
      title: "What Today's Renters Really Want",
      excerpt: "Recent surveys reveal what modern tenants prioritize when searching for their next rental property.",
      imageUrl: "/images/blog/blog1.png",
      author: "Sera Property Team",
      readTime: "3 mins read",
      publishedAt: new Date("2026-02-20"),
    },
    {
      title: "Rental Price Trends: What Tenants Need to Know",
      excerpt: "An analysis of rental price movements across Dhaka's premium areas and what it means for tenants.",
      imageUrl: "/images/blog/blog2.png",
      author: "Sera Property Team",
      readTime: "3 mins read",
      publishedAt: new Date("2025-12-10"),
    },
    {
      title: "The Future of Property Rentals in Bangladesh",
      excerpt: "How technology and professional letting agencies are transforming the rental experience.",
      imageUrl: "/images/blog/blog1.png",
      author: "Sera Property Team",
      readTime: "4 mins read",
      publishedAt: new Date("2025-11-05"),
    },
    {
      title: "Tips for First-Time Renters in Dhaka",
      excerpt: "Essential guide for anyone renting their first apartment in Dhaka, from documentation to negotiation.",
      imageUrl: "/images/blog/blog2.png",
      author: "Sera Property Team",
      readTime: "6 mins read",
      publishedAt: new Date("2025-10-18"),
    },
  ];

  for (const prop of residentialProperties) {
    await db.property.create({ data: prop });
  }
  console.log(`Created ${residentialProperties.length} residential properties`);

  for (const prop of commercialProperties) {
    await db.property.create({ data: prop });
  }
  console.log(`Created ${commercialProperties.length} commercial properties`);

  for (const post of blogPosts) {
    await db.blogPost.create({ data: post });
  }
  console.log(`Created ${blogPosts.length} blog posts`);

  console.log("Seeding completed!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });