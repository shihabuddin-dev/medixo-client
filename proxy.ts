import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";
// import { userService } from "./services/user.service";
// import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  //   const { data: session, isPending } = authClient.useSession();
  //   const user = session?.user;
  // console.log(session, user);

  const { data } = await userService.getSession();

  // Not logged in
  if (!data) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data?.user.role;
  // console.log("User role", role)

  // Role-based dashboard rules
  const roleRedirectMap: Record<string, string> = {
    [Roles.admin]: "/admin-dashboard",
    [Roles.seller]: "/seller-dashboard",
    [Roles.customer]: "/dashboard",
  };

  const allowedBasePath = roleRedirectMap[role];

  // If user tries to access another dashboard, redirect to their own
  if (
    pathname.startsWith("/admin-dashboard") && role !== Roles.admin ||
    pathname.startsWith("/seller-dashboard") && role !== Roles.seller ||
    pathname.startsWith("/dashboard") && role !== Roles.customer
  ) {
    return NextResponse.redirect(new URL(allowedBasePath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/seller-dashboard",
    "/seller-dashboard/:path*",
  ],
};