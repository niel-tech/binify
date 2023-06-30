import { NextRequest, NextResponse } from "next/server"
import NextAuth from "next-auth"
import { AuthOptions } from "next-auth/src"
import { authOptions } from "@/lib/auth"
import { randomBytes } from "../../../../lib/crypto"

const handler = NextAuth(authOptions)

async function authPost(request: NextRequest, response: NextResponse, options: AuthOptions) {
  const url = new URL(request.url!)
  const res: Response = await handler(request, response, options)

  if (url.pathname === "/api/auth/signin/email") {
    res.headers.set("set-cookie", `validationAttempt=${randomBytes()}; Path=/; HttpOnly`)
    console.log([...res.headers.values()], [...res.headers.keys()])
  }

  return res
}

export { handler as GET, authPost as POST }
