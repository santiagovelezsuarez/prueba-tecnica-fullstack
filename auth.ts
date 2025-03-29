import NextAuth from "next-auth"
import { validateUserWithCredentials } from "./services/auth.service";
import { UserCredentials } from "./lib/definitions";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHub,
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
                return user
            },
        })
    ],
    pages: {
        signIn: "/login"
    },
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth
        },
    },
    secret: process.env.AUTH_SECRET,
})
