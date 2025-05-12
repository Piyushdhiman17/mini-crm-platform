import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: "development-secret-do-not-use-in-production",
  })

  const isAuthenticated = !!token
  const isAuthPage = request.nextUrl.pathname === "/signin"
  const isApiAuthRoute = request.nextUrl.pathname.startsWith("/api/auth")

  // Allow access to API auth routes
  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  // Redirect to dashboard if authenticated and trying to access auth page
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect to signin if not authenticated and trying to access protected routes
  if (!isAuthenticated && !isAuthPage && request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
