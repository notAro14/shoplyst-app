import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "src/utils/db/prisma-client"

const GOOGLE_ID = process.env.GOOGLE_ID
const GOOGLE_SECRET = process.env.GOOGLE_SECRET
const GITHUB_ID = process.env.GITHUB_ID
const GITHUB_SECRET = process.env.GITHUB_SECRET
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

if (typeof GITHUB_ID === "undefined")
  throw new Error("GITHUB_ID is not defined")
if (typeof GITHUB_SECRET === "undefined")
  throw new Error("GITHUB_SECRET is not defined")
if (typeof GOOGLE_ID === "undefined")
  throw new Error("GOOGLE_ID is not defined")
if (typeof GOOGLE_SECRET === "undefined")
  throw new Error("GOOGLE_SECRET is not defined")
if (typeof NEXTAUTH_SECRET === "undefined")
  throw new Error("NEXTAUTH_SECRET is not defined")

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
  ],
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
}

export default NextAuth(authOptions)
