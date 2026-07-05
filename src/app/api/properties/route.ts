import { NextResponse } from "next/server";
import { seedProperties } from "@/lib/seed-data";

const VALID_TYPES = ["residential", "commercial"] as const;

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
    return NextResponse.json({ properties });
  } catch (error) {
    console.error("[/api/properties] DB unavailable, using fallback:", error);
    const filtered = type
      ? seedProperties.filter((p) => p.type === type)
      : seedProperties;
    return NextResponse.json({ properties: filtered });
  }
}