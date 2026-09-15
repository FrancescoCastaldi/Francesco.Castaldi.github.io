import { NextResponse } from "next/server";
import { getGitHubPortfolioData } from "@/lib/github/cache";
import { getFallbackSnapshotData } from "@/lib/github/client.server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getGitHubPortfolioData();

    return NextResponse.json(
      {
        status: "ok",
        data,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
  } catch (error) {
    console.error("[API /api/github] Handler error, serving guaranteed static snapshot fallback:", error);
    const fallback = getFallbackSnapshotData();
    return NextResponse.json(
      {
        status: "ok",
        data: fallback,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60",
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
  }
}
