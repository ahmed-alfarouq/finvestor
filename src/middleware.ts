import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";

import {
  AUTH_ROUTES,
  PUBLIC_ROUTES,
  API_AUTH_PREFIX,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const response = NextResponse.next();
  const { pathname } = req.nextUrl;

  const session = req.auth;
  const isLoggedIn = !!session;
  const isLinkAccountPage = pathname === "/link-account";

  const isApiRoute = pathname.startsWith(API_AUTH_PREFIX);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  const hasBankAccounts = !!session?.user.banks.length;

  // Allow API and public routes
  if (isApiRoute || isPublicRoute) return response;

  // Auth routes: redirect logged-in users to overiew page
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }

  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // User has no bank accounts → force them to link account first
  if (isLoggedIn && !hasBankAccounts && !isLinkAccountPage) {
    return NextResponse.redirect(new URL("/link-account", req.url));
  }

  return response;
});

export const config = {
  matcher: ["/((?!_next|static|api|.*\\..*).*)"],
};
