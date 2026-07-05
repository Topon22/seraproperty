import { NextResponse } from "next/server";
import { seedBlogPosts } from "@/lib/seed-data";

export async function GET() {
  // Try database first, fall back to static seed data
  try {
    const { db } = await import("@/lib/db");
    const posts = await db.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json({ posts });
  } catch {
    // Fallback: serve from static seed data (works on Vercel / any serverless env)
    return NextResponse.json({ posts: seedBlogPosts });
  }
}