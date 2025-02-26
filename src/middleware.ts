import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// The route matcher defines routes that should be protected
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isUserRoute = createRouteMatcher(["/user(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Fetch the user's role from the session claims
  const userRole = (await auth()).sessionClaims?.metadata?.role;

  // Protect all routes starting with `/admin`
  if (
    isAdminRoute(req) &&
    !(userRole === "admin" || userRole === "moderator")
  ) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }
  // Protect all routes starting with `/user`
  if (isUserRoute(req)) {
    const url = new URL("/auth/sign-in", req.url);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
