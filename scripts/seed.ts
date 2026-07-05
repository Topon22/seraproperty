import { PrismaClient } from "@prisma/client";
import { seedProperties, seedBlogPosts } from "@/lib/seed-data";

const db = new PrismaClient();

async function seed() {
  console.log("Seeding database...");

  await db.property.deleteMany();
  await db.blogPost.deleteMany();
  await db.testimonial.deleteMany();

  const residentialProperties = seedProperties.filter(p => p.type === "residential");
  const commercialProperties = seedProperties.filter(p => p.type === "commercial");

  for (const prop of residentialProperties) {
    await db.property.create({ data: prop });
  }
  console.log(`Created ${residentialProperties.length} residential properties`);

  for (const prop of commercialProperties) {
    await db.property.create({ data: prop });
  }
  console.log(`Created ${commercialProperties.length} commercial properties`);

  for (const post of seedBlogPosts) {
    await db.blogPost.create({ data: post });
  }
  console.log(`Created ${seedBlogPosts.length} blog posts`);

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