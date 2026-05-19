import { NextResponse, type NextRequest } from "next/server";
import { canonicalHost } from "@/lib/site";

const redirectHosts = new Set([
  "www.mundengroup.ca",
  "mundentruckequipment.com",
  "www.mundentruckequipment.com",
]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();

  if (host && redirectHosts.has(host)) {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.hostname = canonicalHost;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  const response = NextResponse.next();

  if (host && shouldNoindexHost(host)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

function shouldNoindexHost(host: string) {
  return (
    host !== canonicalHost &&
    host !== "localhost" &&
    host !== "127.0.0.1" &&
    !host.endsWith(".localhost")
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png).*)"],
};
