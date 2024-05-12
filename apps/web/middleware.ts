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

export async function middleware(request: NextRequest) {
      const token = await getToken({req: request})
      if(request.nextUrl.pathname.startsWith('/students') && token?.role === 'student'){
        return NextResponse.redirect((new URL('/dashboard', request.url)))
      }
      return NextResponse.next()
    
}

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
