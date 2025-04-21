import { NextResponse, NextRequest } from "next/server";


export function middleware(req: NextRequest, res: NextResponse) {
  const theme = req.cookies.get('theme')?.value || 'light'
  const token = req.cookies.get("token")?.value;
  
  if (!req.cookies.has('theme')) {
    res.cookies.set('theme', theme)
  }
  
  const protectedRoutes = ["/dashboard"];

  const blockIfLogued = ["/login", "/register"];

  const isProtectedRoute = protectedRoutes.some(route =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
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
