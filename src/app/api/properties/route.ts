import { NextResponse } from "next/server";
import { seedProperties } from "@/lib/seed-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  // Try database first, fall back to static seed data
  try {
    const { db } = await import("@/lib/db");
    const properties = await db.property.findMany({
      where: {
        featured: true,
        ...(type ? { type } : {}),
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ properties });
  } catch {
    // Fallback: serve from static seed data (works on Vercel / any serverless env)
    const filtered = type
      ? seedProperties.filter((p) => p.type === type)
      : seedProperties;
    return NextResponse.json({ properties: filtered });
  }
}