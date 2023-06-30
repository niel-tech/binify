import { NextRequest, NextResponse } from "next/server"
import { validateSession } from "./lib/fauna"
import { getNextAuthSessionCookie } from "./lib/cookie"

export default async function middleware(request: NextRequest) {
  const session_token = getNextAuthSessionCookie(request.cookies)

  if (!session_token) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  const result = await validateSession(session_token)

  if (!result?.userId) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ["/profile"] }
