import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_KV_REST_API_URL!,
  token: process.env.UPSTASH_REDIS_KV_REST_API_TOKEN!,
});

const limiters = new Map<string, Ratelimit>();

function getLimiter(prefix: string, requests: number, window: string) {
  const key = `${prefix}:${requests}:${window}`;
  if (!limiters.has(key)) {
    limiters.set(
      key,
      new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(requests, window as `${number} ${"s" | "m" | "h" | "d"}`),
        prefix: `rl:${prefix}`,
      }),
    );
  }
  return limiters.get(key)!;
}

export async function rateLimit(
  req: NextRequest,
  prefix: string,
  requests: number,
  window: `${number} ${"s" | "m" | "h" | "d"}`,
): Promise<NextResponse | null> {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limiter = getLimiter(prefix, requests, window);
  const { success, remaining, reset } = await limiter.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Zbyt wiele żądań — spróbuj za chwilę" },
      {
        status: 429,
        headers: {
          "X-RateLimit-Remaining": String(remaining),
          "X-RateLimit-Reset": String(reset),
        },
      },
    );
  }

  return null;
}
