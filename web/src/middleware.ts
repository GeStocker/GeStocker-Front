import { NextResponse, NextRequest } from "next/server";
import { getRolFromToken } from "./helpers/getRolFromToken";
import { getInventoryFromToken } from "./helpers/getInventoryFromToken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const collaboratorRoutes = ["/dashboard/inventory"];
  const superadminRoutes = ["/dashboard/superadmin"];

  const protectedRoutes = ["/dashboard"];
  const blockIfLogued = ["/login", "/register"];

  const url = req.nextUrl;
  const hasTokenInURL = url.searchParams.has("token");

  const isProtectedRoute = protectedRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  if (!token && isProtectedRoute && !hasTokenInURL) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (blockIfLogued.includes(url.pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard/perfil", req.url));
  }
  if (token) {
    const userRol = getRolFromToken(token);
    const inventoryId = getInventoryFromToken(token);

    if (userRol === "COLLABORATOR") {
      const isCollaboratorRoute = collaboratorRoutes.some((route) =>
        url.pathname.startsWith(route)
      );

      if (!isCollaboratorRoute) {
        return NextResponse.redirect(
          new URL(`/dashboard/inventory/${inventoryId}`, req.url)
        );
      }
    }

    if (userRol !== "superadmin") {
      const isSuperadminRoutes = superadminRoutes.some((route) =>
        url.pathname.startsWith(route)
      );
      if (isSuperadminRoutes) {
        return NextResponse.redirect(new URL(`/dashboard/perfil`, req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
