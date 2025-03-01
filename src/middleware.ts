import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// The route matcher defines routes that should be protected

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isUserRoute = createRouteMatcher(["/user(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims, userId } = await auth();
  const userRole = sessionClaims?.metadata?.role;
  const isAuthenticated = !!userId; // Check if user is logged in

  // Protect admin routes - only admin/moderator can access
  if (
    isAdminRoute(req) &&
    !(userRole === "admin" || userRole === "moderator")
  ) {
    const url = new URL("/admin", req.url);
    return NextResponse.redirect(url);
  }

  // Protect user routes - any authenticated user can access
  if (isUserRoute(req) && !isAuthenticated) {
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
