import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { Session } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session /* , token */ }) {
      return session as Session;
    },
  },
}; 