// export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getServerSession } from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/options";


export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/sign-in",
  },
});


export const config = { matcher: ["/dashboard","/profile"] };