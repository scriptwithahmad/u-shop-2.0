import { NextResponse } from "next/server";
import { JWTVerify } from "./helpers/jwt"
import { useQuery } from "react-query";
import { useState } from "react";


export async function middleware(req, res) {

    var pathname = req.nextUrl.pathname;
    var token = req.cookies.get("AccessToken")?.value;
    var userID = token && await JWTVerify(token)

    const publicRoutes = [
        "/",
        "/login",
        "/register"
    ]

    // console.log(token)



    
    if (!userID && (!publicRoutes.includes(pathname))) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }


    if (userID && publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

  
    var user = await fetch(`http://localhost:3000/api/auth/profile`)
    user = await user.json()
    // user = user.message

    console.log(user)








}

export const config = {
    matcher: [
        "/",
        "/login",
        "/register",
        "/dashboard", 
        "/dashboard/:path*",
    ]
}