import { NextResponse } from "next/server";
import { JWTVerify } from "./helpers/jwt";
import axios from "axios";

export default async function middleware(req, res) {
  var pathname = req.nextUrl.pathname;
  var token = req.cookies.get("AccessToken")?.value;
  var userID = token && (await JWTVerify(token));

  const publicRoutes = ["/", "/login", "/register"];

  const loginNotAllowedPaths = ["/login", "/register"];

  if (!userID && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (userID && loginNotAllowedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  var user = await fetch(`http://localhost:3000/api/auth/profile?id=${userID}`);
  user = await user.json();
  user = user.message;
  // add Admin User Access Routes Here
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard", "/dashboard/:path*"],
};
