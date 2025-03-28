import { NextResponse, NextRequest } from "next/server";


export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  
  const protectedRoutes = ["/dashboard"];
  const blockIfLogued = ["/login", "/register"];

  const url = req.nextUrl;
  const hasTokenInURL = url.searchParams.has("token");

  const isProtectedRoute = protectedRoutes.some(route =>
    url.pathname.startsWith(route)
  );

  if (!token && isProtectedRoute && !hasTokenInURL) { 
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (blockIfLogued.includes(url.pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard/perfil", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
