// import NextAuth from "next-auth"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import Credentials from "next-auth/providers/credentials";
// import { validateUserWithCredentials } from '@/services/auth.service';
// import { UserCredentials } from '@/lib/definitions';
// import { PrismaClient } from "@prisma/client";
// import GitHubProvider from "next-auth/providers/github";

// const prisma = new PrismaClient();

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GitHubProvider({
//       clientId: process.env.AUTH_GITHUB_ID!,
//       clientSecret: process.env.AUTH_GITHUB_SECRET!,
//     }),
//     Credentials({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         const user = await validateUserWithCredentials(credentials as UserCredentials);
//         if (!user) {
//           throw new Error("Invalid credentials.")
//         }
//         console.log("User:", user)
//         return user
//       },
//     })
//   ]
// }

// export default NextAuth(authOptions)

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
  // Configura cómo se almacenan las sesiones
  session: {
    strategy: "jwt" as const // Usa JWT para credenciales
  },
  // Añade estos callbacks
  callbacks: {
    async jwt({ token, user }: { token: any; user?: { id: string } }) {
      // Cuando se inicia sesión, añade el ID de usuario al token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Asegura que el ID de usuario esté en el objeto de sesión
      if (session.user) {
        session.user.id = token.id;
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
        // Asegúrate de que tu función validateUserWithCredentials devuelva id, name y email
        return {
          id: user.id,
          name: user.name || user.email,
          email: user.email,
          // Puedes incluir otros campos que necesites
        };
      },
    })
  ],
  // Para depuración durante el desarrollo
  debug: process.env.NODE_ENV === "development",
}

export default NextAuth(authOptions)