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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
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

        console.log(user)

        if (user.length <= 0) {
          return null;
        }

        if (!user[0].password) {
          return null
        }

        const isMatch = await compare(
          credentials.password,
          user[0].password,
        );

        if(!isMatch) {
          return null;
        }

        return {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
          image: user[0].image
        };
      },
    }),
  ],

  adapter: DrizzleAdapter(db) as Adapter,

  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/sign-in",
  },
};
