import { NextResponse } from "next/server";
import { seedProperties } from "@/lib/seed-data";

const VALID_TYPES = ["residential", "commercial"] as const;

export const dynamic = "force-dynamic";
export const revalidate = 300; // Revalidate every 5 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawType = searchParams.get("type");

  // Validate type parameter
  const type = rawType && VALID_TYPES.includes(rawType as typeof VALID_TYPES[number])
    ? rawType
    : undefined;

  try {
    const { db } = await import("@/lib/db");
    const properties = await db.property.findMany({
      where: {
        featured: true,
        ...(type ? { type } : {}),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { properties },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("[/api/properties] DB unavailable, using fallback:", error);
    const filtered = type
      ? seedProperties.filter((p) => p.type === type)
      : seedProperties;

    return NextResponse.json(
      { properties: filtered },
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