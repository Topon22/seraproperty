import { NextResponse } from "next/server";
import { seedBlogPosts } from "@/lib/seed-data";

export const dynamic = "force-dynamic";
export const revalidate = 600; // Revalidate every 10 minutes

export async function GET() {
  try {
    const { db } = await import("@/lib/db");
    const posts = await db.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json(
      { posts },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
        },
      }
    );
  } catch (error) {
    console.error("[/api/blogs] DB unavailable, using fallback:", error);
    return NextResponse.json(
      { posts: seedBlogPosts },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
          "X-Data-Source": "fallback",
        },
      }
    );
  }
}