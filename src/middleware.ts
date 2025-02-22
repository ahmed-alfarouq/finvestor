import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "@/auth.config";
import { DEFAULT_LOGIN_REDIRECT, PUBLIC_ROUTES, AUTH_ROUTES, API_AUTH_PREFIX } from "@/routes";

const { auth } = NextAuth(authConfig);


export default auth((req) => {
    const reponse = NextResponse.next();
    const { pathname } = req.nextUrl;
    const isLoggedin = !!req.auth;
    const isApiRoute = pathname.startsWith(API_AUTH_PREFIX);
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isAuthRoute = AUTH_ROUTES.includes(pathname);

    if (isApiRoute || isPublicRoute) {
        return reponse;
    }

    if (isAuthRoute) {
        if (isLoggedin) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl))
        }
        return reponse;
    }

    return reponse;
});


export const config = {
    matcher: ["/((?!_next|static|api|.*\\..*).*)"],
}