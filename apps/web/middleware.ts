// export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized: ({ token }) => {
      // console.log(token)
      if (
        token?.role === "student" ||
        token?.role === "teacher" ||
        token?.role === "admin"
      ) {
        return true;
      }
      // signOut();
      return false;
    },
  },
});

export const config = {
  matcher: [
    "/dashboard",
    "/liveclass/:path*",
    "/attendance",
    "/class/:path*",
    "/meeting",
    "/students",
    "/settings",
  ],
};
