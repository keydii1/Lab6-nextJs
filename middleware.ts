import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiting (for demo - use Redis in production)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60000; // 1 minute window
  const maxRequests = 20; // Max 20 requests per minute

  const clientData = rateLimitMap.get(ip);

  if (!clientData || now - clientData.timestamp > windowMs) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (clientData.count >= maxRequests) {
    return false;
  }

  clientData.count++;
  return true;
}

export function middleware(request: NextRequest) {
  // Rate limiting for Knowledge Base AI endpoint
  if (request.nextUrl.pathname.startsWith("/knowledge-base")) {
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: "Too Many Requests",
          message: "Rate limit exceeded. Please try again later.",
        },
        { status: 429 }
      );
    }
  }

  // API secret route protection
  if (request.nextUrl.pathname.startsWith("/api/secret")) {
    const apiKey = request.headers.get("x-api-key");
    const validApiKey = process.env.API_SECRET_KEY;

    // Check if API key is provided and valid
    if (!apiKey || apiKey !== validApiKey) {
      // Return 401 Unauthorized response
      return NextResponse.json(
        {
          error: "Unauthorized",
          message:
            "Invalid or missing API key. Please provide a valid x-api-key header.",
        },
        { status: 401 }
      );
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/api/secret", "/knowledge-base/:path*"],
};
