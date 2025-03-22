import { NextResponse, NextRequest } from "next/server";


export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  
  const protectedRoutes = ["/dashboard"];

  const blockIfLogued = ["/login", "/register"];

  if (!token && req.nextUrl.pathname.startsWith(protectedRoutes[0])) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }


  if (blockIfLogued.includes(req.nextUrl.pathname) && token) {
    const loginUrl = new URL("/dashboard/perfil", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
