import { NextResponse } from "next/server";

export const runtime = "edge";

const OWNER = "ponlponl123";
const REPO = "chouxcream-celebration-nextjs";

const GITHUB_API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contributors?per_page=100`;

const getGitHubHeaders = () => {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  // Use a GitHub token when available to increase rate limits.
  const token =
    process.env.GITHUB_TOKEN ?? process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `token ${token}`;
  }

  return headers;
};

export async function GET() {
  const headers = getGitHubHeaders();

  const response = await fetch(GITHUB_API_URL, {
    headers,
    next: { revalidate: 60 * 60 * 6 }, // 6 hour
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      {
        message: "Failed to fetch contributors from GitHub",
        status: response.status,
        error: errorText,
      },
      { status: response.status },
    );
  }

  const contributors = await response.json();

  return NextResponse.json(contributors, {
    status: 200,
    headers: {
      // Cache this route response at the CDN/edge for a short time as an extra layer of caching.
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
    },
  });
}
