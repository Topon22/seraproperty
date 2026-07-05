import { NextResponse } from "next/server";
import { seedBlogPosts } from "@/lib/seed-data";

export async function GET() {
  try {
    const { db } = await import("@/lib/db");
    const posts = await db.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    });
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("[/api/blogs] DB unavailable, using fallback:", error);
    return NextResponse.json({ posts: seedBlogPosts });
  }
}