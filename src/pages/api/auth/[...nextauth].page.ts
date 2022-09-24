import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const GITHUB_ID = process.env.GITHUB_ID
const GITHUB_SECRET = process.env.GITHUB_SECRET
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

const prisma = new PrismaClient()

if (typeof GITHUB_ID === "undefined")
  throw new Error("GITHUB_ID is not defined")
if (typeof GITHUB_SECRET === "undefined")
  throw new Error("GITHUB_SECRET is not defined")
if (typeof NEXTAUTH_SECRET === "undefined")
  throw new Error("NEXTAUTH_SECRET is not defined")

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
}

export default NextAuth(authOptions)
