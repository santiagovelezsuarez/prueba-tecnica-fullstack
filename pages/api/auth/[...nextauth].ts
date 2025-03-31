import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials";
import { validateUserWithCredentials } from '@/services/auth.service';
import { UserCredentials } from '@/lib/definitions';
import { PrismaClient } from "@prisma/client";
import GitHubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),  
  session: {
    strategy: "jwt" as const
  },  
  callbacks: {
    async jwt({ token, user }: { token: any; user?: { id: string, role?: string } }) {     
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {      
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await validateUserWithCredentials(credentials as UserCredentials);
        if (!user) {
          throw new Error("Invalid credentials.")
        }        
        return {
          id: user.id,
          name: user.name || user.email,
          email: user.email,
          role: user.role,         
        };
      },
    })
  ],  
  debug: process.env.NODE_ENV === "development",
}

export default NextAuth(authOptions)