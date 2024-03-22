// export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getServerSession } from "next-auth";
import { authOptions } from "./components/utils/options";


export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/sign-in",
  },
});

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/liveclass")) {
    return NextResponse.rewrite(new URL("/maintenace", request.url));
  }
}


export const config = { matcher: ["/dashboard","/profile","/liveclass/:path*"] };