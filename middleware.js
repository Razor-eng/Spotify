import React from 'react'
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware() {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    const { pathname } = req.nextUrl;
    const url = req.nextUrl;

    if (pathname.includes("/api/auth") || token) {
        return NextResponse.next();
    }

    if (!token && pathname !== "/login") {
        console.log("redrecting");
        url.pathname = '/login'
        return NextResponse.redirect(url);
    }
}

// export async function middleware(req) {

// }