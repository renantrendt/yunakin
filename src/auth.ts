import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { authOptions } from "./lib/auth/authOptions"

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions)