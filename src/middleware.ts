import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Le API non passano da questo middleware
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === "/dashboard/login";
  const isDashboard = pathname.startsWith("/dashboard") && !isLoginPage;

  // Se JWT_SECRET non è configurato, dashboard non ancora attiva
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    if (isDashboard) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  const { jwtVerify } = await import("jose");
  const JWT_SECRET = new TextEncoder().encode(jwtSecret);

  const accessToken =
    request.cookies.get("access_token")?.value ??
    request.headers.get("authorization")?.replace("Bearer ", "");

  let isAuthenticated = false;

  if (accessToken) {
    try {
      await jwtVerify(accessToken, JWT_SECRET, {
        issuer: "civika.it",
        audience: "civika.it",
      });
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  // Dashboard senza auth → redirect login
  if (isDashboard && !isAuthenticated) {
    const loginUrl = new URL("/dashboard/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Autenticato su login → redirect dashboard
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
