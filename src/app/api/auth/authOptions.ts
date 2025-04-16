import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { Session } from "next-auth";

// Extend the Session type for TypeScript support
declare module "next-auth" {
  interface Session {
    provider?: string;
    accessToken?: string;
  }
}

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
    async jwt({ token, account }) {
      // Save provider and access token when signing in
      if (account) {
        token.provider = account.provider;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the provider and access token to the client
      return {
        ...session,
        provider: token.provider,
        accessToken: token.accessToken,
      } as Session;
    },
  },
}; 