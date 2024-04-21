import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Adapter } from "next-auth/adapters";
import { db } from "@/database/db";
// import { USERS } from "@/data/constants";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   profile(profile) {
    //     return {
    //       id: profile.sub,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //       role: profile.role ?? "student",
    //     };
    //   },
    //   allowDangerousEmailAccountLinking: true,
    // }),

    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email));

        if (user.length <= 0) {
          return null;
        }

        if (!user[0].password) {
          return null;
        }

        const isMatch = await compare(credentials.password, user[0].password);

        if (!isMatch) {
          return null;
        }

        return {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
          image: user[0].image,
          role: user[0].role ?? "student",
        };
      },
    }),
  ],

  adapter: DrizzleAdapter(db) as Adapter,

  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log("Sign In Callback", user, account, profile);
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        const u = user as unknown as any;
        token.id = u.id;
        token.role = u.role;
        token.image = u.image;
      }

      if (trigger === "update" && session?.user) {
          token.role = session.user.role;
          token.name = session.user.name;
          token.image = session.user.image;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          image: token.image as string,
        },
      };
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/sign-in",
  },
};
