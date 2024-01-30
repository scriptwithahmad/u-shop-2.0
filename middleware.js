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
  );
  user = await user.json();
  user = user.message;

  if (user) {
    const userRole = user.role;

    // Check if the user has the role "user" and is trying to access the dashboard
    // if (userID && userRole === "user" && pathname.includes("/user-portal")) {
    //   // if (pathname.includes("/user-portal")) {
    //   //   console.log("True");
    //   // } else{
    //   //   console.log("False")
    //   // }
    //   // console.log("Access to user dashboard is not allowed. Redirecting...");
    //   // return NextResponse.redirect(new URL("/", req.nextUrl));
    // }

    if (user) {
      const userRole = user.role;

      // Check if the user has the role "user"
      if (userRole === "user") {
        if (pathname.includes("/user-portal")) {
          console.log("true");
          // return NextResponse.redirect(new URL("/", req.nextUrl));
        }
      }
    }
  }
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard", "/dashboard/:path*"],
};
