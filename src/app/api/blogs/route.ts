import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}