import { fetchCryptoNews } from "@/lib/news";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  try {
    const data = await fetchCryptoNews({
      page: searchParams.get("page") || "1",
      size: searchParams.get("size") || "6",
      category: searchParams.get("category") || "",
    });
    return NextResponse.json(
      {
        data: data.data,
        total_count: data.data?.count || 0,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("News API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
