import { NextResponse } from "next/server";
import { JWTVerify } from "./helpers/jwt";

export async function middleware(req, res) {
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

  var user = await fetch(
    `https://u-shop-liart.vercel.app/api/auth/profile?id=${userID}`
    // `http://localhost:3000/api/auth/profile?id=${userID}`
  );
  user = await user.json();
  user = user.message;
  // const adminUser = user.role;
  
  // add Admin User Access Routes Here
  // if (userID && user.role == "admin" && !loginNotAllowedPaths.includes(pathname)) {
  //   return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  // }




}



export const config = {
  matcher: ["/", "/login", "/register", "/dashboard", "/dashboard/:path*"],
};
