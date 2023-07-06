import { FaunaAdapter } from "@auth/fauna-adapter"
import type { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import Email from "next-auth/providers/email"
import Github from "next-auth/providers/github"
import { authClient } from "./fauna"
import sendVerificationRequest from "./sendVerificationRequest"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/signin",
    signOut: "/signin",
    error: "/error",
    verifyRequest: `/signin/verify`,
  },
  adapter: FaunaAdapter(authClient) as Adapter,
  providers: [
    Github({
      name: "github",
      clientId: (process.env.NODE_ENV === "development" ? process.env.DEV_GITHUB_ID : process.env.GITHUB_ID) as string,
      clientSecret: (process.env.NODE_ENV === "development"
        ? process.env.DEV_GITHUB_SECRET
        : process.env.GITHUB_SECRET) as string,
    }),
    Email({
      sendVerificationRequest,
    }),
  ],
}
