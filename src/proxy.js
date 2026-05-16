import { NextResponse } from "next/server";
import { auth } from "./app/(main)/lib/auth";

/**
 * Better Auth user `id` (Mongo `users` document), not account `_id`.
 * Set only in `.env`: `ADMIN_USER_ID` (comma-separated for multiple).
 */
function getAdminUserIds() {
  const raw = process.env.ADMIN_USER_ID;
  if (!raw || typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/Admin")) {
    const uid =
      session.user?.id != null ? String(session.user.id).trim() : "";
    const adminIds = getAdminUserIds();
    const allowed = adminIds.length > 0 && adminIds.includes(uid);
    if (!allowed) {
      const url = request.nextUrl.clone();
      url.pathname = "/Profile";
      url.search = "";
      url.searchParams.set("adminOnly", "1");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Destinations/:path*", "/Bookings", "/Profile", "/Admin"],
};
